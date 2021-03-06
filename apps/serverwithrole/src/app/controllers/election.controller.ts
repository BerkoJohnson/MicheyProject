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
import { VotingElection } from '../interfaces/voteElection.interface';

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

    this.router.get(`${this.path}/last`, this.getLast4Voting);

    this.router
      .route(`${this.path}/:election`)
      .get(authMiddleware, this.getElection)
      .put(authMiddleware, this.updateElection)
      .delete(authMiddleware, this.deleteElection);
  }

  private getElections = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const elections = await this.ElectionModel.find();
    res.json(elections);
  };

  private getLast4Voting = async (
    req: express.Request,
    res: express.Response
  ) => {
    // Get last election
    const election = await this.ElectionModel.findOne({})
      .sort('-1')
      .limit(1);

    const positions = await this.PositionModel.find({
      election: election._id
    })
      .populate('candidates')
      .exec();

    const thisElectionObj: VotingElection = {} as VotingElection;
    thisElectionObj._id = election.id;
    thisElectionObj.school = election.school;
    thisElectionObj.title = election.title;

    thisElectionObj.positions = positions.map(p => {
      //Candidates Array Restructuring
      const c = p.candidates.map(cd => {
        const cdd = (cd as unknown) as Candidate;

        // Remove position & election from candidate's object
        cdd.election = undefined;
        cdd.position = undefined;

        // candidate's data with photo converted to a base64 string
        return {
          _id: cdd._id,
          name: cdd.name,
          gender: cdd.gender,
          dob: cdd.dob,
          nickname: cdd.nickname,
          room: cdd.room,
          photo: cdd.photo.toString('base64')
        };
      });

      p.election = undefined;
      return {
        _id: p._id,
        title: p.title,
        candidates: c
      };
    });

    res.json(thisElectionObj);
  };

  private getElection = async (
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

      res.json(electionInDB);
    } catch (error) {
      if (error.name === 'CastError') {
        return next(new CastErrorException('Election', error));
      }
      console.error(error);
    }
  };

  private updateElection = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { election } = req.params;

      const electionInDB = await this.ElectionModel.findByIdAndUpdate(
        election,
        req.body,
        { new: true }
      );

      if (!electionInDB) {
        return next(new ResourceNotFoundException(election, 'Election'));
      }

      res.json(electionInDB);
    } catch (error) {
      if (error.name === 'CastError') {
        return next(new CastErrorException('Election', error));
      }
      console.error(error);
    }
  };

  private getElectionMoreInfo = async (
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

      const positions = await this.PositionModel.find({
        election: election
      })
        .populate('candidates')
        .exec();

      const thisElectionObj: VotingElection = {} as VotingElection;
      thisElectionObj._id = electionInDB._id;
      thisElectionObj.school = electionInDB.school;
      thisElectionObj.title = electionInDB.title;
      thisElectionObj.academicYear = electionInDB.academicYear;
      thisElectionObj.createdAt = electionInDB.createdAt;
      thisElectionObj.updatedAt = electionInDB.updatedAt;

      thisElectionObj.positions = positions.map(p => {
        //Candidates Array Restructuring
        const c = p.candidates.map(cd => {
          const cdd = (cd as unknown) as Candidate;

          // Remove position & election from candidate's object
          cdd.election = undefined;
          cdd.position = undefined;

          // candidate's data with photo converted to a base64 string
          return {
            _id: cdd._id,
            name: cdd.name,
            gender: cdd.gender,
            dob: cdd.dob,
            nickname: cdd.nickname,
            room: cdd.room,
            photo: cdd.photo.toString('base64')
          };
        });

        p.election = undefined;
        return {
          _id: p._id,
          title: p.title,
          candidates: c
        };
      });

      res.json(thisElectionObj);
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
