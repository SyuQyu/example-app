const express = require('express');
const { profile, getAllUser } = require('../controllers/user.controller')
const { isAuthenticated, checkUserLevelAdmin } = require('../middleware');
const router = express.Router();

router.get('/profile', isAuthenticated, profile);

router.get('/users', isAuthenticated, checkUserLevelAdmin, getAllUser);

module.exports = router;
