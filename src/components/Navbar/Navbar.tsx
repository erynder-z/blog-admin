import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <div className="navbar">
      <h1 className="nav-title">Admin</h1>
      <div className="nav-list">
        <Link to="/all" className="nav-list-item">
          All
        </Link>
        <Link to="/published" className="nav-list-item">
          Published posts
        </Link>
        <Link to="/unpublished" className="nav-list-item">
          Unpublished posts
        </Link>
        <Link to="/tags" className="nav-list-item">
          Tags
        </Link>
      </div>
    </div>
  );
}
