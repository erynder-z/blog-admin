import React, { useContext, useEffect, useState } from 'react';
import './ManageTagsPage.css';
import { ITag } from '../../../interfaces/Tag';
import { useNavigate } from 'react-router-dom';
import InfoText from '../InfoText/InfoText';
import { FaTimes } from 'react-icons/fa';
import AuthContext from '../../../contexts/AuthContext';
import { fetchTagListData } from '../../../helpers/FetchTagListData';
import ArticleFetchingAnimation from '../ArticleFetchingAnimation/ArticleFetchingAnimation';

interface Props {
  setRefetchTrigger: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ManageTagsPage({ setRefetchTrigger }: Props) {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tagList, setTagList] = useState<ITag[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [showInfoText, setShowInfoText] = useState<boolean>(false);
  const [infoTextMessage, setInfoTextMessage] = useState<string | null>(null);

  const serverURL = import.meta.env.VITE_SERVER_URL;

  const handleTagDelete = async (tagId: string) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      try {
        const res = await fetch(`${serverURL}/api/admin/tags/${tagId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.ok) {
          setRefetchTrigger(true);
          successfulSubmit();
          setRefetchTrigger(true);
        } else {
          console.error(res.statusText);
          failedSubmit();
        }
      } catch (err: any) {
        setError(err);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (token) {
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      const body = {
        ...Object.fromEntries(formData),
        tagName: formData.get('newTag')
      };

      const response = await fetch(`${serverURL}/api/admin/tags`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const data = await response.json();
        successfulSubmit();
        setRefetchTrigger(true);
      } else {
        console.error(response.statusText);
        failedSubmit();
      }
    }
  };

  const successfulSubmit = () => {
    setInfoTextMessage('Tags updated');
    setShowInfoText(true);
    const timeoutId = setTimeout(() => {
      navigate('/all');
    }, 3000);
    return () => clearTimeout(timeoutId);
  };

  const failedSubmit = () => {
    setInfoTextMessage('Something went wrong!');
    setShowInfoText(true);
    const timeoutId = setTimeout(() => {
      navigate('/all');
    }, 3000);
    return () => clearTimeout(timeoutId);
  };

  useEffect(() => {
    fetchTagListData(setTagList, setLoading, setError);
  }, []);

  if (loading) {
    return <ArticleFetchingAnimation />;
  }

  if (error) {
    return (
      <p aria-live="assertive">
        An error occurred: <span role="alert">{error.message}</span>
      </p>
    );
  }

  return (
    <main className="manage_tags_page">
      <div className="manage_tags_container">
        {showInfoText ? (
          <InfoText message={infoTextMessage} />
        ) : (
          <form onSubmit={handleSubmit}>
            <h1 className="manage_tags_heading">Registered tags</h1>
            <div className="create-article-tag-list">
              <ul>
                {tagList?.map((tag) => (
                  <li key={tag._id} className="registered_tasks-list">
                    {tag.name} <div className="tag_delete-divider"></div>
                    <div className="tag_delete-button" onClick={() => handleTagDelete(tag._id)}>
                      <FaTimes aria-label="Delete tag" color="crimson" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="title-container">
              <h2>Enter new tag:</h2>
              <input
                type="text"
                id="newTag"
                name="newTag"
                className="newTag_input"
                placeholder="some tag"
              />
            </div>
            <button type="submit" className="submitTagBtn">
              Submit tag
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
