import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchArticleData } from '../../../helpers/FetchArticleData';
import { fetchTagListData } from '../../../helpers/FetchTagListData';
import { IArticle } from '../../../interfaces/Article';
import { ITag } from '../../../interfaces/Tag';
import InfoText from '../InfoText/InfoText';
import { Editor as TinyMCEEditor } from 'tinymce';
import { decode } from 'html-entities';
import './EditArticle.css';
import AuthContext from '../../../contexts/AuthContext';
import { handleArticleUpdate } from '../../../helpers/handleArticleUpdate';
import { Tags } from './DisplayTagsEdit/DisplayTagsEdit';
import ContentEditor from '../ContentEditor/ContentEditor';

export default function EditArticle() {
  const { token } = useContext(AuthContext);
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
    fetchArticleData(id, setArticle, setLoading, setError);
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
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }
  return (
    <main className="add-article_page">
      {showInfoText ? (
        <InfoText message={infoTextMessage} />
      ) : (
        <div className="add-article_container">
          {article && (
            <form onSubmit={handleSubmit}>
              <h1 className="add-article_heading">Edit article</h1>
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
                  />
                  <label htmlFor="publishArticle">publish article when submitting</label>
                </div>
              </div>
              <button type="submit">Submit article</button>
            </form>
          )}
        </div>
      )}
    </main>
  );
}
