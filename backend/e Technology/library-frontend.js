import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Book, User, Plus, Trash, Star } from 'lucide-react';

const API_BASE_URL = 'http://localhost:8080/api';

// BookList Component
const BookList = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get(searchQuery 
        ? `${API_BASE_URL}/books/search?query=${searchQuery}`
        : `${API_BASE_URL}/books`);
      setBooks(response.data);
    };
    fetchBooks();
  }, [searchQuery]);

  return (
    <div className="p-6">
      <input
        type="text"
        placeholder="Search books..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map(book => (
          <div key={book.id} className="border rounded p-4">
            <h3 className="text-xl font-bold">{book.title}</h3>
            <p className="text-gray-600">{book.author}</p>
            <p className="text-sm">Published: {book.publicationYear}</p>
            <div className="flex items-center gap-2 mt-2">
              <Star className="text-yellow-500" size={16} />
              <span>{book.rating}</span>
              <span className="text-gray-500">({book.readCount} reads)</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// BookDetails Component
const BookDetails = ({ bookId }) => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const response = await axios.get(`${API_BASE_URL}/books/${bookId}`);
      setBook(response.data);
    };
    fetchBook();
  }, [bookId]);

  if (!book) return <div>Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
      <div className="space-y-4">
        <p className="text-xl">By {book.author}</p>
        <p>Published: {book.publicationYear}</p>
        <div className="flex items-center gap-2">
          <Star className="text-yellow-500" />
          <span>{book.rating} ({book.readCount} reads)</span>
        </div>
      </div>
    </div>
  );
};

// ReadingList Component
const ReadingList = ({ userId }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchReadingList = async () => {
      const response = await axios.get(`${API_BASE_URL}/users/${userId}/books`);
      setBooks(response.data);
    };
    fetchReadingList();
  }, [userId]);

  const removeFromList = async (bookId) => {
    await axios.delete(`${API_BASE_URL}/users/books/${userId}/${bookId}`);
    setBooks(books.filter(book => book.id !== bookId));
  };

  return (
    <div className="space-y-4">
      {books.map(book => (
        <div key={book.id} className="flex items-center justify-between p-4 border rounded">
          <div>
            <h3 className="font-semibold">{book.title}</h3>
            <p className="text-sm text-gray-600">{book.author}</p>
          </div>
          <button
            onClick={() => removeFromList(book.id)}
            className="p-2 text-red-500 hover:bg-red-50 rounded"
          >
            <Trash size={20} />
          </button>
        </div>
      ))}
    </div>
  );
};

// BookForm Component
const BookForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publicationYear: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_BASE_URL}/books`, formData);
    setFormData({ title: '', author: '', publicationYear: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={e => setFormData({...formData, title: e.target.value})}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={formData.author}
        onChange={e => setFormData({...formData, author: e.target.value})}
        className="w-full p-2 border rounded"
        required
      />
      <input
        type="number"
        placeholder="Publication Year"
        value={formData.publicationYear}
        onChange={e => setFormData({...formData, publicationYear: e.target.value})}
        className="w-full p-2 border rounded"
        required
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Add Book
      </button>
    </form>
  );
};

export { BookList, BookDetails, ReadingList, BookForm };
