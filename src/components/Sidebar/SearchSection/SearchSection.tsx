import React, { useContext, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterContext from '../../../contexts/FilterContext';
import { FaAngleLeft } from 'react-icons/fa';
import './SearchSection.css';

export default function SearchSection() {
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { filter, setFilter } = useContext(FilterContext);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFilter(inputRef.current!.value);
    navigate('/search');
  };

  useEffect(() => {
    if (!filter) {
      inputRef.current!.value = '';
    }
  }, [filter]);

  return (
    <div className="searchbox-container">
      <h1 className="searchbox-heading">Search</h1>
      <form className="searchbox" onSubmit={handleSubmit}>
        <input type="text" className="input" ref={inputRef} aria-label="Search Input" />
        <button type="submit" className="search-icon" aria-label="Submit Search">
          <FaAngleLeft />
        </button>
      </form>
    </div>
  );
}
