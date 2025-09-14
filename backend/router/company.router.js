const express = require('express');

const isAuthenticated = require('../middleware/isAuthenticated');
const { registerCompany, GetCompany, GetCompanyById, updateCompany } = require('../controller/company.controller');
const router = express.Router();

router.post('/resgister-company', isAuthenticated, registerCompany)
router.get('/get-company', isAuthenticated, GetCompany)
router.get('/get-companybyid/:id', isAuthenticated, GetCompanyById)
router.put('/update-company/:id', isAuthenticated, updateCompany)

module.exports = router;