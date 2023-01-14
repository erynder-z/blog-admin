import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { decode } from 'html-entities';
import parse from 'html-react-parser';
import { useParams } from 'react-router-dom';
import { IPost } from '../../../interfaces/Post';
import { ITag } from '../../../interfaces/Tag';
import CommentsSection from '../CommentsSection/CommentsSection';
import './ArticlePage.css';

export default function ArticlePage() {
  const params = useParams();
  const id: string | undefined = params.id;

  const [article, setArticle] = useState<IPost>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const decodedString = decode(article?.content);

  const fetchArticleData = async () => {
    try {
      const res = await fetch(`http://localhost:8000/api/posts/${id}`);
      const data = await res.json();
      setArticle(data.post);
    } catch (err: any) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchArticleData();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }
  return (
    <main className="article_page">
      <div className="article_container">
        <div className="timestamp">
          {format(new Date(article?.timestamp || ''), 'EEEE, dd. MMMM yyyy')}
        </div>
        <div className="author">by {article?.author?.username}</div>
        <h1 className="article_title">{article?.title}</h1>
        <ul className="tag-list">
          {article?.tags?.map((tag: ITag) => (
            <li key={tag._id.toString()} className="tag-list-item">
              {tag.name}
            </li>
          ))}
        </ul>

        {parse(decodedString)}

        {article && (
          <CommentsSection commentList={article.comments} fetchArticleData={fetchArticleData} />
        )}
        {!article && <CommentsSection commentList={[]} fetchArticleData={fetchArticleData} />}
      </div>
    </main>
  );
}
