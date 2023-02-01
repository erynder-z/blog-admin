import React from 'react';
import './ManageTagsSection.css';
import { FaShapes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function ManageTagsSection() {
  return (
    <div className="manage_tags_side-container">
      <Link to="/manage_tags" className="addTagBtn">
        Manage tags <FaShapes />
      </Link>
    </div>
  );
}
