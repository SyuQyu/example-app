const express = require('express');
const borrowedBookController = require('../controllers/borrowedBooks.controller');

const router = express.Router();


// Create a new borrowed book
router.post('/create', borrowedBookController.createBorrowedBook);

// Get all borrowed books
router.get('/', borrowedBookController.getAllBorrowedBooks);

// Get a borrowed book by ID
router.get('/:id', borrowedBookController.getBorrowedBookById);

// Update the return date of a borrowed book
router.put('/:id', borrowedBookController.updateReturnDate);

// Delete a borrowed book by ID
router.delete('/:id', borrowedBookController.deleteBorrowedBook);

module.exports = router;
