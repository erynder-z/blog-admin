import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterContext from '../../../contexts/FilterContext';
import { ITag } from '../../../interfaces/Tag';
import { fetchTagListData } from '../../../helpers/FetchTagListData';
import './TagSection.css';

interface Props {
  refetchTrigger: boolean;
}

export default function TagsSection({ refetchTrigger }: Props) {
  const { filter, setFilter } = useContext(FilterContext);
  const [tagList, setTagList] = useState<ITag[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const handleTagClick = (tag: ITag) => {
    if (tag !== filter) {
      navigate('/code-blog-admin/search');
    } else {
      setFilter(null);
      navigate(-1);
    }
  };

  useEffect(() => {
    fetchTagListData(setTagList, setLoading, setError);
  }, [refetchTrigger]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <div className="tag-section">
      <h1 className="side-tags-heading">All tags</h1>
      <ul className="side-tag-list" role="list">
        {tagList?.map((tag: ITag) => (
          <li
            key={tag._id.toString()}
            className={`side-tag-list-item ${filter == tag ? 'active' : ''}`}
            role="listitem"
            onClick={() => {
              setFilter(tag);
              handleTagClick(tag);
            }}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setFilter(tag);
                handleTagClick(tag);
              }
            }}>
            {tag.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
