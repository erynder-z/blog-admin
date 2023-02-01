import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ActiveTagContext from '../../contexts/ActiveTagContext';
import CurrentViewContext from '../../contexts/CurrentViewContext';
import { FaServer } from 'react-icons/fa';
import './Navbar.css';

export default function Navbar() {
  const { setActiveTag } = useContext(ActiveTagContext);
  const { currentView, setCurrentView } = useContext(CurrentViewContext);

  const handleSetCurrentView = (currentView: 'All' | 'Published' | 'Unpublished' | 'Manual') => {
    setCurrentView(currentView);
    localStorage.setItem('currentView', currentView);
  };

  return (
    <nav aria-label="Main navigation" className="navbar">
      <h1 className="nav-title">
        <FaServer />
        Blog-Admin
      </h1>
      <ul className="nav-list">
        <li className="nav-list-item">
          <Link
            to="/all"
            className={`${currentView === 'All' ? 'active' : ''}`}
            aria-current={currentView === 'All' ? 'page' : undefined}
            onClick={() => {
              handleSetCurrentView('All'), setActiveTag(null);
            }}>
            All
          </Link>
        </li>
        <li className="nav-list-item">
          <Link
            to="/published"
            className={`${currentView === 'Published' ? 'active' : ''}`}
            aria-current={currentView === 'Published' ? 'page' : undefined}
            onClick={() => {
              handleSetCurrentView('Published'), setActiveTag(null);
            }}>
            Published articles
          </Link>
        </li>
        <li className="nav-list-item">
          <Link
            to="/unpublished"
            className={`${currentView === 'Unpublished' ? 'active' : ''}`}
            aria-current={currentView === 'Unpublished' ? 'page' : undefined}
            onClick={() => {
              handleSetCurrentView('Unpublished'), setActiveTag(null);
            }}>
            Unpublished articles
          </Link>
        </li>
        <li className="nav-list-item">
          <Link
            to="/howto"
            className={`${currentView === 'Manual' ? 'active' : ''}`}
            aria-current={currentView === 'Manual' ? 'page' : undefined}
            onClick={() => {
              handleSetCurrentView('Manual'), setActiveTag(null);
            }}>
            Manual
          </Link>
        </li>
      </ul>
    </nav>
  );
}
