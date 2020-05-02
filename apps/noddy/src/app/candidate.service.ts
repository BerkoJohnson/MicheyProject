import CandidateModel from './models/candidate.model';
import { VotingElection } from './interfaces/voteElection.interface';
import Candidate from './interfaces/candidate.interface';
import ElectionModel from './models/election.model';
import PositionModel from './models/position.model';

export const lastElection = async () => {
  // Get last election
  const election = await ElectionModel.findOne({})
    .sort('-1')
    .limit(1);

  const positions = await PositionModel.find({
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

  return thisElectionObj;
};

export const getCandidateByElection = async (id: string) => {
  const candidates = await CandidateModel.find({
    election: id
  }).populate('position');

  return candidates.map(c => {
    return {
      _id: c._id,
      name: c.name,
      gender: c.gender,
      nickname: c.nickname,
      dob: c.dob,
      room: c.room,
      position: {
        _id: c.position['_id'],
        title: c.position['title']
      },
      photo: c.photo.toString('base64')
    };
  });
};
