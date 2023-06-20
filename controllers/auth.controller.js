const { generateTokens } = require('../utils/jwt');
const {
    addRefreshTokenToWhitelist,
    findRefreshTokenById,
    deleteRefreshToken,
    revokeTokens
} = require('../queries/auth.services');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const {
    findUserByEmail,
    createUserByEmailAndPassword,
    findUserById
} = require('../queries/users.services');

const { hashToken } = require('../utils/hashToken');

const register = async (req, res, next) => {
    try {
        const { email, name, username, password, userLevel } = req.body;
        console.log(req.body, "data body")
        if (!email || !password) {
            res.status(400);
            throw new Error('You must provide an email and a password.');
        }

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            res.status(400);
            throw new Error('Email already in use.');
        }
        const parseIntUserLevel = parseInt(userLevel)
        const user = await createUserByEmailAndPassword({ email, name, username, password, userLevel: parseIntUserLevel });
        const { accessToken, refreshToken } = generateTokens(user, user.id);
        await addRefreshTokenToWhitelist({ jti: user.id, refreshToken, userId: user.id });

        res.json({
            accessToken,
            refreshToken,
        });
    } catch (err) {
        next(err);
    }
}

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400);
            throw new Error('You must provide an email and a password.');
        }

        const existingUser = await findUserByEmail(email);

        if (!existingUser) {
            res.status(403);
            throw new Error('Invalid login credentials.');
        }

        const validPassword = await bcrypt.compare(password, existingUser.password);
        if (!validPassword) {
            res.status(403);
            throw new Error('Invalid login credentials.');
        }

        const { accessToken, refreshToken } = generateTokens(existingUser, existingUser.id);
        await addRefreshTokenToWhitelist({ jti: existingUser.id, refreshToken, userId: existingUser.id });

        res.json({
            accessToken,
            refreshToken
        });
    } catch (err) {
        next(err);
    }
}

const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            res.status(400);
            throw new Error('Missing refresh token.');
        }
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const savedRefreshToken = await findRefreshTokenById(payload.jti);

        if (!savedRefreshToken || savedRefreshToken.revoked === true) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        const hashedToken = hashToken(refreshToken);
        if (hashedToken !== savedRefreshToken.hashedToken) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        const user = await findUserById(payload.userId);
        if (!user) {
            res.status(401);
            throw new Error('Unauthorized');
        }

        await deleteRefreshToken(savedRefreshToken.id);
        const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, user.id);
        await addRefreshTokenToWhitelist({ jti: user.id, refreshToken: newRefreshToken, userId: user.id });

        res.json({
            accessToken,
            refreshToken: newRefreshToken
        });
    } catch (err) {
        next(err);
    }
}

const revokeRefreshToken = async (req, res, next) => {
    try {
        const { userId } = req.body;
        await revokeTokens(userId);
        res.json({ message: `Tokens revoked for user with id #${userId}, Logout successful.` });
    } catch (err) {
        next(err);
    }
}

const logout = async (req, res, next) => {
    try {
        const { userId } = req.payload;
        await revokeTokens(userId);
        res.json({ message: `Logout successful.` });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    register,
    login,
    refreshToken,
    revokeRefreshToken,
    logout

}