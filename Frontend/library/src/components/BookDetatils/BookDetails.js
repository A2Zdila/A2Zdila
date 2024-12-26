// src/components/BookDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState({});

  useEffect(() => {
    axios.get(`/books/${id}`)
      .then(response => setBook(response.data))
      .catch(error => console.error('Error fetching book details:', error));
  }, [id]);

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">{book.title}</h2>
          <h6 className="card-subtitle mb-2 text-muted">by {book.author}</h6>
          <p className="card-text">Category: {book.category ? book.category.name : 'No Category'}</p>
          <p className="card-text">Description: {book.description}</p>
          <p className="card-text">Year: {book.year}</p>
          <button className="btn btn-primary" onClick={() => window.history.back()}>Back</button>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
