const bcrypt = require('bcrypt');
const { prisma } = require(".");

function findUserByEmail(email) {
    return prisma.user.findFirst({
        where: {
            email : email
        },
    });
}

function createUserByEmailAndPassword(user) {
    user.password = bcrypt.hashSync(user.password, 12);
    return prisma.user.create({
        data: user,
    });
}

function findUserById(id) {
    return prisma.user.findUnique({
        where: {
            id,
        },
    });
}

function getUsers() {
    return prisma.user.findMany();
}


module.exports = {
    findUserByEmail,
    findUserById,
    createUserByEmailAndPassword,
    getUsers
};