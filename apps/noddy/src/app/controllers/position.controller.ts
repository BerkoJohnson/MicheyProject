import * as express from 'express';
import Controller from '../interfaces/controller.interface';
import electionModel from '../models/election.model';
import positionModel from '../models/position.model';
import ResourceNotFoundException from '../exceptions/ResourceNotFoundException';
import CastErrorException from '../exceptions/CastErrorException';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import ElectionDto from '../dtos/election.dto';
import InvalidRequestException from '../exceptions/InvalidRequestException';
import authMiddleware from '../middleware/auth.middleware';
import validateMiddleware from '../middleware/validation.middleware';
import PositionDto from '../dtos/position.dto';
import candidateModel from '../models/candidate.model';
import DuplicateItemException from '../exceptions/DuplicateItemException';
import Candidate from '../interfaces/candidate.interface';

class PositionController implements Controller {
  public path = '/positions';
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
      .get(authMiddleware, this.getPositions)
      .post(
        authMiddleware,
        validateMiddleware(PositionDto),
        this.createPosition
      );
    this.router
      .route(`${this.path}/:position`)
      .get(authMiddleware, this.getPosition)
      .delete(authMiddleware, this.deletePosition)
      .patch(authMiddleware, this.updatePosition);
  }

  private getPositions = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { election } = req.query;
    if (!election) {
      return next(new InvalidRequestException());
    }

    const electionInDB = await this.ElectionModel.findById(election);

    if (!electionInDB) {
      return next(
        new ResourceNotFoundException(election.toString(), 'Election')
      );
    }

    const positions = await this.PositionModel.find({
      election: electionInDB._id
    }).populate('candidates');

    // positions.map(p => {
    //   p.candidates.map(c => console.log(c));
    // });

    res.json(positions);
  };

  private getPosition = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { position } = req.params;

      if (!position) {
        return next(new InvalidRequestException());
      }

      const positionInDB = await this.PositionModel.findById(position).populate(
        'candidates'
      );

      if (!positionInDB) {
        return next(
          new ResourceNotFoundException(position.toString(), 'Position')
        );
      }
      res.json(positionInDB);
    } catch (error) {
      if (error.name === 'CastError') {
        return next(new CastErrorException('Position', error));
      }
      next(error);
    }
  };

  private updatePosition = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { position } = req.params;

      if (!position) {
        return next(new InvalidRequestException());
      }
      const positionData: PositionDto = req.body;
      const positionInDB = await this.PositionModel.findByIdAndUpdate(
        position,
        {
          title: positionData.title
        },
        {
          new: true,
          runValidators: true
        }
      );

      if (!position) {
        return next(
          new ResourceNotFoundException(position.toString(), 'Position')
        );
      }

      await positionInDB
        .populate({
          path: 'candidates',
          select: 'name gender dob nickname photo _id'
        })
        .execPopulate();

      res.status(200).json(position);
    } catch (error) {
      if (error.name === 'CastError') {
        return next(new CastErrorException('Position', error));
      }
      next(error);
    }
  };

  private deletePosition = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { position } = req.params;

      const positionInDB = await this.PositionModel.findOne({
        _id: position
      });

      if (!position) {
        return next(new ResourceNotFoundException(position, 'Position'));
      }

      await positionInDB.remove();

      res.sendStatus(200);
    } catch (error) {
      if (error.name === 'CastError') {
        return next(new CastErrorException('Position', error));
      }
      next(error);
    }
  };

  private createPosition = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { election } = req.query;

      if (!election) {
        return next(new InvalidRequestException());
      }

      const electionInDB = await this.ElectionModel.findById(election);

      if (!electionInDB) {
        return next(
          new ResourceNotFoundException(election.toString(), 'Election')
        );
      }

      const positionData: PositionDto = req.body;
      const createdPosition = new this.PositionModel({
        ...positionData,
        election: election
      });

      const savedPosition = await createdPosition.save();

      // Push position to the election.positions array
      electionInDB.positions.push(createdPosition._id);
      await electionInDB.save();
      res.status(201).json(savedPosition);
    } catch (error) {
      if (error.code === 11000) {
        return next(new DuplicateItemException('Position'));
      }
      next(error);
    }
  };
}

export default PositionController;
