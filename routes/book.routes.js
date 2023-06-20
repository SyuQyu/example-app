const express = require('express');
const bookController = require('../controllers/book.controller');

const router = express.Router();

// Create a book
router.post('/create', bookController.createBook);

// Get a book by ID
router.get('/:id', bookController.getBookById);

// Get all books
router.get('/', bookController.getAllBooks);

// Update a book
router.put('/:id', bookController.updateBook);

// Delete a book
router.delete('/:id', bookController.deleteBook);

// Get books by author
router.get('/authors/:authorId/books', bookController.getBooksByAuthor);

module.exports = router;
