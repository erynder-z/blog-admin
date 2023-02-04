import React, { useContext } from 'react';
import './ClearSearch.css';
import { FaUndoAlt } from 'react-icons/fa';
import FilterContext from '../../../contexts/FilterContext';

export default function ClearSearch() {
  const { setFilter } = useContext(FilterContext);
  const handleClearSearch = () => {
    setFilter(null);
  };

  return (
    <button className="clear-search-button" onClick={handleClearSearch}>
      <span>Clear filter</span> <FaUndoAlt className="remove-filter-icon" />
    </button>
  );
}
