// src/components/BookList.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axiosConfig'; // Adjust the import path

const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    axiosInstance.get('/books')
      .then(response => setBooks(response.data))
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Book List</h2>
      <div className="row">
        {books.map(book => (
          <div className="col-md-4 mb-4" key={book.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
