import React, { useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import AllPosts from './components/Main/AllPosts/AllPosts';
import ArticlePage from './components/Main/ArticlePage/ArticlePage';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { ITag } from './interfaces/Tag';
import { FaAngleDoubleUp } from 'react-icons/fa';
import AddPostPage from './components/Main/AddPostPage/AddPostPage';

type ProtectedRouteProps = {
  user: any;
  redirectPath?: string;
};

const ProtectedRoute = ({ user, redirectPath = '/login' }: ProtectedRouteProps) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

function App() {
  const [filter, setFilter] = useState<ITag | string | null>(null);
  const [sidebarActive, setSidebarActive] = useState<boolean>(false);

  const handleTagFilter = (tag: ITag) => {
    setFilter(tag);
  };

  const handleSearch = (query: string) => {
    setFilter(query);
  };

  const toggleSidebarActive = () => {
    setSidebarActive(!sidebarActive);
  };

  return (
    <div className="app-container">
      <div className="main-container">
        <nav>
          <Navbar />
        </nav>
        <main>
          <Routes>
            <Route element={<ProtectedRoute user={user} />}>
              <Route path="/" element={<Navigate replace to="/all" />} />
              <Route path="/all" element={<AllPosts filter={filter} />} />
              <Route path="/post/:id" element={<ArticlePage />} />
              <Route path="/add_post" element={<AddPostPage />} />
              <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Route>
          </Routes>
        </main>
      </div>
      <aside>
        <FaAngleDoubleUp
          className={`sidebar_toggle ${sidebarActive ? 'active' : ''}`}
          onClick={toggleSidebarActive}
        />
        <div className={`side-container ${sidebarActive ? 'active' : ''}`}>
          <Sidebar handleTagFilter={handleTagFilter} handleSearch={handleSearch} />
        </div>
      </aside>
    </div>
  );
}

export default App;
