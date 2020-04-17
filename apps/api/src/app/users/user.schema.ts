import { Schema } from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Name is required']
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Username is required']
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Email is required']
    },
    photo: {
        type: String,
    },
    telephone: {
        type: String,
        unique: true,
        required: [true, 'Phone number is required']
    },
    salt: String,
    hash: String,
}, {
    timestamps: true
});


export default UserSchema;