import * as mongoose from 'mongoose';
import Position from '../interfaces/position.interface';
import candidateModel from '../models/candidate.model';
import electionModel from './election.model';

interface IPosition extends mongoose.Document {}

const positionSchema = new mongoose.Schema<Position>({
  title: {
    type: String,
    unique: true,
    uppercase: true,
    trim: true,
    required: true
  },
  election: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Election',
    required: true
  },
  candidates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Candidate'
    }
  ]
});

positionSchema.pre<Position & mongoose.Document>('remove', async function(
  next: mongoose.HookNextFunction
) {
  try {
    // Remove the position from the election.position array
    await electionModel.findByIdAndUpdate(this.election, {
      $pull: { positions: this._id }
    });

    // Then delete all candidates assigned to this positions
    await candidateModel.deleteMany({
      _id: {
        $in: this.candidates
      }
    });
  } catch (error) {
    return next(error);
  }
});

const positionModel = mongoose.model<Position & mongoose.Document>(
  'Position',
  positionSchema
);

export default positionModel;
