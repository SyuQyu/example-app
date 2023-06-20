const { findUserById, getUsers } = require('../queries/users.services');

const profile = async (req, res, next) => {
    try {
        const { userId } = req.payload;
        const user = await findUserById(userId);
        delete user.password;
        res.json(user);
    } catch (err) {
        next(err);
    }
}

const getAllUser = async (req, res, next) => {
    try {
        const users = await getUsers();
        delete users.password;
        res.json(users);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    profile,
    getAllUser

}