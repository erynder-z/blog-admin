import React from 'react';
import { ITag } from '../../interfaces/Tag';
import AddPostSection from './AddPostSection/AddPostSection';
import AddTagSection from './AddTagSection/AddTagSection';
import SearchSection from './SearchSection/SearchSection';
import './Sidebar.css';
import TagsSection from './TagsSection/TagsSection';

interface Props {
  handleTagFilter: (tag: ITag) => void;
  handleSearch: (query: string) => void;
}

export default function Sidebar({ handleTagFilter, handleSearch }: Props) {
  return (
    <div className="sidebar">
      <SearchSection handleSearch={handleSearch} />
      <TagsSection handleTagFilter={handleTagFilter} />
      <AddPostSection />
      <AddTagSection />
    </div>
  );
}
