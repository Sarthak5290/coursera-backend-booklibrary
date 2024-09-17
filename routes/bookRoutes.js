const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

router.get('/books', bookController.getBooks);
router.get('/books/isbn/:isbn', bookController.getBookByISBN);
router.get('/books/author/:author', bookController.getBooksByAuthor);
router.get('/books/title/:title', bookController.getBooksByTitle);
router.get('/books/review/:isbn', bookController.getBookReview);
router.post('/books/review', bookController.addOrModifyReview);
router.delete('/books/review/:isbn/:user', bookController.deleteReview);

module.exports = router;
