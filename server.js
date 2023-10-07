const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors')

app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/booksystem', { useNewUrlParser: true });

// Define the Book schema
const bookSchema = new mongoose.Schema({
  id:String,
  title: String,
  author: String,
  isbn: String
});

const Book = mongoose.model('booksystem', bookSchema);

// API endpoint to fetch all books
app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// API endpoint to add a new book
app.post('/addbook', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// API endpoint to delete a book by its ISBN
app.delete('/books/:isbn', async (req, res) => {
  try {
    await Book.deleteOne({ isbn: req.params.isbn });
    res.json({ message: 'Book deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
