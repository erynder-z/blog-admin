import React, { Dispatch, SetStateAction, useRef } from 'react';
import './SearchSection.css';
import { FaAngleLeft } from 'react-icons/fa';

interface Props {
  handleSearch: (query: string) => void;
}

export default function SearchSection({ handleSearch }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="searchbox-container">
      <h1 className="searchbox-heading">Search</h1>
      <form
        className="searchbox"
        onSubmit={(event) => {
          event.preventDefault();
          handleSearch(inputRef.current!.value);
        }}>
        <input type="text" className="input" ref={inputRef} />
        <FaAngleLeft
          onClick={(event) => {
            event.preventDefault();
            handleSearch(inputRef.current!.value);
          }}
          className="search-icon"
        />
      </form>
    </div>
  );
}
