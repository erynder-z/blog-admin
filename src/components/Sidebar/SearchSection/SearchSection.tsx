import React, { useRef } from 'react';
import './SearchSection.css';
import { FaAngleLeft } from 'react-icons/fa';

interface Props {
  handleSearch: (query: string) => void;
}

export default function SearchSection({ handleSearch }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(inputRef.current!.value);
  };

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
