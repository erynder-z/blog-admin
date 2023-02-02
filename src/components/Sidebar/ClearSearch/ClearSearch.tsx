import React, { useContext } from 'react';
import ActiveTagContext from '../../../contexts/ActiveTagContext';
import './ClearSearch.css';
import { FaUndoAlt } from 'react-icons/fa';

interface Props {
  handleSearch: (query: string | null) => void;
}

export default function ClearSearch({ handleSearch }: Props) {
  const { setActiveTag } = useContext(ActiveTagContext);
  const handleClearSearch = () => {
    handleSearch(null);
    setActiveTag(null);
  };

  return (
    <button className="clear-search-button" onClick={handleClearSearch}>
      <span>Clear filter</span> <FaUndoAlt className="remove-filter-icon" />
    </button>
  );
}
