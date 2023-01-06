import React from 'react';
import './Navbar.css';

export default function Navbar() {
  return (
    <div className="navbar">
      <h1 className="nav-title">Admin</h1>
      <div className="nav-list">
        <a href="/all" className="nav-list-item">
          All
        </a>
        <a href="/published" className="nav-list-item">
          Unpublished posts
        </a>
        <a href="/unpublished" className="nav-list-item">
          Published posts
        </a>
        <a href="/tags" className="nav-list-item">
          Tags
        </a>
      </div>
    </div>
  );
}
