const { prisma } = require(".");

async function createBook(title, isFiction, datePublished, publisher, authorId) {
    const createdBook = await prisma.book.create({
        data: {
            title,
            isFiction,
            datePublished,
            publisher,
            authorId,
        },
    });
    return createdBook;
}

async function getBookById(id) {
    const book = await prisma.book.findUnique({
        where: {
            id,
        },
    });
    return book;
}

async function getAllBooks() {
    const books = await prisma.book.findMany();
    return books;
}

async function updateBook(id, title, isFiction, datePublished, publisher, authorId) {
    const updatedBook = await prisma.book.update({
        where: {
            id,
        },
        data: {
            title,
            isFiction,
            datePublished,
            publisher,
            authorId,
        },
    });
    return updatedBook;
}

async function deleteBook(id) {
    const deletedBook = await prisma.book.delete({
        where: {
            id,
        },
    });
    return deletedBook;
}

async function getBooksByAuthor(authorId) {
    const books = await prisma.book.findMany({
        where: {
            authorId,
        },
    });
    return books;
}

module.exports = {
    createBook,
    getBookById,
    getAllBooks,
    updateBook,
    deleteBook,
    getBooksByAuthor,
};
