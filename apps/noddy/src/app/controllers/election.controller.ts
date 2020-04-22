import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import ResourceNotFoundException from '../exceptions/ResourceNotFoundException';
import CastErrorException from '../exceptions/CastErrorException';
import authMiddleware from '../middleware/auth.middleware';
import validateMiddleware from '../middleware/validation.middleware';
import ElectionDto from '../dtos/election.dto';
import DuplicateItemException from '../exceptions/DuplicateItemException';

import electionModel from '../models/election.model';
import positionModel from '../models/position.model';
import candidateModel from '../models/candidate.model';
import Candidate from '../interfaces/candidate.interface';

class ElectionController implements Controller {
  public path = '/elections';
  public router = express.Router();
  public ElectionModel = electionModel;
  public PositionModel = positionModel;
  public CandidateModel = candidateModel;

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router
      .route(this.path)
      .get(authMiddleware, this.getElections)
      .post(
        authMiddleware,
        validateMiddleware(ElectionDto),
        this.createElection
      );
    this.router
      .route(`${this.path}/:election`)
      .get(authMiddleware, this.getElection)
      .delete(authMiddleware, this.deleteElection);
  }

  private getElections = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const elections = await this.ElectionModel.find().populate({
      path: 'positions',
      select: 'title _id'
    });
    res.json(elections);
  };

  private getElection = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { election } = req.params;
      const electionInDB = await this.ElectionModel.findById(election).populate(
        {
          path: 'positions',
          select: 'title _id'
        }
      );

      if (!electionInDB) {
        return next(new ResourceNotFoundException(election, 'Election'));
      }

      res.json(election);
    } catch (error) {
      if (error.name === 'CastError') {
        return next(new CastErrorException('Election', error));
      }
      console.error(error);
    }
  };

  private deleteElection = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { election } = req.params;
      const electionInDB = await this.ElectionModel.findById(election);

      if (!electionInDB) {
        return next(new ResourceNotFoundException(election, 'Election'));
      }
      await electionInDB.remove();
      res.sendStatus(200);
    } catch (error) {
      if (error.name === 'CastError') {
        return next(new CastErrorException('Election', error));
      }
      console.error(error);
    }
  };

  private createElection = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const electionData: ElectionDto = req.body;
      const createdElection = new this.ElectionModel(electionData);

      const savedElection = await createdElection.save();
      await savedElection.populate('positions').execPopulate();
      res.status(201).json(savedElection);
    } catch (error) {
      if (error.code === 11000) {
        return next(new DuplicateItemException('Election'));
      }
      next(error);
    }
  };
}

export default ElectionController;
