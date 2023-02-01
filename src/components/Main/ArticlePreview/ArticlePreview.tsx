import React from 'react';
import format from 'date-fns/format';
import { stripHtml } from 'string-strip-html';
import './ArticlePreview.css';
import { IArticle } from '../../../interfaces/Article';
import { FaArrowRight, FaRegCommentAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Props {
  articleData: IArticle;
}

export default function ArticlePreview({ articleData }: Props) {
  const { _id, title, timestamp, comments } = articleData;

  const getTitleExcerpt = (title: string) => {
    const stringWithoutHTML = stripHtml(title).result;
    return stringWithoutHTML.length >= 100
      ? stringWithoutHTML.substring(0, 100) + '...'
      : stringWithoutHTML;
  };

  return (
    <Link to={`/article/${_id}`} className="article" aria-label={title}>
      <div className="article-top">
        <div className="article-head">
          <div className="timestamp">{format(new Date(timestamp), 'EEEE, dd. MMMM yyyy')}</div>
          <h1 className="article-title">{getTitleExcerpt(title)}</h1>
        </div>
      </div>
      <div className="article-bottom">
        <span className="comments">
          {comments.length} <FaRegCommentAlt />
        </span>
        <div className="read_more">
          Details <FaArrowRight />
        </div>
      </div>
    </Link>
  );
}
