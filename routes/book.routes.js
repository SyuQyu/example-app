const express = require('express');
const bookController = require('../controllers/book.controller');
const { isAuthenticated, checkUserLevel } = require('../middleware');
const router = express.Router();

// Create a book
router.post('/create', isAuthenticated, checkUserLevel, bookController.createBook);

// Get a book by ID
router.get('/:id', bookController.getBookById);

// Get all books
router.get('/', bookController.getAllBooks);

// Update a book
router.put('/:id', isAuthenticated, checkUserLevel, bookController.updateBook);

// Delete a book
router.delete('/:id', isAuthenticated, checkUserLevel, bookController.deleteBook);

// Get books by author
router.get('/authors/:authorId/books', bookController.getBooksByAuthor);

module.exports = router;
