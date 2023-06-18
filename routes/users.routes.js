const express = require('express');
const { findUserById, getUsers } = require('../queries/users.services');
const { isAuthenticated } = require('../middleware');
const router = express.Router();

router.get('/profile', isAuthenticated, async (req, res, next) => {
    try {
        const { userId } = req.payload;
        const user = await findUserById(userId);
        delete user.password;
        res.json(user);
    } catch (err) {
        next(err);
    }
});

router.get('/users', isAuthenticated, async (req, res, next) => {
    const { userId } = req.payload;
    const user = await findUserById(userId);
    if(user.userLevel !== 2) {
        return res.status(401).send({ message: 'You are not authorized to access this endpoint.' });
    } else {
        try {
            const users = await getUsers();
            delete users.password;
            res.json(users);
        } catch (err) {
            next(err);
        }
    }
});

module.exports = router;
