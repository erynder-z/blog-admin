import React, { useContext } from 'react';
import './ClearSearch.css';
import { FaUndoAlt } from 'react-icons/fa';
import FilterContext from '../../../contexts/FilterContext';
import { useNavigate } from 'react-router-dom';

export default function ClearSearch() {
  const { setFilter } = useContext(FilterContext);
  const navigate = useNavigate();
  const handleClearSearch = () => {
    setFilter(null);
    navigate('/all');
  };

  return (
    <button className="clear-search-button" onClick={handleClearSearch}>
      <span>Clear filter</span> <FaUndoAlt className="remove-filter-icon" />
    </button>
  );
}
