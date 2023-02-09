import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterContext from '../../../contexts/FilterContext';
import { FaUndoAlt } from 'react-icons/fa';
import './ClearSearch.css';

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
