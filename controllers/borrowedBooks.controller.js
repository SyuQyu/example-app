const borrowedBookQueries = require('../queries/borrowedBooks.services');

// Create a new borrowed book
async function createBorrowedBook(req, res, next) {
    try {
        const { userId, bookId } = req.body;
        const borrowedBook = await borrowedBookQueries.createBorrowedBook(parseInt(userId), parseInt(bookId));
        res.json(borrowedBook);
    } catch (err) {
        next(err);
    }
}

// Get all borrowed books
async function getAllBorrowedBooks(req, res, next) {
    try {
        const borrowedBooks = await borrowedBookQueries.getAllBorrowedBooks();
        res.json(borrowedBooks);
    } catch (err) {
        next(err);
    }
}

// Get a borrowed book by ID
async function getBorrowedBookById(req, res, next) {
    try {
        const { id } = req.params;
        const borrowedBook = await borrowedBookQueries.getBorrowedBookById(parseInt(id));
        res.json(borrowedBook);
    } catch (err) {
        next(err);
    }
}

// Update the return date of a borrowed book
async function updateReturnDate(req, res, next) {
    try {
        const { id } = req.params;
        const { returnDate } = req.body;
        const updatedBorrowedBook = await borrowedBookQueries.updateReturnDate(parseInt(id), returnDate);
        res.json(updatedBorrowedBook);
    } catch (err) {
        next(err);
    }
}

// Delete a borrowed book by ID
async function deleteBorrowedBook(req, res, next) {
    try {
        const { id } = req.params;
        const deletedBorrowedBook = await borrowedBookQueries.deleteBorrowedBook(parseInt(id));
        res.json(deletedBorrowedBook);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    createBorrowedBook,
    getAllBorrowedBooks,
    getBorrowedBookById,
    updateReturnDate,
    deleteBorrowedBook,
};
