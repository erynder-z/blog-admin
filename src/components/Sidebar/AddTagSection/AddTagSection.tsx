import React from 'react';
import './AddTagSection.css';
import { FaShapes } from 'react-icons/fa';

export default function AddTagSection() {
  const handleClick = () => {
    window.open('https://www.example.com', '_blank');
  };

  return (
    <div className="add_tag-container">
      <button className="addTagBtn" onClick={handleClick}>
        Add tag <FaShapes />
      </button>
    </div>
  );
}
