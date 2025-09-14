
const mongoose = require('mongoose');
// const Company = require('./comapny.model'); 

const jobSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    requirements: [{
        type: String
    }],
    salary: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    jobType: {
        type: String,
        required: true,
    },
    experienceLevel: {
        type: Number,
    },
    position: {
        type: Number,
        required: true,
    },
     company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application'
        }
    ],

}, { timestamps: true });

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;