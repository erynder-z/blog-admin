import React, { useContext } from 'react';
import AuthContext from '../../../../contexts/AuthContext';
import { format } from 'date-fns';
import { IComment } from '../../../../interfaces/Comment';
import { FaTrashAlt } from 'react-icons/fa';
import './Comment.css';

interface Props {
  commentData: IComment;
  setRefetchTrigger: (value: React.SetStateAction<boolean>) => void;
}

export default function Comment({ commentData, setRefetchTrigger }: Props) {
  const { _id, author, text, timestamp } = commentData;
  const { token } = useContext(AuthContext);

  const handleDeleteComment = async () => {
    const confirmed = window.confirm('Are you sure you want to delete this comment?');
    if (confirmed) {
      try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const res = await fetch(`${serverURL}/api/admin/articles/${_id}/comment`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        setRefetchTrigger(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="comment" aria-label="Comment">
      <div className="comment-main-container">
        <div className="comment-head">
          from: <strong>{author}</strong> on
          {format(new Date(timestamp || ''), ' dd. MMM. yyyy')}
        </div>
        <p className="comment-text">
          <em>{text}</em>
        </p>
      </div>
      <div className="comment-delete">
        <FaTrashAlt className="delete-comment-icon" onClick={handleDeleteComment} />
      </div>
    </div>
  );
}
