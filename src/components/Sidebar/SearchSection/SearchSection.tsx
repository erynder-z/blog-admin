import React, { useEffect, useRef } from 'react';
import './SearchSection.css';
import { FaAngleLeft } from 'react-icons/fa';
import { ITag } from '../../../interfaces/Tag';

interface Props {
  handleSearch: (query: string) => void;
  filter: ITag | string | null;
}

export default function SearchSection({ handleSearch, filter }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSearch(inputRef.current!.value);
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
