import React, { useState, useEffect } from 'react';
import { Book, User, Plus, Trash, Star } from 'lucide-react';

// BookDetails Component
const BookDetails = ({ bookId }) => {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`/books/${bookId}`);
        const data = await response.json();
        setBook(data);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [bookId]);

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">{book.title}</h2>
      <div className="space-y-4">
        <p className="text-xl">By {book.author}</p>
        <p>Published: {book.publicationYear}</p>
        <div className="flex items-center gap-2">
          <Star className="text-yellow-500" />
          <span>{book.averageRating.toFixed(1)} ({book.ratings} ratings)</span>
        </div>
        <p>{book.description}</p>
      </div>
    </div>
  );
};

// CategoryList Component
const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('/categories').then(res => res.json()).then(setCategories);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map(category => (
        <div key={category.id} className="p-4 border rounded hover:bg-gray-50">
          <h3 className="font-semibold">{category.name}</h3>
          <p className="text-sm text-gray-600">{category.bookCount} books</p>
        </div>
      ))}
    </div>
  );
};

// ReadingList Component
const ReadingList = ({ userId }) => {
  const [books, setBooks] = useState([]);

  const removeFromList = async (bookId) => {
    await fetch(`/users/books/${userId}/${bookId}`, { method: 'DELETE' });
    setBooks(books.filter(book => book.id !== bookId));
  };

  useEffect(() => {
    fetch(`/users/${userId}/books`).then(res => res.json()).then(setBooks);
  }, [userId]);

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
    categories: [],
    description: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
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
      <textarea
        placeholder="Description"
        value={formData.description}
        onChange={e => setFormData({...formData, description: e.target.value})}
        className="w-full p-2 border rounded"
        rows={4}
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Add Book
      </button>
    </form>
  );
};

// UserPanel Component
const UserPanel = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/users/${userId}`).then(res => res.json()).then(setUser);
  }, [userId]);

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
          <User size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{user?.name}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>
      <div className="border-t pt-4">
        <h3 className="font-semibold mb-2">Reading Statistics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded">
            <p className="text-2xl font-bold">{user?.booksRead}</p>
            <p className="text-sm text-gray-600">Books Read</p>
          </div>
          <div className="p-4 bg-gray-50 rounded">
            <p className="text-2xl font-bold">{user?.reviewsWritten}</p>
            <p className="text-sm text-gray-600">Reviews Written</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export { BookDetails, CategoryList, ReadingList, BookForm, UserPanel };
