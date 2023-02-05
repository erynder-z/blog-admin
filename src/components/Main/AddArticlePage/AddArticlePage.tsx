import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react';
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
import ArticleFetchingAnimation from '../ArticleFetchingAnimation/ArticleFetchingAnimation';
import { ViewType } from '../../../interfaces/customTypes';
import BackButton from '../BackButton/BackButton';

interface Props {
  setCurrentView: Dispatch<SetStateAction<ViewType | null>>;
}

export default function AddArticlePage({ setCurrentView }: Props) {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [tagList, setTagList] = useState<ITag[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [showInfoText, setShowInfoText] = useState<boolean>(false);
  const [infoTextMessage, setInfoTextMessage] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isPublished, setIsPublished] = useState<boolean>(false);

  const editorRef = useRef<TinyMCEEditor | null>(null);

  const setEditorRef = (editor: TinyMCEEditor) => {
    editorRef.current = editor;
  };

  const handleIsPublishedCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsPublished(event.target.checked);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleArticleSubmit(
      event,
      token,
      editorRef,
      selectedTags,
      isPublished,
      successfulSubmit,
      failedSubmit
    );
  };

  const successfulSubmit = () => {
    setInfoTextMessage('Article submit successful!');
    setShowInfoText(true);
    const timeoutId = setTimeout(() => {
      navigate('/all');
    }, 3000);
    return () => clearTimeout(timeoutId);
  };

  const failedSubmit = (error: Error) => {
    window.alert(`Error: ${error}`);
  };

  useEffect(() => {
    fetchTagListData(setTagList, setLoading, setError);
    setCurrentView('Other');
    localStorage.setItem('currentView', 'Other');
  }, []);

  if (loading) {
    return <ArticleFetchingAnimation />;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <main className="add-article_page" role="main">
      <div className="add-article_container">
        {showInfoText ? (
          <InfoText message={infoTextMessage} />
        ) : (
          <form onSubmit={handleSubmit}>
            <BackButton />
            <header className="add-article_header">
              <h1 className="add-article_heading" id="add-article-heading">
                Add article
              </h1>
            </header>
            <div className="tags-container">
              <label htmlFor="tags">Tags</label>
              <Tags
                tagList={tagList}
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
              />
            </div>
            <div className="add-article-title-container">
              <h2>Title:</h2>
              <input type="text" name="title" id="title" aria-describedby="title-desc" />
              <p id="title-desc">Enter the title of the article here</p>
            </div>
            <div className="editor-container">
              <h2>Content:</h2>
              <ContentEditor setEditorRef={setEditorRef} />
            </div>
            <div className="create-article-publish-options">
              <div className="checkbox-container">
                <input
                  type="checkbox"
                  id="publishArticle"
                  name="publishArticle"
                  onChange={handleIsPublishedCheckboxChange}
                />
                <label htmlFor="publishArticle">Publish article when submitting</label>
              </div>
            </div>
            <button type="submit" className="submitArticleBtn">
              Submit article
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
