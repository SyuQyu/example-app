const jwt = require('jsonwebtoken');

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


module.exports = {
    isAuthenticated
    
}