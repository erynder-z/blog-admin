import React, { useContext, useEffect, useRef, useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import './App.css';
import AllArticles from './components/Main/AllArticles/AllArticles';
import ArticlePage from './components/Main/ArticlePage/ArticlePage';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import { ITag } from './interfaces/Tag';
import { FaAngleDoubleUp } from 'react-icons/fa';
import AddArticlePage from './components/Main/AddArticlePage/AddArticlePage';
import ManageTagsPage from './components/Main/ManageTagsPage/ManageTagsPage';
import LoginPage from './components/LoginPage/LoginPage';
import UnpublishedArticles from './components/Main/UnpublishedArticles/UnpublishedArticles';
import PublishedArticles from './components/Main/PublishedArticles/PublishedArticles';
import AuthContext from './contexts/AuthContext';
import EditArticle from './components/Main/EditArticle/EditArticle';
import CurrentViewContext from './contexts/CurrentViewContext';

type ProtectedRouteProps = {
  user: any;
  redirectPath?: string;
};

const ProtectedRoute = ({ user, redirectPath = '/' }: ProtectedRouteProps) => {
  return user ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

function App() {
  const { token, user, isAuth, setUser, setIsAuth } = useContext(AuthContext);

  const [filter, setFilter] = useState<ITag | string | null>(null);
  const [sidebarActive, setSidebarActive] = useState<boolean>(false);
  const [refetchTrigger, setRefetchTrigger] = useState<boolean>(false);

  const handleTagFilter = (tag: ITag) => {
    tag !== filter ? setFilter(tag) : setFilter(null);
  };

  const handleSearch = (query: string) => {
    setFilter(query);
  };

  const toggleSidebarActive = () => {
    setSidebarActive(!sidebarActive);
  };

  useEffect(() => {
    setRefetchTrigger(false);
  }, [refetchTrigger]);

  useEffect(() => {
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
          setIsAuth(false);
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkToken();
  }, [token]);

  if (!user) {
    return <LoginPage />;
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
              <Route path="/all" element={<AllArticles filter={filter} />} />
              <Route path="/article/:id" element={<ArticlePage />} />
              <Route path="/add_article" element={<AddArticlePage />} />
              <Route path="/edit_article/:id" element={<EditArticle />} />
              <Route
                path="/manage_tags"
                element={<ManageTagsPage setRefetchTrigger={setRefetchTrigger} />}
              />
              <Route path="/published" element={<PublishedArticles filter={filter} />} />
              <Route path="/unpublished" element={<UnpublishedArticles filter={filter} />} />
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
          <Sidebar
            handleTagFilter={handleTagFilter}
            handleSearch={handleSearch}
            refetchTrigger={refetchTrigger}
          />
        </div>
      </aside>
    </div>
  );
}

export default App;
