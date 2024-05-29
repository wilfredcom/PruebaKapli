const express = require('express');
const authorController = require('../controllers/authorController');
const bookController = require('../controllers/bookController');

const router = express.Router();

// Author routes
router.post('/authors', authorController.createAuthor);
router.get('/authors', authorController.getAuthors);

// Book routes
router.post('/books', bookController.createBook);

module.exports = router;
