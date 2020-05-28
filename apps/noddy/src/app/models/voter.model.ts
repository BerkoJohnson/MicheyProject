import * as mongoose from 'mongoose';
import Voter from '../interfaces/voter.interface';
import electionModel from './election.model';

const voterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true
    },
    gender: {
      type: String
    },
    room: {
      type: String
    },
    password: String,
    election: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Election'
    },
    isVoted: { type: Boolean, default: false },
    votes: [
      {
        candidate: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Candidate'
        },
        position: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Position'
        },
        castType: {
          type: String,
          enum: ['Yes', 'No', 'Thumbs'],
          default: 'Thumbs'
        }
      }
    ]
  },
  {
    timestamps: true
  }
);

voterSchema.pre<Voter & mongoose.Document>('remove', async function(
  next: mongoose.HookNextFunction
) {
  try {
    await electionModel.findByIdAndUpdate(this.election, {
      $pull: { voters: this._id }
    });
  } catch (error) {
    return next(error);
  }
});

voterSchema.pre<Voter & mongoose.Document>('save', async function(
  next: mongoose.HookNextFunction
) {
  try {
    await electionModel.findByIdAndUpdate(this.election, {
      $push: { voters: this._id }
    });
  } catch (error) {
    next(error);
  }
});

const VoterModel = mongoose.model<Voter & mongoose.Document>(
  'Voter',
  voterSchema
);

export default VoterModel;
