import React, { useContext, useEffect, useState } from 'react';
import { IArticle } from '../../../interfaces/Article';
import { ITag } from '../../../interfaces/Tag';
import ArticleItem from '../ArticlePreview/ArticlePreview';
import { MagnifyingGlass } from 'react-loader-spinner';
import './PublishedArticles.css';
import AuthContext from '../../../contexts/AuthContext';
import { fetchArticles } from '../../../helpers/FetchArticles';
import NoArticlePage from '../NoArticlePage/NoArticlePage';
import { filterArticles } from '../../../helpers/FilterArticles';

interface Props {
  filter: ITag | string | null;
}

export default function PublishedArticles({ filter }: Props) {
  const { token } = useContext(AuthContext);
  const [activeArticleList, setActiveArticleList] = useState<IArticle[]>([]);
  const [fullArticleList, setFullArticleList] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (token) {
      fetchArticles(
        'published',
        token,
        setActiveArticleList,
        setFullArticleList,
        setLoading,
        setError
      );
    }
  }, []);

  useEffect(() => {
    filterArticles(filter, fullArticleList, setActiveArticleList);
  }, [filter, fullArticleList]);

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
    return (
      <p aria-live="assertive">
        An error occurred: <span role="alert">{error.message}</span>
      </p>
    );
  }

  return (
    <main className="published-articles-list">
      {activeArticleList.length === 0 && <NoArticlePage filter={filter} />}
      {activeArticleList?.map((article) => (
        <div key={article._id.toString()} className="article-container">
          <ArticleItem articleData={article} />
        </div>
      ))}
    </main>
  );
}
