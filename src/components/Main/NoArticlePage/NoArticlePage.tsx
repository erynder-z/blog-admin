import React from 'react';
import { FaRegFrown } from 'react-icons/fa';
import { ITag } from '../../../interfaces/Tag';
import './NoArticlePage.css';

interface Props {
  filter: ITag | string | null;
}

export default function NoArticlePage({ filter }: Props) {
  return (
    <div className="not_found" aria-live="assertive">
      <span> No articles matching {filter?.toString()} !</span>
      <span>
        <FaRegFrown />
      </span>
    </div>
  );
}
