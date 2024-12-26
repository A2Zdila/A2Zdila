// src/components/ReadingList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReadingList = () => {
  const [readingList, setReadingList] = useState([]);

  useEffect(() => {
    axios.get('/users/1/books') // Assume user ID 1 for simplicity
      .then(response => setReadingList(response.data))
      .catch(error => console.error('Error fetching reading list:', error));
  }, []);

  return (
    <div>
      <h2>My Reading List</h2>
      <ul>
        {readingList.map(book => (
          <li key={book.id}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ReadingList;
