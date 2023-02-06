import React from 'react';
import { Link } from 'react-router-dom';
import { FaShapes } from 'react-icons/fa';
import './ManageTagsSection.css';

export default function ManageTagsSection() {
  return (
    <div className="manage_tags_side-container">
      <Link to="/manage_tags" className="addTagBtn">
        Manage tags <FaShapes />
      </Link>
    </div>
  );
}
