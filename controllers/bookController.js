const Book = require('../models/Book');

// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get book by ISBN
exports.getBookByISBN = async (req, res) => {
  try {
    const book = await Book.findOne({ isbn: req.params.isbn });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get books by author
exports.getBooksByAuthor = async (req, res) => {
  try {
    const books = await Book.find({ author: req.params.author });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get books by title
exports.getBooksByTitle = async (req, res) => {
  try {
    const books = await Book.find({ title: req.params.title });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get book review
exports.getBookReview = async (req, res) => {
  try {
    const book = await Book.findOne({ isbn: req.params.isbn });
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book.reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add or modify book review
exports.addOrModifyReview = async (req, res) => {
  try {
    const { isbn, user, review } = req.body;
    const book = await Book.findOne({ isbn });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const existingReviewIndex = book.reviews.findIndex(r => r.user === user);
    if (existingReviewIndex !== -1) {
      book.reviews[existingReviewIndex].review = review;
    } else {
      book.reviews.push({ user, review });
    }
    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete book review
exports.deleteReview = async (req, res) => {
  try {
    const { isbn, user } = req.params;
    const book = await Book.findOne({ isbn });
    if (!book) return res.status(404).json({ message: 'Book not found' });

    book.reviews = book.reviews.filter(r => r.user !== user);
    await book.save();
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
