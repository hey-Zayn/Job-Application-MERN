const express = require('express');

const isAuthenticated = require('../middleware/isAuthenticated');
const { applyJob, GetAppliedJobs, GetApplicants, updateStatus } = require('../controller/application.controller');

const router = express.Router();

router.get('/apply/:id', isAuthenticated, applyJob);
router.get('/get', isAuthenticated, GetAppliedJobs);
router.get('/:id/applicants', isAuthenticated, GetApplicants);
router.post('/status/:id', isAuthenticated, updateStatus);

module.exports = router;