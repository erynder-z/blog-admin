import React, { useEffect, useRef, useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import AllPosts from './components/Main/AllPosts/AllPosts';
import ArticlePage from './components/Main/ArticlePage/ArticlePage';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { ITag } from './interfaces/Tag';
import { FaAngleDoubleUp } from 'react-icons/fa';
import AddPostPage from './components/Main/AddPostPage/AddPostPage';
import AddTagPage from './components/Main/AddTagPage/AddTagPage';
import LoginPage from './components/LoginPage/LoginPage';
import UnpublishedPosts from './components/Main/UnpublishedPosts/UnpublishedPosts';
import PublishedPosts from './components/Main/PublishedPosts/PublishedPosts';

type ProtectedRouteProps = {
  user: any;
  redirectPath?: string;
};

type User = {
  _id: string;
  username: string;
};

const ProtectedRoute = ({ user, redirectPath = '/login' }: ProtectedRouteProps) => {
  return user ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('jwt'));
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);
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

  useEffect(() => {
    if (token) {
      const checkToken = async () => {
        try {
          const response = await fetch('http://localhost:8000/api/check-token', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          });
          const data = await response.json();
          if (response.status === 200) {
            setUser(data);
            setIsAuth(true);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error(error);
        }
      };
      checkToken();
    }
  }, [token]);

  if (!user) {
    return <LoginPage setToken={setToken} />;
  }

  if (!isAuth) {
    return <p className="loading">Loading...</p>;
  }

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
              <Route path="/all" element={<AllPosts filter={filter} token={token} />} />
              <Route path="/post/:id" element={<ArticlePage />} />
              <Route path="/add_post" element={<AddPostPage token={token} />} />
              <Route path="/add_tag" element={<AddTagPage token={token} />} />
              <Route path="/published" element={<PublishedPosts filter={filter} token={token} />} />
              <Route
                path="/unpublished"
                element={<UnpublishedPosts filter={filter} token={token} />}
              />
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
