const express = require('express');
const borrowedBookController = require('../controllers/borrowedBooks.controller');
const { isAuthenticated, checkUserLevel } = require('../middleware');
const router = express.Router();


// Create a new borrowed book
router.post('/create', isAuthenticated, checkUserLevel, borrowedBookController.createBorrowedBook);

// Get all borrowed books
router.get('/', isAuthenticated, checkUserLevel, borrowedBookController.getAllBorrowedBooks);

// Get a borrowed book by ID
router.get('/:id', isAuthenticated, checkUserLevel, borrowedBookController.getBorrowedBookById);

// Update the return date of a borrowed book
router.put('/:id', isAuthenticated, checkUserLevel, borrowedBookController.updateReturnDate);

// Delete a borrowed book by ID
router.delete('/:id', isAuthenticated, checkUserLevel, borrowedBookController.deleteBorrowedBook);

module.exports = router;
