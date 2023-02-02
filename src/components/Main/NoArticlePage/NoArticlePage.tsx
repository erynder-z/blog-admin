import React from 'react';
import { FaRegFrown } from 'react-icons/fa';
import { ITag } from '../../../interfaces/Tag';
import './NoArticlePage.css';

interface Props {
  filter: ITag | string | null;
}

export default function NoArticlePage({ filter }: Props) {
  const getQueryString = () => {
    const query = typeof filter === 'string' ? filter : filter?.name;
    return query && typeof query === 'string' ? query : query?.toString();
  };

  return (
    <div className="not_found" aria-live="assertive">
      <span> No articles containing {getQueryString()} !</span>
      <span>
        <FaRegFrown />
      </span>
    </div>
  );
}
