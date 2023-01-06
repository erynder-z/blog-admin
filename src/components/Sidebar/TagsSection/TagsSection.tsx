import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { ITag } from '../../../interfaces/Tag';
import './TagSection.css';

interface Props {
  handleTagFilter: (tag: ITag) => void;
}

export default function TagsSection({ handleTagFilter }: Props) {
  const [tagList, setTagList] = useState<ITag[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchTagListData = async () => {
    try {
      const res = await fetch('http://localhost:8000/api/tags');
      const data = await res.json();
      setTagList(data.tag_list);
    } catch (err: any) {
      setError(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTagListData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <div className="tag-section">
      <h1 className="side-tags-heading">All tags</h1>
      <ul className="side-tag-list">
        {tagList?.map((tag: ITag) => (
          <li
            key={tag._id.toString()}
            className="side-tag-list-item"
            onClick={() => {
              handleTagFilter(tag);
            }}>
            {tag.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
