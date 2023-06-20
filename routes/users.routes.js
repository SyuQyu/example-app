const express = require('express');
const { profile, getAllUser } = require('../controllers/user.controller')
const { isAuthenticated, checkUserLevel } = require('../middleware');
const router = express.Router();

router.get('/profile', isAuthenticated, profile);

router.get('/users', isAuthenticated, checkUserLevel, getAllUser);

module.exports = router;
