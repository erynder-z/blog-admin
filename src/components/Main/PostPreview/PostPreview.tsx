import React from 'react';
import format from 'date-fns/format';
import { stripHtml } from 'string-strip-html';
import './PostPreview.css';
import { IPost } from '../../../interfaces/Post';
import { FaArrowRight, FaRegCommentAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

interface Props {
  postData: IPost;
}

export default function PostPreview({ postData }: Props) {
  const { _id, title, text, timestamp, comments } = postData;

  const getTitleExcerpt = (title: string) => {
    return title.length >= 100 ? title.substring(0, 100) + '...' : title;
  };

  const getTextExcerpt = (text: string) => {
    const stringWithoutHTML = stripHtml(text).result;
    return stringWithoutHTML.length >= 100
      ? stringWithoutHTML.substring(0, 100) + '...'
      : stringWithoutHTML;
  };

  return (
    <Link to={`/post/${_id}`} className="post">
      <div className="post-top">
        <div className="post-head">
          <div className="timestamp">{format(new Date(timestamp), 'EEEE, dd. MMMM yyyy')}</div>{' '}
          <h1 className="post-title">{getTitleExcerpt(title)}</h1>
        </div>
        <p className="post-text">{getTextExcerpt(text)}</p>
      </div>
      <div className="post-bottom">
        {comments.length} <FaRegCommentAlt />
        <div className="read_more">
          Read more <FaArrowRight />
        </div>
      </div>
    </Link>
  );
}
