import React from 'react';
import { FaRegFrown } from 'react-icons/fa';
import './NotFoundPage.css';

export default function NotFoundPage() {
  return (
    <div className="not_found">
      <span> There's nothing here!</span>
      <span>
        <FaRegFrown />
      </span>
      <span> 404</span>
    </div>
  );
}
