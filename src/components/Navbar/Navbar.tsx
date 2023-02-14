import React from 'react';
import { Link } from 'react-router-dom';
import { ViewType } from '../../interfaces/customTypes';
import UserInfo from '../Sidebar/UserInfo/UserInfo';
import './Navbar.css';

interface Props {
  currentView: ViewType | null;
}

export default function Navbar({ currentView }: Props) {
  return (
    <nav aria-label="Main navigation" className="navbar">
      <div className="nav_upper-container">
        <h1 className="nav-title">
          <span>./</span>code<span>/</span>blog<span>/</span>admin
        </h1>
        <UserInfo />
      </div>
      <ul className="nav-list">
        <li className="nav-list-item">
          <Link
            to="/all"
            className={`${currentView === 'All' ? 'active' : ''}`}
            aria-current={currentView === 'All' ? 'page' : undefined}>
            All
          </Link>
        </li>
        <li className="nav-list-item">
          <Link
            to="/published"
            className={`${currentView === 'Published' ? 'active' : ''}`}
            aria-current={currentView === 'Published' ? 'page' : undefined}>
            Published articles
          </Link>
        </li>
        <li className="nav-list-item">
          <Link
            to="/unpublished"
            className={`${currentView === 'Unpublished' ? 'active' : ''}`}
            aria-current={currentView === 'Unpublished' ? 'page' : undefined}>
            Unpublished articles
          </Link>
        </li>
        <li className="nav-list-item">
          <Link
            to="/howto"
            className={`${currentView === 'Manual' ? 'active' : ''}`}
            aria-current={currentView === 'Manual' ? 'page' : undefined}>
            Manual
          </Link>
        </li>
      </ul>
    </nav>
  );
}
