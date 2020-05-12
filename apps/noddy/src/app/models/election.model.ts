import * as mongoose from 'mongoose';
import Election from '../interfaces/election.interface';
import positionModel from './position.model';
import candidateModel from './candidate.model';

const electionSchema = new mongoose.Schema<Election>(
  {
    title: {
      type: String,
      unique: true,
      uppercase: true,
      trim: true,
      required: true
    },
    school: { type: String, required: true },
    academicYear: { type: String, required: true },
    positions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Position'
      }
    ]
  },
  {
    timestamps: true
  }
);

electionSchema.pre<Election & mongoose.Document>('remove', async function(
  next: mongoose.HookNextFunction
) {
  try {
    await positionModel.deleteMany({
      _id: {
        $in: this.positions
      }
    });
    await candidateModel.deleteMany({
      position: {
        $in: this.positions
      }
    });
  } catch (error) {
    return next(error);
  }
});

const electionModel = mongoose.model<Election & mongoose.Document>(
  'Election',
  electionSchema
);
export default electionModel;
