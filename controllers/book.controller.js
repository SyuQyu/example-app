const bookQueries = require('../queries/book.services');
const authorQueries = require('../queries/author.services');
async function createBook(req, res, next) {
    try {
        const { title, isFiction, datePublished, publisher, authorId } = req.body;

        const createdBook = await bookQueries.createBook(
            title,
            isFiction === "false" ? false : true,
            new Date(datePublished),
            publisher,
            parseInt(authorId)
        );
        res.json(createdBook);
    } catch (err) {
        next(err);
    }
}

async function getBookById(req, res, next) {
    try {
        const { id } = req.params;
        const book = await bookQueries.getBookById(parseInt(id));
        res.json(book);
    } catch (err) {
        next(err);
    }
}

async function getAllBooks(req, res, next) {
    try {
        const books = await bookQueries.getAllBooks();
        res.json(books);
    } catch (err) {
        next(err);
    }
}

async function updateBook(req, res, next) {
    try {
        const { id } = req.params;
        const { title, isFiction, datePublished, publisher, authorId } = req.body;
        const updatedBook = await bookQueries.updateBook(
            parseInt(id),
            title,
            isFiction === "false" ? false : true,
            new Date(datePublished),
            publisher,
            parseInt(authorId)
        );
        res.json(updatedBook);
    } catch (err) {
        next(err);
    }
}

async function deleteBook(req, res, next) {
    try {
        const { id } = req.params;
        const deletedBook = await bookQueries.deleteBook(parseInt(id));
        res.json(deletedBook);
    } catch (err) {
        next(err);
    }
}

async function getBooksByAuthor(req, res, next) {
    try {
        const { authorId } = req.params;
        const books = await bookQueries.getBooksByAuthor(parseInt(authorId));

        const booksWithUser = [];
        const user = await authorQueries.getAuthorWithUser(books[0].authorId);
        booksWithUser.push({ books, Author: user });

        console.log(booksWithUser);
        res.json(booksWithUser);
    } catch (err) {
        next(err);
    }
}


module.exports = {
    createBook,
    getBookById,
    getAllBooks,
    updateBook,
    deleteBook,
    getBooksByAuthor,
};
