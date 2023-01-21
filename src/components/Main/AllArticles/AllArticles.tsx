import React, { useContext, useEffect, useState } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';
import AuthContext from '../../../contexts/AuthContext';
import { fetchArticles } from '../../../helpers/FetchArticles';
import { IArticle } from '../../../interfaces/Article';
import { ITag } from '../../../interfaces/Tag';
import ArticleItem from '../ArticlePreview/ArticlePreview';
import './AllArticles.css';

interface Props {
  filter: ITag | string | null;
}

export default function AllArticles({ filter }: Props) {
  const { token } = useContext(AuthContext);
  const [activeArticleList, setActiveArticleList] = useState<IArticle[]>([]);
  const [fullArticleList, setFullArticleList] = useState<IArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (token) {
      fetchArticles('all', token, setActiveArticleList, setFullArticleList, setLoading, setError);
    }
  }, []);

  useEffect(() => {
    const filterForString = (filter: string) => {
      return fullArticleList.filter((article) => {
        return article.title.includes(filter) || article.content.includes(filter);
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
    <main className="all-articles-list">
      {activeArticleList?.map((article) => (
        <div key={article._id.toString()} className="article-container">
          <ArticleItem articleData={article} />
        </div>
      ))}
    </main>
  );
}
