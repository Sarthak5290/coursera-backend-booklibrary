const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  isbn: { type: String, required: true, unique: true },
  reviews: [{ user: String, review: String }],
});

module.exports = mongoose.model("Book", BookSchema);
