const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        required: true
    },
    profile: {
        bio: { type: String },
        skills: [{ type: String }],
        resume: { type: String },
        resumeOriginalName: {
            type: String
        },
        company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
        profilePhoto: { type: String, default: '' }
    }
}, { timestamp: true });


const User = mongoose.model('User', userSchema);
module.exports = User; 