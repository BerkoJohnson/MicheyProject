import * as mongoose from 'mongoose';

export const ElectionSchama = new mongoose.Schema({
    title: {
        type: String,
        unique: true,
        required: [true, 'Title is required']
    },
    school:{
        type: String,
        required: true,
        trim: true
    },
    academicYear:{
        type: String,
        required: true,
        trim: true
    },
    positions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Position'
        }
    ]
});