// src/components/CategoryList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('/categories')
      .then(response => setCategories(response.data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Category List</h2>
      <div className="row">
        {categories.map(category => (
          <div className="col-md-4 mb-4" key={category.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{category.name}</h5>
                <p className="card-text">
                  {category.books && category.books.length > 0
                    ? `${category.books.length} books available`
                    : 'No books available'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryList;
