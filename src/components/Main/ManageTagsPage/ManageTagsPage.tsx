import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ITag } from '../../../interfaces/Tag';
import { fetchTagListData } from '../../../helpers/FetchTagListData';
import InfoText from '../InfoText/InfoText';
import ArticleFetchingAnimation from '../ArticleFetchingAnimation/ArticleFetchingAnimation';
import BackButton from '../BackButton/BackButton';
import { FaTimes, FaEdit } from 'react-icons/fa';
import './ManageTagsPage.css';
import UpdateTagModal from './UpdateTagModal/UpdateTagModal';

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
  const [updateTagId, setUpdateTagId] = useState<string | null>(null);
  const [updateTagName, setUpdateTagName] = useState<string>('');
  const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);

  const serverURL = import.meta.env.VITE_SERVER_URL;

  const handleTagUpdate = (tagId: string, tagName: string) => {
    setUpdateTagId(tagId);
    setUpdateTagName(tagName);
    setShowUpdateModal(true);
  };

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
            <BackButton />
            <h1 className="manage_tags_heading">Registered tags</h1>
            <div className="create-article-tag-list">
              <ul>
                {tagList?.map((tag) => (
                  <li key={tag._id} className="registered_tasks-list-item">
                    <span>{tag.name}</span> <div className="tag_options-divider"></div>
                    <div className="options-container">
                      <div
                        className="tag_edit-button"
                        onClick={() => handleTagUpdate(tag._id, tag.name)}>
                        <FaEdit aria-label="Edit tag" />
                      </div>
                      <div className="tag_delete-button" onClick={() => handleTagDelete(tag._id)}>
                        <FaTimes aria-label="Delete tag" />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="manage-tags-title-container">
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
        {showUpdateModal && (
          <UpdateTagModal
            showUpdateModal={showUpdateModal}
            updateTagId={updateTagId}
            setShowUpdateModal={setShowUpdateModal}
            setUpdateTagId={setUpdateTagId}
            setUpdateTagName={setUpdateTagName}
            setRefetchTrigger={setRefetchTrigger}
            successfulSubmit={successfulSubmit}
            failedSubmit={failedSubmit}
            updateTagName={updateTagName}
          />
        )}
      </div>
    </main>
  );
}
