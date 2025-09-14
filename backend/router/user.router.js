const express = require('express');
const { register, login, logout, updateProfile } = require('../controller/user.controller');
const isAuthenticated = require('../middleware/isAuthenticated');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/profile/update',isAuthenticated, updateProfile);
router.post('/logout', logout);


module.exports = router;