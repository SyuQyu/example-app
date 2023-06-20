const jwt = require('jsonwebtoken');
const { findUserById } = require('../queries/users.services');

function isAuthenticated(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401);
        res.json({ message: '🚫 Un-Authorized 🚫' });
    }

    try {
        const token = authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.payload = payload;
    } catch (err) {
        res.status(401);
        if (err.name === 'TokenExpiredError') {
            res.json({ message: err.name });
            throw new Error(err.name);
        }
        res.json({ message: '🚫 Un-Authorized 🚫' });
    }

    return next();

}

async function checkUserLevelAdmin(req, res, next) {
    const { userId } = req.payload;
    const user = await findUserById(userId);
    if (user.userLevel !== 3) {
        return res.status(401).send({ message: 'You are not authorized to access this endpoint.' });
    }
    next();
}

async function checkUserLevel(req, res, next) {
    const { userId } = req.payload;
    const user = await findUserById(userId);
    if (user.userLevel < 2) {
        return res.status(401).send({ message: 'You are not authorized as guard to access this endpoint.', id: user.userLevel });
    }
    next();
}


module.exports = {
    isAuthenticated,
    checkUserLevelAdmin,
    checkUserLevel


}