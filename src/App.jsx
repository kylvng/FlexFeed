import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import PostPage from './pages/PostPage';
import Update from './pages/Update';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    // Handle search logic here, such as filtering posts based on the query
  };

  return (
    <Router>
      <div className='whole-page'>
        <Navbar onSearch={handleSearch} />
        <div className='main-content'>
          <Routes>
            <Route path="/" element={<Home searchQuery={searchQuery} />} />
            <Route path="/create" element={<Create />} />
            <Route path="/post/:postId" element={<PostPage />} />
            <Route path="/update/:postId" element={<Update />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
