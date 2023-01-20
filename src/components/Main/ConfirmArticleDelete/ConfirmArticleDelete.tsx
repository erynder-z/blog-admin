import React, { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthContext';
import { handleArticleDelete } from '../../../helpers/HandleArticleDelete';
import InfoText from '../InfoText/InfoText';
import './ConfirmArticleDelete.css';

export default function ConfirmArticleDelete() {
  const { token } = useContext(AuthContext);
  const [showInfoText, setShowInfoText] = useState<boolean>(false);
  const [infoTextMessage, setInfoTextMessage] = useState<string | null>(null);

  const params = useParams();
  const id: string | undefined = params.id;
  const navigate = useNavigate();

  const handleDelete = () => {
    handleArticleDelete(token, id, successfullSubmit, failedSubmit);
  };

  const successfullSubmit = () => {
    setInfoTextMessage('Article successfully deleted!');
    setShowInfoText(true);
    const timeoutId = setTimeout(() => {
      navigate('/all');
    }, 3000);
    return () => clearTimeout(timeoutId);
  };

  const failedSubmit = (error: Error) => {
    window.alert(`Error: ${error}`);
  };

  return (
    <div className="confirm_article_delete">
      {showInfoText ? (
        <InfoText message={infoTextMessage} />
      ) : (
        <>
          <h1>Are you sure?</h1>
          <p>This cannot be undone!</p>
          <div className="confirm_delete_buttton_container">
            <button className="go_back">Go back</button>
            <button className="delete_article" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
