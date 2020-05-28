import * as express from 'express';

import Controller from '../interfaces/controller.interface';
import authMiddleware from '../middleware/auth.middleware';
import upload from '../middleware/multer.middleware';
import validateMiddleware from '../middleware/validation.middleware';
import InvalidRequestException from '../exceptions/InvalidRequestException';
import VoterModel from '../models/voter.model';
import ResourceNotFoundException from '../exceptions/ResourceNotFoundException';

export default class VoterController implements Controller {
  public path = '/voters';
  public router = express.Router();
  public VoterModel = VoterModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(this.path)
      .get(authMiddleware, this.getMany)
      .post(authMiddleware, this.createMany)
      .patch(authMiddleware, this.updateMany);

    this.router
      .route(`${this.path}/:voter`)
      .get(authMiddleware, this.getOne)
      .put(authMiddleware, this.vote)
      .patch(authMiddleware, this.updateOne)
      .delete(authMiddleware, this.deleteOne);
  }

  private getMany = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      // console.log(req.query);
      const { election, room } = req.query as {
        election: string;
        room: string;
      };
      if (!election) return next(new InvalidRequestException());

      const votersInDB = await this.VoterModel.find({
        election: election,
        room: room
      });

      res.json(votersInDB);
      // res.json([]);
    } catch (error) {
      next(error);
    }
  };

  private getOne = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { voter } = req.params;
      if (!voter) return next(new InvalidRequestException());
      const voterInDB = this.VoterModel.findById(voter);

      if (!voterInDB)
        return next(new ResourceNotFoundException(voter, 'Voter'));

      res.json(voterInDB);
    } catch (error) {
      next(error);
    }
  };

  private deleteOne = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { voter } = req.params;
      if (!voter) return next(new InvalidRequestException());
      const voterInDB = this.VoterModel.findByIdAndDelete(voter);

      if (!voterInDB)
        return next(new ResourceNotFoundException(voter, 'Voter'));

      res.json(voterInDB);
    } catch (error) {
      next(error);
    }
  };
  private updateOne = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { voter } = req.params;
      if (!voter) return next(new InvalidRequestException());

      const voterInDB = this.VoterModel.findByIdAndUpdate(voter, req.body, {
        new: true
      });

      if (!voterInDB)
        return next(new ResourceNotFoundException(voter, 'Voter'));

      res.json(voterInDB);
    } catch (error) {
      next(error);
    }
  };
  private updateMany = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { election } = req.query;
      if (!election) return next(new InvalidRequestException());

      await this.VoterModel.updateMany(
        { election: election.toString() },
        req.body,
        { new: true }
      );
      const votersInDB = this.VoterModel.find().where('election', election);

      res.json(votersInDB);
    } catch (error) {
      next(error);
    }
  };
  private createOne = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {};
  private createMany = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { election } = req.query;
      const { voters } = req.body;
      if (!election || !voters) return next(new InvalidRequestException());

      const votersSaved = await this.VoterModel.create(voters);

      res.json(votersSaved);
    } catch (error) {
      next(error);
    }
  };

  /** Voting */
  private vote = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { voter } = req.params;

      if (!voter) return next(new InvalidRequestException());

      res.json(req.body);
      // const voterInDB = this.VoterModel.findByIdAndUpdate(voter, req.body, {
      //   new: true
      // });

      // if (!voterInDB)
      //   return next(new ResourceNotFoundException(voter, 'Voter'));

      // res.json(voterInDB);
    } catch (error) {
      next(error);
    }
  };
}
