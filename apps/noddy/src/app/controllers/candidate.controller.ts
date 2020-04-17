import * as express from 'express';
import * as sharp from 'sharp';

import Controller from '../interfaces/controller.interface';
import electionModel from '../models/election.model';
import positionModel from '../models/position.model';
import ResourceNotFoundException from '../exceptions/ResourceNotFoundException';
import CastErrorException from '../exceptions/CastErrorException';
import RequestWithUser from '../interfaces/requestWithUser.interface';
import InvalidRequestException from '../exceptions/InvalidRequestException';
import authMiddleware from '../middleware/auth.middleware';
import validateMiddleware from '../middleware/validation.middleware';
import CandidateDto from '../dtos/candidate.dto';
import candidateModel from '../models/candidate.model';
import DuplicateItemException from '../exceptions/DuplicateItemException';
import upload from '../middleware/multer.middleware';

class CandidateController implements Controller {
  public path = '/candidates';
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
      .get(authMiddleware, this.getCandidates)
      .post(
        authMiddleware,
        upload.single('photo'),
        validateMiddleware(CandidateDto),
        this.createCandidate
      );
    this.router
      .route(`${this.path}/:candidate`)
      .get(authMiddleware, this.getCandidate)
      .patch(authMiddleware, upload.single('photo'), this.updateCandidate)
      .delete(authMiddleware, this.deleteCandidate);
  }

  private getCandidates = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { position } = req.query;
      if (!position) {
        return next(new InvalidRequestException());
      }

      // Check if position exist
      const positionInDB = await this.PositionModel.findById(position);

      // else
      if (!positionInDB) {
        return next(
          new ResourceNotFoundException(position.toString(), 'Position')
        );
      }

      const candidates = await this.CandidateModel.find({
        position: positionInDB._id
      });
      res.json(candidates);
    } catch (error) {
      next(error);
    }
  };

  private getCandidate = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { candidate } = req.params;

      if (!candidate) {
        return next(new InvalidRequestException());
      }

      // Check if candidate exists
      const candidateInDB = await this.CandidateModel.findById(candidate);
      if (!candidateInDB) {
        return next(new ResourceNotFoundException(candidate, 'Candidate'));
      }
      res.json(candidateInDB);
    } catch (error) {
      if (error.name === 'CastError') {
        return next(new CastErrorException('Candidate', error));
      }
      next(error);
    }
  };

  private updateCandidate = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { candidate } = req.params;

      if (!candidate) {
        return next(new InvalidRequestException());
      }

      // Check if candidate exists
      let updateData: CandidateDto = req.body;

      if (req.file) {
        const image = await sharp(req.file.buffer)
          .resize(200, 200)
          .toBuffer();

        updateData = {
          ...updateData,
          photo: image
        };
      }

      const candidateInDB = await this.CandidateModel.findByIdAndUpdate(
        candidate,
        updateData
      );
      if (!candidateInDB) {
        return next(new ResourceNotFoundException(candidate, 'Candidate'));
      }
      res.json(candidateInDB);
    } catch (error) {
      if (error.name === 'CastError') {
        return next(new CastErrorException('Candidate', error));
      }
      next(error);
    }
  };

  private deleteCandidate = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { candidate } = req.params;

      if (!candidate) {
        return next(new InvalidRequestException());
      }

      // Check if candidate exists
      const candidateInDB = await this.CandidateModel.findOne({
        _id: candidate
      });
      if (!candidateInDB) {
        return next(new ResourceNotFoundException(candidate, 'Candidate'));
      }

      await candidateInDB.remove(); // now finally remove candidate
      res.sendStatus(200); // send OK if no errors
    } catch (error) {
      if (error.name === 'CastError') {
        return next(new CastErrorException('Candidate', error));
      }
      next(error);
    }
  };

  private createCandidate = async (
    req: RequestWithUser,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { position } = req.query;

      if (!position || !req.file) {
        return next(new InvalidRequestException());
      }

      // check if position exists
      const positionInDB = await this.PositionModel.findById(position);

      if (!positionInDB) {
        return next(
          new ResourceNotFoundException(position.toString(), 'Position')
        );
      }

      const image = await sharp(req.file.buffer)
        .resize(200, 200)
        .toBuffer();
      const candidateData: CandidateDto = req.body;
      const createdCandidate = new this.CandidateModel({
        ...candidateData,
        photo: image,
        position: position
      });

      const savedCandidate = await createdCandidate.save();

      // Push position to the election.positions array
      positionInDB.candidates.push(createdCandidate._id);
      await positionInDB.save();
      res.status(201).json(savedCandidate);
    } catch (error) {
      if (error.code === 11000) {
        return next(new DuplicateItemException('Candidate'));
      }
      next(error);
    }
  };
}

export default CandidateController;
