import React from 'react';
import './AddArticleSection.css';
import { FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function AddArticleSection() {
  return (
    <div className="add_article-container">
      <Link to="/add_article" className="addArticleBtn">
        Add article <FaPen />
      </Link>
    </div>
  );
}
