import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchArticleContent } from '../../../helpers/FetchArticleContent';
import { fetchTagListData } from '../../../helpers/FetchTagListData';
import { IArticle } from '../../../interfaces/Article';
import { ITag } from '../../../interfaces/Tag';
import InfoText from '../InfoText/InfoText';
import { Editor as TinyMCEEditor } from 'tinymce';
import { decode } from 'html-entities';
import './EditArticle.css';
import AuthContext from '../../../contexts/AuthContext';
import { handleArticleUpdate } from '../../../helpers/HandleArticleUpdate';
import { Tags } from './DisplayTagsEdit/DisplayTagsEdit';
import ContentEditor from '../ContentEditor/ContentEditor';
import CurrentViewContext from '../../../contexts/CurrentViewContext';
import ArticleFetchingAnimation from '../ArticleFetchingAnimation/ArticleFetchingAnimation';

export default function EditArticle() {
  const { token } = useContext(AuthContext);
  const { setCurrentView } = useContext(CurrentViewContext);
  const navigate = useNavigate();
  const params = useParams();
  const id: string | undefined = params.id;
  const [tagList, setTagList] = useState<ITag[]>();
  const [article, setArticle] = useState<IArticle>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [showInfoText, setShowInfoText] = useState<boolean>(false);
  const [infoTextMessage, setInfoTextMessage] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [articleComments, setArticleComments] = useState<string[]>([]);
  const [initialRender, setInitialRender] = useState<boolean>(true);
  const editorRef = useRef<TinyMCEEditor | null>(null);

  const setEditorRef = (editor: TinyMCEEditor) => {
    editorRef.current = editor;
  };

  const decodedTitle = decode(article?.title);
  const decodedContent = decode(article?.content);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (article) {
      handleArticleUpdate(
        event,
        token,
        id,
        editorRef,
        selectedTags,
        articleComments,
        successfullSubmit,
        failedSubmit
      );
    }
  };

  const successfullSubmit = () => {
    setInfoTextMessage('Article updated successfully!!');
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
    fetchArticleContent(id, setArticle, setLoading, setError);
  }, [id]);

  useEffect(() => {
    if (initialRender && article) {
      setSelectedTags(article.tags.map((tag) => tag._id));
      setInitialRender(false);
    }
  }, [article, initialRender]);

  useEffect(() => {
    if (article) {
      setArticleComments(article.comments.map((comment) => comment._id));
    }
  }, [article]);

  useEffect(() => {
    const timeoutId = setTimeout(navigate, 3000);
    return () => clearTimeout(timeoutId);
  }, [navigate]);

  if (loading) {
    return <ArticleFetchingAnimation />;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }
  return (
    <main className="edit-article_page">
      <div className="edit-article_container">
        {showInfoText ? (
          <InfoText message={infoTextMessage} />
        ) : (
          article && (
            <form onSubmit={handleSubmit}>
              <h1 className="edit-article_heading" aria-level="1">
                Edit article
              </h1>
              <div className="tags-container">
                <label htmlFor="tags">Tags</label>
                {tagList && (
                  <Tags
                    tagList={tagList}
                    articleTags={article.tags}
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                  />
                )}
              </div>
              <div className="title-container">
                <h2>title:</h2>
                <input
                  type="text"
                  name="title"
                  defaultValue={decodedTitle}
                  onChange={(e) => setArticle({ ...article, title: e.target.value })}
                  aria-label="Article title"
                />
              </div>
              <div className="editor-container">
                <h2>content:</h2>
                <ContentEditor setEditorRef={setEditorRef} decodedContent={decodedContent} />
              </div>
              <div className="create-article-publish-options">
                <div className="checkbox-container">
                  <input
                    type="checkbox"
                    id="publishArticle"
                    name="publishArticle"
                    defaultChecked={article?.isPublished}
                    aria-label="Publish article when submitting"
                  />
                  <label htmlFor="publishArticle">publish article when submitting</label>
                </div>
              </div>
              <button type="submit">Submit article</button>
            </form>
          )
        )}
      </div>{' '}
    </main>
  );
}
