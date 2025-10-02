const express = require('express');

const isAuthenticated = require('../middleware/isAuthenticated');
const { PostJob, GetAllJobs, GetJobById, GetAdminJobs } = require('../controller/job.controller');
const router = express.Router();

router.post('/post-job', isAuthenticated, PostJob)
router.get('/get-alljob', isAuthenticated, GetAllJobs)
router.get('/get-jobbyid/:id', isAuthenticated, GetJobById)
router.get('/get-adminjob', isAuthenticated, GetAdminJobs)

module.exports = router;