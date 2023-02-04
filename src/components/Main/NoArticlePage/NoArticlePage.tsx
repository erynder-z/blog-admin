import React from 'react';
import { FaRegThumbsDown } from 'react-icons/fa';
import './NoArticlePage.css';

export default function NoArticlePage() {
  return (
    <div className="no_article" aria-live="assertive">
      No articles found <FaRegThumbsDown />
    </div>
  );
}
