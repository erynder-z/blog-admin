import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import AuthContext from '../../../contexts/AuthContext';
import { fetchArticleList } from '../../../helpers/FetchArticleList';
import { IArticle } from '../../../interfaces/Article';
import { ViewType } from '../../../interfaces/customTypes';
import ArticleItem from '../ArticlePreview/ArticlePreview';
import NoArticlePage from '../NoArticlePage/NoArticlePage';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import './AllArticles.css';

interface Props {
  setCurrentView: Dispatch<SetStateAction<ViewType | null>>;
}

export default function AllArticles({ setCurrentView }: Props) {
  const { token } = useContext(AuthContext);
  const [fullArticleList, setFullArticleList] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (token) {
      fetchArticleList('all', token, setFullArticleList, setLoading, setError);
    }
    setCurrentView('All');
    localStorage.setItem('currentView', 'All');
  }, []);

  if (loading) {
    return (
      <div className="fetching" aria-live="polite">
        <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
        />{' '}
        <p>Loading articles...</p>
      </div>
    );
  }

  if (error) {
    return <NotFoundPage setCurrentView={setCurrentView} />;
  }

  return (
    <main className="all-articles-list">
      {fullArticleList.length === 0 && <NoArticlePage />}
      {fullArticleList?.map((article) => (
        <div key={article._id.toString()} className="article-container">
          <ArticleItem articleData={article} />
        </div>
      ))}
    </main>
  );
}
