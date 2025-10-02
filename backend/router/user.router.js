const express = require('express');
const { register, login, logout, updateProfile } = require('../controller/user.controller');
const isAuthenticated = require('../middleware/isAuthenticated');
const router = express.Router();
const upload = require('../utils/multerFile'); // Fixed multer


router.post('/register', upload, register);
router.post('/login', login);
router.put('/profile/update', isAuthenticated, updateProfile);
router.post('/logout', logout);


module.exports = router;