import React from 'react';
import './AddTagSection.css';
import { FaShapes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function AddTagSection() {
  return (
    <div className="add_tag-container">
      <Link to="/add_tag" className="addPostBtn">
        Add tag <FaShapes />
      </Link>
    </div>
  );
}
