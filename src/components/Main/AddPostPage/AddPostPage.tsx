import React, { ChangeEvent, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { Editor as TinyMCEEditor } from 'tinymce';
import './AddPostPage.css';
import { ITag } from '../../../interfaces/Tag';
import { useNavigate } from 'react-router-dom';
import InfoText from '../InfoText/InfoText';
import AuthContext from '../../../contexts/AuthContext';
import { fetchTagListData } from '../../../helpers/FetchTagListData';
import { handlePostSubmit } from '../../../helpers/HandlePostSubmit';
import ContentEditor from '../ContentEditor/ContentEditor';
import { Tags } from './DisplayTagsAdd/DisplayTagsAdd';

export default function AddPostPage() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tagList, setTagList] = useState<ITag[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [showInfoText, setShowInfoText] = useState<boolean>(false);
  const [infoTextMessage, setInfoTextMessage] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const editorRef = useRef<TinyMCEEditor | null>(null);

  const setEditorRef = (editor: TinyMCEEditor) => {
    editorRef.current = editor;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handlePostSubmit(event, token, editorRef, selectedTags, successfullSubmit, failedSubmit);
  };

  const successfullSubmit = () => {
    setInfoTextMessage('Post successfull!');
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <main className="add-post_page">
      {showInfoText ? (
        <InfoText message={infoTextMessage} />
      ) : (
        <div className="add-post_container">
          <form onSubmit={handleSubmit}>
            <h1 className="add-post_heading">Add post</h1>
            <div className="tags-container">
              <label htmlFor="tags">Tags</label>
              <Tags
                tagList={tagList}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
            </div>
            <div className="title-container">
              <h2>title:</h2>
              <input type="text" name="title" />
            </div>
            <div className="editor-container">
              <h2>content:</h2>
              <ContentEditor setEditorRef={setEditorRef} />
            </div>
            <div className="create-post-publish-options">
              <div className="checkbox-container">
                <input type="checkbox" id="publishPost" name="publishPost" />
                <label htmlFor="publishPost">publish post when submitting</label>
              </div>
            </div>
            <button type="submit">Submit post</button>
          </form>
        </div>
      )}
    </main>
  );
}
