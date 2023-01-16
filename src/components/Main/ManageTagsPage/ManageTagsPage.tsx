import React, { useContext, useEffect, useState } from 'react';
import './ManageTagsPage.css';
import { ITag } from '../../../interfaces/Tag';
import { useNavigate } from 'react-router-dom';
import InfoText from '../InfoText/InfoText';
import { FaTimes } from 'react-icons/fa';
import AuthContext from '../../../contexts/AuthContext';
import { fetchTagListData } from '../../../helpers/FetchTagListData';

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

  const handleTagDelete = async (tagId: string) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      try {
        const res = await fetch(`http://localhost:8000/api/admin/tags/${tagId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (res.ok) {
          setRefetchTrigger(true);
          successfullSubmit();
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

      const response = await fetch('http://localhost:8000/api/admin/tags', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (response.ok) {
        const data = await response.json();
        successfullSubmit();
        setRefetchTrigger(true);
      } else {
        console.error(response.statusText);
        failedSubmit();
      }
    }
  };

  const successfullSubmit = () => {
    setInfoTextMessage('success!');
    setShowInfoText(true);
    const timeoutId = setTimeout(() => {
      navigate('/all');
    }, 3000);
    return () => clearTimeout(timeoutId);
  };

  const failedSubmit = () => {
    setInfoTextMessage('something went wrong!');
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <main className="manage_tags_page">
      {showInfoText ? (
        <InfoText message={infoTextMessage} />
      ) : (
        <div className="manage_tags_container">
          <form onSubmit={handleSubmit}>
            <h1 className="manage_tags_heading">Regsitered tags</h1>
            <div className="create-post-tag-list">
              <ul>
                {tagList?.map((tag) => (
                  <li key={tag._id} className="registered_tasks-list">
                    {tag.name} <div className="tag_delete-divider"></div>
                    <div className="tag_delete-button" onClick={() => handleTagDelete(tag._id)}>
                      <FaTimes color="crimson" />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="title-container">
              <h2>Enter new tag:</h2>
              <input type="text" name="newTag" className="newTag_input" placeholder="some tag" />
            </div>
            <button type="submit">Submit tag</button>
          </form>
        </div>
      )}
    </main>
  );
}
