import React, { ChangeEvent, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { Editor as TinyMCEEditor } from 'tinymce';
import './AddArticlePage.css';
import { ITag } from '../../../interfaces/Tag';
import { useNavigate } from 'react-router-dom';
import InfoText from '../InfoText/InfoText';
import AuthContext from '../../../contexts/AuthContext';
import { fetchTagListData } from '../../../helpers/FetchTagListData';
import { handleArticleSubmit } from '../../../helpers/HandleArticleSubmit';
import ContentEditor from '../ContentEditor/ContentEditor';
import { Tags } from './DisplayTagsAdd/DisplayTagsAdd';
import CurrentViewContext from '../../../contexts/CurrentViewContext';
import { MagnifyingGlass } from 'react-loader-spinner';

export default function AddArticlePage() {
  const { token } = useContext(AuthContext);
  const { setCurrentView } = useContext(CurrentViewContext);
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
    handleArticleSubmit(event, token, editorRef, selectedTags, successfullSubmit, failedSubmit);
  };

  const successfullSubmit = () => {
    setInfoTextMessage('Article submit successfull!');
    setShowInfoText(true);
    const timeoutId = setTimeout(() => {
      navigate('/all');
      setCurrentView('All');
    }, 3000);
    return () => clearTimeout(timeoutId);
  };

  const failedSubmit = (error: Error) => {
    window.alert(`Error: ${error}`);
  };

  useEffect(() => {
    fetchTagListData(setTagList, setLoading, setError);
  }, []);

  if (loading) {
    return (
      <div className="fetching">
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />
      </div>
    );
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <main className="add-article_page">
      <div className="add-article_container">
        {showInfoText ? (
          <InfoText message={infoTextMessage} />
        ) : (
          <form onSubmit={handleSubmit}>
            <h1 className="add-article_heading">Add article</h1>
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
            <div className="create-article-publish-options">
              <div className="checkbox-container">
                <input type="checkbox" id="publishArticle" name="publishArticle" />
                <label htmlFor="publishArticle">publish article when submitting</label>
              </div>
            </div>
            <button type="submit">Submit article</button>
          </form>
        )}
      </div>
    </main>
  );
}
