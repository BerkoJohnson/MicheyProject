import * as mongoose from 'mongoose';

export const PositionSchama = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: [true, 'Title is required']
    },
    election: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Election'
    }
});