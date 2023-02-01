import React, { Dispatch, SetStateAction, useContext } from 'react';
import ActiveTagContext from '../../contexts/ActiveTagContext';
import CurrentViewContext from '../../contexts/CurrentViewContext';
import { ITag } from '../../interfaces/Tag';
import AddPostSection from './AddArticleSection/AddArticleSection';
import LogoutSection from './LogoutSection/LogoutSection';
import ManageTagsSection from './ManageTagsSection/ManageTagsSection';
import SearchSection from './SearchSection/SearchSection';
import './Sidebar.css';
import TagsSection from './TagsSection/TagsSection';
import ThemeSwitch from './ThemeSwitch/ThemeSwitch';
import UserInfo from './UserInfo/UserInfo';

interface Props {
  handleTagFilter: (tag: ITag) => void;
  handleSearch: (query: string) => void;
  refetchTrigger: boolean;
}

export default function Sidebar({ handleTagFilter, handleSearch, refetchTrigger }: Props) {
  const { setActiveTag } = useContext(ActiveTagContext);
  const { setCurrentView } = useContext(CurrentViewContext);

  const handleSetCurrentView = () => {
    setCurrentView('Other');
    localStorage.setItem('currentView', 'Other');
  };

  return (
    <div className="sidebar">
      <section className="sidebar-section">
        <UserInfo />
        <SearchSection handleSearch={handleSearch} />
        <TagsSection handleTagFilter={handleTagFilter} refetchTrigger={refetchTrigger} />
      </section>
      <section
        className="sidebar-section"
        onClick={() => {
          handleSetCurrentView();
          setActiveTag(null);
        }}>
        <AddPostSection />
        <ManageTagsSection />
      </section>
      <section className="sidebar-section">
        <ThemeSwitch aria-label="Toggle theme" />
        <LogoutSection />
      </section>
    </div>
  );
}
