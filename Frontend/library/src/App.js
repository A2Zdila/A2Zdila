// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import BookList from './components/BookList/BookList';
import BookDetails from './components/BookDetatils/BookDetails';
import CategoryList from './components/CategoryList/CategoryList';
import ReadingList from './components/ReadingList/ReadingList';
import BookForm from './components/BookForm/BookForm';
import UserPanel from './components/UserPanel/UserPanel';
import Navbar from './components/navbar/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => (
  <Router>
    <Navbar />
    <div className="container mt-4">
      <Routes>
        <Route path="/" element={<BookList />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/categories" element={<CategoryList />} />
        <Route path="/reading-list" element={<ReadingList />} />
        <Route path="/add-book" element={<BookForm />} />
        <Route path="/user-panel" element={<UserPanel />} />
      </Routes>
    </div>
  </Router>
);

export default App;
