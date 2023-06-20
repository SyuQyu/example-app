const authorQueries = require('../queries/author.services');

async function createAuthor(req, res, next) {
    try {
        const { userId } = req.body;
        const createdAuthor = await authorQueries.createAuthor(userId);
        res.json(createdAuthor);
    } catch (err) {
        next(err);
    }
}

async function getAuthorById(req, res, next) {
    try {
        const { id } = req.params;
        const author = await authorQueries.getAuthorById(id);
        res.json(author);
    } catch (err) {
        next(err);
    }
}

async function getAllAuthors(req, res, next) {
    try {
        const authors = await authorQueries.getAllAuthors();
        res.json(authors);
    } catch (err) {
        next(err);
    }
}

async function updateAuthor(req, res, next) {
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const updatedAuthor = await authorQueries.updateAuthor(id, userId);
        res.json(updatedAuthor);
    } catch (err) {
        next(err);
    }
}

async function deleteAuthor(req, res, next) {
    try {
        const { id } = req.params;
        const deletedAuthor = await authorQueries.deleteAuthor(id);
        res.json(deletedAuthor);
    } catch (err) {
        next(err);
    }
}

async function getAuthorWithUser(req, res, next) {
    try {
        const { id } = req.params;
        const author = await authorQueries.getAuthorWithUser(id);
        res.json(author);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createAuthor,
    getAuthorById,
    getAllAuthors,
    updateAuthor,
    deleteAuthor,
    getAuthorWithUser,
};
