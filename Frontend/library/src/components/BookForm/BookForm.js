// src/components/BookForm.js
import React, { useState } from 'react';
import axiosInstance from '../../axiosConfig'; // Adjust the import path

const BookForm = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const newBook = { title, author, year, category };

    axiosInstance.post('/books', newBook)
      .then(response => {
        console.log('Book added:', response.data);
        setTitle('');
        setAuthor('');
        setYear('');
        setCategory('');
        alert('Book added successfully!');
      })
      .catch(error => console.error('Error adding book:', error));
  };

  return (
    <div className="container mt-5">
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <div className="mb-3">
          <label className="form-label">Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Author:</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Year:</label>
          <input type="number" value={year} onChange={(e) => setYear(e.target.value)} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Category:</label>
          <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary">Add Book</button>
      </form>
    </div>
  );
};

export default BookForm;
