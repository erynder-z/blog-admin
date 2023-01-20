import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ActiveTagContext from '../../contexts/ActiveTagContext';
import CurrentViewContext from '../../contexts/CurrentViewContext';
import './Navbar.css';

export default function Navbar() {
  const { setActiveTag } = useContext(ActiveTagContext);
  const { currentView, setCurrentView } = useContext(CurrentViewContext);

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
