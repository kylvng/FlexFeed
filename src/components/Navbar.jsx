import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ onSearch }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleInputChange = (event) => {
        const value = event.target.value;
        setSearchQuery(value);
        // Call the onSearch callback with the search query
        onSearch(value);
    };

    return (
        <div className="Navbar">
            <div className="nav-logo">
                <h2>FlexFeed</h2>
            </div>
            <div className="search-bar">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={handleInputChange}
                    placeholder="Search..."
                />
            </div>
            <div className="nav-links">
                <Link to={`/`}><button>Home</button></Link>
                <Link to={`/create`}><button>Create Post</button></Link>
            </div>
        </div>
    );
}

export default Navbar;
