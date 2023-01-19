import React, { Dispatch, SetStateAction, useContext } from 'react';
import { Link } from 'react-router-dom';
import ActiveTagContext from '../../contexts/ActiveTagContext';
import { ViewType } from '../../interfaces/customTypes';
import './Navbar.css';

interface Props {
  currentView: ViewType | null;
  setCurrentView: Dispatch<SetStateAction<ViewType | null>>;
}

export default function Navbar({ currentView, setCurrentView }: Props) {
  const { setActiveTag } = useContext(ActiveTagContext);

  const handleSetCurrentView = (currentView: 'All' | 'Published' | 'Unpublished' | 'Manual') => {
    setCurrentView(currentView);
    localStorage.setItem('currentView', currentView);
  };

  return (
    <div className="navbar">
      <h1 className="nav-title">Admin</h1>
      <div className="nav-list">
        <Link
          to="/all"
          className={`nav-list-item ${currentView === 'All' ? 'active' : ''}`}
          onClick={() => {
            handleSetCurrentView('All'), setActiveTag(null);
          }}>
          All
        </Link>
        <Link
          to="/published"
          className={`nav-list-item ${currentView === 'Published' ? 'active' : ''}`}
          onClick={() => {
            handleSetCurrentView('Published'), setActiveTag(null);
          }}>
          Published articles
        </Link>
        <Link
          to="/unpublished"
          className={`nav-list-item ${currentView === 'Unpublished' ? 'active' : ''}`}
          onClick={() => {
            handleSetCurrentView('Unpublished'), setActiveTag(null);
          }}>
          Unpublished articles
        </Link>
        <Link
          to="/howto"
          className={`nav-list-item ${currentView === 'Manual' ? 'active' : ''}`}
          onClick={() => {
            handleSetCurrentView('Manual'), setActiveTag(null);
          }}>
          Manual
        </Link>
      </div>
    </div>
  );
}
