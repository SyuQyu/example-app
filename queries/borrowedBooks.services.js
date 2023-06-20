const { prisma } = require(".");

// Create a new borrowed book
async function createBorrowedBook(userId, bookId) {
    const borrowedBook = await prisma.borrowedBook.create({
        data: {
            userId,
            bookId,
        },
    });

    return borrowedBook;
}

// Get all borrowed books
async function getAllBorrowedBooks() {
    const borrowedBooks = await prisma.borrowedBook.findMany({
        include: {
            user: true,
            book: true,
        },
    });
    return borrowedBooks;
}

// Get a borrowed book by ID
async function getBorrowedBookById(borrowedBookId) {
    const borrowedBook = await prisma.borrowedBook.findUnique({
        where: {
            id: borrowedBookId,
        },
        include: {
            user: true,
            book: true,
        },
    });

    return borrowedBook;
}

// Update the return date of a borrowed book
async function updateReturnDate(borrowedBookId, returnDate) {
    const updatedBorrowedBook = await prisma.borrowedBook.update({
        where: {
            id: borrowedBookId,
        },
        data: {
            returnDate,
        },
    });

    return updatedBorrowedBook;
}

// Delete a borrowed book by ID
async function deleteBorrowedBook(borrowedBookId) {
    const deletedBorrowedBook = await prisma.borrowedBook.delete({
        where: {
            id: borrowedBookId,
        },
    });

    return deletedBorrowedBook;
}

module.exports = {
    createBorrowedBook,
    getAllBorrowedBooks,
    getBorrowedBookById,
    updateReturnDate,
    deleteBorrowedBook,
};