const express = require('express');
const { register, login, refreshToken, revokeRefreshToken, logout } = require('../controllers/auth.controller')
const { isAuthenticated, checkUserLevelAdmin } = require('../middleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refreshToken', isAuthenticated, refreshToken);
router.post('/revokeRefreshTokens', isAuthenticated, checkUserLevelAdmin, revokeRefreshToken);
router.post('/logout', isAuthenticated, logout);

module.exports = router;