import React from 'react';
import './AddPostSection.css';
import { FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function AddPostSection() {
  return (
    <div className="add_post-container">
      <Link to="/add_post" className="addPostBtn">
        Add post <FaPen />
      </Link>
    </div>
  );
}
