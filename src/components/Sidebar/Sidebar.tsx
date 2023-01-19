import React, { Dispatch, SetStateAction } from 'react';
import { ViewType } from '../../interfaces/customTypes';
import { ITag } from '../../interfaces/Tag';
import AddPostSection from './AddArticleSection/AddArticleSection';
import LogoutSection from './LogoutSection/LogoutSection';
import AddTagSection from './ManageTagsSection/ManageTagsSection';
import SearchSection from './SearchSection/SearchSection';
import './Sidebar.css';
import TagsSection from './TagsSection/TagsSection';

interface Props {
  setCurrentView: Dispatch<SetStateAction<ViewType | null>>;
  handleTagFilter: (tag: ITag) => void;
  handleSearch: (query: string) => void;
  refetchTrigger: boolean;
}

export default function Sidebar({
  setCurrentView,
  handleTagFilter,
  handleSearch,
  refetchTrigger
}: Props) {
  const handleSetCurrentView = () => {
    setCurrentView('Other');
    localStorage.setItem('currentView', 'Other');
  };

  return (
    <div className="sidebar">
      <section>
        <SearchSection handleSearch={handleSearch} />
        <TagsSection handleTagFilter={handleTagFilter} refetchTrigger={refetchTrigger} />
      </section>
      <section
        onClick={() => {
          handleSetCurrentView();
        }}>
        <AddPostSection />
        <AddTagSection />
        <LogoutSection />
      </section>
    </div>
  );
}
