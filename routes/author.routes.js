const express = require('express');
const authorController = require('../controllers/author.controller');
const { isAuthenticated, checkUserLevel } = require('../middleware');
const router = express.Router();

// Create a new author
router.post('/create', isAuthenticated, checkUserLevel, authorController.createAuthor);

// Get author by ID
router.get('/:id', isAuthenticated, checkUserLevel, authorController.getAuthorById);

// Get all authors
router.get('/', isAuthenticated, checkUserLevel,  authorController.getAllAuthors);

// Update an author
router.put('/:id', isAuthenticated, checkUserLevel, authorController.updateAuthor);

// Delete an author
router.delete('/:id', isAuthenticated, checkUserLevel, authorController.deleteAuthor);

// Get author with associated user
router.get('/:id/withUser', isAuthenticated, checkUserLevel, authorController.getAuthorWithUser);

module.exports = router;
