import React from 'react';
import { Link } from 'react-router-dom';
import { FaPen } from 'react-icons/fa';
import './AddArticleSection.css';

export default function AddArticleSection() {
  return (
    <div className="add_article-container">
      <Link to="/code-blog-admin/add_article" className="addArticleBtn" aria-label="Add Article">
        Add article <FaPen />
      </Link>
    </div>
  );
}
