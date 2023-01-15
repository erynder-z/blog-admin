import React from 'react';
import { ITag } from '../../interfaces/Tag';
import AddPostSection from './AddPostSection/AddPostSection';
import LogoutSection from './LogoutSection/LogoutSection';
import AddTagSection from './ManageTagsSection/ManageTagsSection';
import SearchSection from './SearchSection/SearchSection';
import './Sidebar.css';
import TagsSection from './TagsSection/TagsSection';

type User = {
  _id: string;
  username: string;
};

interface Props {
  handleTagFilter: (tag: ITag) => void;
  handleSearch: (query: string) => void;
  refetchTrigger: boolean;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function Sidebar({
  handleTagFilter,
  handleSearch,
  refetchTrigger,
  setToken,
  setUser
}: Props) {
  return (
    <div className="sidebar">
      <SearchSection handleSearch={handleSearch} />
      <TagsSection handleTagFilter={handleTagFilter} refetchTrigger={refetchTrigger} />
      <AddPostSection />
      <AddTagSection />
      <LogoutSection setToken={setToken} setUser={setUser} />
    </div>
  );
}
