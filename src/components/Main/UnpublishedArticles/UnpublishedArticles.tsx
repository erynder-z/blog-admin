import React, { useContext, useEffect, useState } from 'react';
import { IArticle } from '../../../interfaces/Article';
import { ITag } from '../../../interfaces/Tag';
import ArticleItem from '../ArticlePreview/ArticlePreview';
import { MagnifyingGlass } from 'react-loader-spinner';
import './UnpublishedArticles.css';
import AuthContext from '../../../contexts/AuthContext';
import { fetchArticles } from '../../../helpers/FetchArticles';

interface Props {
  filter: ITag | string | null;
}

export default function UnpublishedArticles({ filter }: Props) {
  const { token } = useContext(AuthContext);
  const [activeArticleList, setActiveArticleList] = useState<IArticle[]>([]);
  const [fullArticleList, setFullArticleList] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (token) {
      fetchArticles(
        'unpublished',
        token,
        setActiveArticleList,
        setFullArticleList,
        setLoading,
        setError
      );
    }
  }, []);

  useEffect(() => {
    const filterForString = (filter: string) => {
      const filterLower = filter.toLowerCase();
      return fullArticleList.filter((article) => {
        return (
          article.title.toLowerCase().includes(filterLower) ||
          article.content.toLowerCase().includes(filterLower)
        );
      });
    };

    const filterForTag = (filter: ITag) => {
      return fullArticleList.filter((article) =>
        article?.tags?.some((tag) => tag._id == filter?._id)
      );
    };

    const getFilterArticles = (filter: ITag | string | null) => {
      return typeof filter === 'string'
        ? filterForString(filter as string)
        : filterForTag(filter as ITag);
    };

    filter
      ? setActiveArticleList(getFilterArticles(filter))
      : setActiveArticleList(fullArticleList);
  }, [filter]);

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
    <main className="unpublished-articles-list">
      {activeArticleList?.map((article) => (
        <div key={article._id.toString()} className="article-container">
          <ArticleItem articleData={article} />
        </div>
      ))}
    </main>
  );
}
