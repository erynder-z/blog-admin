import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { decode } from 'html-entities';
import parse from 'html-react-parser';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IArticle } from '../../../interfaces/Article';
import { ITag } from '../../../interfaces/Tag';
import CommentsSection from '../CommentsSection/CommentsSection';
import { FaPenAlt, FaTrashAlt } from 'react-icons/fa';
import './ArticlePage.css';
import { fetchArticleData } from '../../../helpers/FetchArticleData';
import { stripHtml } from 'string-strip-html';
import Prism from 'prismjs';
import '../../../libraries/prism-material-dark.css';
import ArticleFetchingAnimation from '../ArticleFetchingAnimation/ArticleFetchingAnimation';
import { FaArrowLeft } from 'react-icons/fa';

export default function ArticlePage() {
  const params = useParams();
  let navigate = useNavigate();
  const id: string | undefined = params.id;

  const [article, setArticle] = useState<IArticle>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [refetchTrigger, setRefetchTrigger] = useState<boolean>(false);

  const titleWithoutHTML = article?.title ? stripHtml(article.title).result : '';
  const decodedString = decode(article?.content);

  const goToPreviousPage = () => {
    navigate(-1);
  };

  useEffect(() => {
    fetchArticleData(id, setArticle, setLoading, setError);
  }, [id]);

  useEffect(() => {
    if (refetchTrigger) {
      fetchArticleData(id, setArticle, setLoading, setError);
    }
  }, [refetchTrigger]);

  useEffect(() => {
    setRefetchTrigger(false);
  }, [refetchTrigger]);

  useEffect(() => {
    Prism.highlightAll();
  }, [decodedString]);

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
    <main className="article_page" aria-label="Main content for article page">
      <div className="article_container">
        <header className="article_header" aria-label="Article Header">
          <div className="timestamp">
            <time>{format(new Date(article?.timestamp || ''), 'EEEE, dd. MMMM yyyy')}</time>
          </div>
          <span className="author">by {article?.author?.username}</span>
        </header>
        <h1 id="article-title" className="article_title">
          {titleWithoutHTML}
        </h1>
        <ul className="tag-list">
          {article?.tags?.map((tag: ITag) => (
            <li key={tag._id.toString()} className="tag-list-item">
              {tag.name}
            </li>
          ))}
        </ul>
        <article aria-labelledby="article-content" className="article-content">
          {parse(decodedString)}
        </article>
        <button className="backBtn" onClick={goToPreviousPage}>
          <FaArrowLeft /> go back
        </button>
        <div className="article_options_container">
          <Link to={`/edit_article/${id}`} className="edit_article-button">
            Edit article <FaPenAlt />
          </Link>
          <Link to={`/confirm_article_delete/${id}`} className="delete_article-button">
            Delete article <FaTrashAlt />
          </Link>
        </div>
        {article && (
          <CommentsSection commentList={article.comments} setRefetchTrigger={setRefetchTrigger} />
        )}
        {!article && <CommentsSection commentList={[]} setRefetchTrigger={setRefetchTrigger} />}
      </div>
    </main>
  );
}
