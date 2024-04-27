import React from "react";
import { Link } from 'react-router-dom';
import "./Navbar.css"

function Navbar() {
   
    return (
      <>
       <div className="Navbar">
        <div className="nav-logo">
            <h2>FlexFeed</h2>
        </div>
        <div>

        </div>
        <div className="nav-links">
            <Link to={`/`}><button>Home</button></Link>
            <Link to={`/create`}><button>Create Post</button></Link>
        </div>
       </div>
      </>
    )
  }
  
  export default Navbar
  