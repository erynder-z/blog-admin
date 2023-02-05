import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './BackButton.css';

export default function BackButton() {
  const navigate = useNavigate();
  const goToPreviousPage = () => {
    navigate(-1);
  };

  return (
    <button className="backBtn" onClick={goToPreviousPage}>
      <FaArrowLeft /> go back
    </button>
  );
}
