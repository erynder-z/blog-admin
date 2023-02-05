import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import { IArticle } from '../../../interfaces/Article';
import ArticleItem from '../ArticlePreview/ArticlePreview';
import './UnpublishedArticles.css';
import AuthContext from '../../../contexts/AuthContext';
import { fetchArticleList } from '../../../helpers/FetchArticleList';
import NoArticlePage from '../NoArticlePage/NoArticlePage';
import ArticleFetchingAnimation from '../ArticleFetchingAnimation/ArticleFetchingAnimation';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import { ViewType } from '../../../interfaces/customTypes';
import FilterContext from '../../../contexts/FilterContext';

interface Props {
  setCurrentView: Dispatch<SetStateAction<ViewType | null>>;
}

export default function UnpublishedArticles({ setCurrentView }: Props) {
  const { token } = useContext(AuthContext);
  const { setFilter } = useContext(FilterContext);
  const [fullArticleList, setFullArticleList] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (token) {
      fetchArticleList('unpublished', token, setFullArticleList, setLoading, setError);
    }
    setFilter(null);
    setCurrentView('Unpublished');
    localStorage.setItem('currentView', 'Unpublished');
  }, []);

  if (loading) {
    return <ArticleFetchingAnimation />;
  }

  if (error) {
    return <NotFoundPage setCurrentView={setCurrentView} />;
  }

  return (
    <main className="unpublished-articles-list">
      {fullArticleList.length === 0 && <NoArticlePage />}
      {fullArticleList?.map((article) => (
        <div key={article._id.toString()} className="article-container">
          <ArticleItem articleData={article} />
        </div>
      ))}
    </main>
  );
}
