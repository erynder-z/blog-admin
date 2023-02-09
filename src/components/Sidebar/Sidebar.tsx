import React, { Dispatch, SetStateAction, useContext } from 'react';
import FilterContext from '../../contexts/FilterContext';
import { ViewType } from '../../interfaces/customTypes';
import AddPostSection from './AddArticleSection/AddArticleSection';
import ClearSearch from './ClearSearch/ClearSearch';
import LogoutSection from './LogoutSection/LogoutSection';
import ManageTagsSection from './ManageTagsSection/ManageTagsSection';
import SearchSection from './SearchSection/SearchSection';
import TagsSection from './TagsSection/TagsSection';
import ThemeSwitch from './ThemeSwitch/ThemeSwitch';
import './Sidebar.css';

interface Props {
  refetchTrigger: boolean;
  setCurrentView: Dispatch<SetStateAction<ViewType | null>>;
}

export default function Sidebar({ refetchTrigger, setCurrentView }: Props) {
  const { setFilter } = useContext(FilterContext);
  return (
    <div className="sidebar">
      <section className="sidebar-section">
        <SearchSection />
        <TagsSection refetchTrigger={refetchTrigger} />
      </section>
      <section className="sidebar-section">
        <ClearSearch />
      </section>
      <section
        className="sidebar-section"
        onClick={() => {
          setFilter(null);
          setCurrentView('Other');
          localStorage.setItem('currentView', 'Other');
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
