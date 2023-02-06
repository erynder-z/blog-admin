import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import FilterContext from '../../../contexts/FilterContext';
import { IArticle } from '../../../interfaces/Article';
import { ViewType } from '../../../interfaces/customTypes';
import { fetchArticleList } from '../../../helpers/FetchArticleList';
import ArticleItem from '../ArticlePreview/ArticlePreview';
import NoArticlePage from '../NoArticlePage/NoArticlePage';
import ArticleFetchingAnimation from '../ArticleFetchingAnimation/ArticleFetchingAnimation';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import './PublishedArticles.css';

interface Props {
  setCurrentView: Dispatch<SetStateAction<ViewType | null>>;
}

export default function PublishedArticles({ setCurrentView }: Props) {
  const { token } = useContext(AuthContext);
  const { setFilter } = useContext(FilterContext);
  const [fullArticleList, setFullArticleList] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (token) {
      fetchArticleList('published', token, setFullArticleList, setLoading, setError);
    }
    setFilter(null);
    setCurrentView('Published');
    localStorage.setItem('currentView', 'Published');
  }, []);

  if (loading) {
    return <ArticleFetchingAnimation />;
  }

  if (error) {
    return <NotFoundPage setCurrentView={setCurrentView} />;
  }

  return (
    <main className="published-articles-list">
      {fullArticleList.length === 0 && <NoArticlePage />}
      {fullArticleList?.map((article) => (
        <div key={article._id.toString()} className="article-container">
          <ArticleItem articleData={article} />
        </div>
      ))}
    </main>
  );
}
