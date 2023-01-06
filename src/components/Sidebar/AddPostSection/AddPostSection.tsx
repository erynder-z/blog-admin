import React from 'react';
import './AddPostSection.css';
import { FaPen } from 'react-icons/fa';

export default function AddPostSection() {
  const handleClick = () => {
    window.open('https://www.example.com', '_blank');
  };

  return (
    <div className="add_post-container">
      <button className="addPostBtn" onClick={handleClick}>
        Add post <FaPen />
      </button>
    </div>
  );
}
