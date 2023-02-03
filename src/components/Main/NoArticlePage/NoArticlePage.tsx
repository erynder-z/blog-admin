import React from 'react';
import { FaRegThumbsDown } from 'react-icons/fa';
import { ITag } from '../../../interfaces/Tag';
import './NoArticlePage.css';

interface Props {
  filter: ITag | string | null;
}

export default function NoArticlePage({ filter }: Props) {
  return (
    <div className="no_article" aria-live="assertive">
      No articles found <FaRegThumbsDown />
    </div>
  );
}
