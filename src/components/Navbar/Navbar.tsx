import React from 'react';
import { Link } from 'react-router-dom';
import { ViewType } from '../../interfaces/customTypes';
import './Navbar.css';

interface Props {
  currentView: ViewType | null;
}

export default function Navbar({ currentView }: Props) {
  return (
    <nav aria-label="Main navigation" className="navbar">
      <h1 className="nav-title">./code/blog/admin</h1>
      <ul className="nav-list">
        <li className="nav-list-item">
          <Link
            to="/code-blog-admin/all"
            className={`${currentView === 'All' ? 'active' : ''}`}
            aria-current={currentView === 'All' ? 'page' : undefined}>
            All
          </Link>
        </li>
        <li className="nav-list-item">
          <Link
            to="/code-blog-admin/published"
            className={`${currentView === 'Published' ? 'active' : ''}`}
            aria-current={currentView === 'Published' ? 'page' : undefined}>
            Published articles
          </Link>
        </li>
        <li className="nav-list-item">
          <Link
            to="/code-blog-admin/unpublished"
            className={`${currentView === 'Unpublished' ? 'active' : ''}`}
            aria-current={currentView === 'Unpublished' ? 'page' : undefined}>
            Unpublished articles
          </Link>
        </li>
        <li className="nav-list-item">
          <Link
            to="/code-blog-admin/howto"
            className={`${currentView === 'Manual' ? 'active' : ''}`}
            aria-current={currentView === 'Manual' ? 'page' : undefined}>
            Manual
          </Link>
        </li>
      </ul>
    </nav>
  );
}
