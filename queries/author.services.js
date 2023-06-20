const { prisma } = require(".");

async function createAuthor(userId) {
    const createdAuthor = await prisma.author.create({
        data: {
            userId: parseInt(userId),
        },
    });
    return createdAuthor;
}

async function getAuthorById(id) {
    const author = await prisma.author.findUnique({
        where: {
            id: parseInt(id),
        },
    });
    return author;
}

async function getAllAuthors() {
    const authors = await prisma.author.findMany();
    return authors;
}

async function updateAuthor(id, userId) {
    const updatedAuthor = await prisma.author.update({
        where: {
            id: parseInt(id),
        },
        data: {
            userId: parseInt(userId),
        },
    });
    return updatedAuthor;
}

async function deleteAuthor(id) {
    const deletedAuthor = await prisma.author.delete({
        where: {
            id: parseInt(id),
        },
    });
    return deletedAuthor;
}

async function getAuthorWithUser(id) {
    const author = await prisma.author.findUnique({
        where: {
            id: parseInt(id),
        },
        include: {
            user: true,
        },
    });
    return author;
}

module.exports = {
    createAuthor,
    getAuthorById,
    getAllAuthors,
    updateAuthor,
    deleteAuthor,
    getAuthorWithUser,
};