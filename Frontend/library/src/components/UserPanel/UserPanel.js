// src/components/UserPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPanel = () => {
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    books: [],
  });

  useEffect(() => {
    // Fetch details for user with ID 1
    axios.get('/api/users/1')
      .then(response => setUser(response.data))
      .catch(error => console.error('Error fetching user details:', error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.put(`/api/users/${user.id}`, user)
      .then(response => {
        console.log('User updated:', response.data);
        alert('User details updated successfully!');
      })
      .catch(error => console.error('Error updating user:', error));
  };

  return (
    <div className="container mt-5">
      <h2>User Panel</h2>
      <form onSubmit={handleSubmit} className="form-group">
        <div className="mb-3">
          <label className="form-label">Name:</label>
          <input type="text" name="name" value={user.name} onChange={handleInputChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email:</label>
          <input type="email" name="email" value={user.email} onChange={handleInputChange} className="form-control" required />
        </div>
        <button type="submit" className="btn btn-primary">Update User</button>
      </form>

      <h3 className="mt-4">Reading List</h3>
      <div className="row">
        {user.books.map(book => (
          <div className="col-md-4 mb-4" key={book.id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{book.author}</h6>
                <p className="card-text">Category: {book.category ? book.category.name : 'No Category'}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPanel;
