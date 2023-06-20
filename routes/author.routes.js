const express = require('express');
const authorController = require('../controllers/author.controller');

const router = express.Router();

// Create a new author
router.post('/create', authorController.createAuthor);

// Get author by ID
router.get('/:id', authorController.getAuthorById);

// Get all authors
router.get('/', authorController.getAllAuthors);

// Update an author
router.put('/:id', authorController.updateAuthor);

// Delete an author
router.delete('/:id', authorController.deleteAuthor);

// Get author with associated user
router.get('/:id/withUser', authorController.getAuthorWithUser);

module.exports = router;
