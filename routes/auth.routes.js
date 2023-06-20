const express = require('express');
const { isAuthenticated } = require('../middleware');
const { register, login, refreshToken, revokeRefreshToken, logout } = require('../controllers/auth.controller')
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refreshToken', refreshToken);
router.post('/revokeRefreshTokens', revokeRefreshToken);
router.post('/logout', isAuthenticated, logout);

module.exports = router;