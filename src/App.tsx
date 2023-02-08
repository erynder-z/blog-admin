import React, { useContext, useEffect, useState } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AuthContext from './contexts/AuthContext';
import ThemeContext from './contexts/ThemeContext';
import { ViewType } from './interfaces/customTypes';
import AllArticles from './components/Main/AllArticles/AllArticles';
import ArticlePage from './components/Main/ArticlePage/ArticlePage';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import AddArticlePage from './components/Main/AddArticlePage/AddArticlePage';
import ManageTagsPage from './components/Main/ManageTagsPage/ManageTagsPage';
import LoginPage from './components/LoginPage/LoginPage';
import UnpublishedArticles from './components/Main/UnpublishedArticles/UnpublishedArticles';
import PublishedArticles from './components/Main/PublishedArticles/PublishedArticles';
import EditArticle from './components/Main/EditArticle/EditArticle';
import NotFoundPage from './components/Main/NotFoundPage/NotFoundPage';
import ConfirmArticleDelete from './components/Main/ConfirmArticleDelete/ConfirmArticleDelete';
import ManualPage from './components/Main/ManualPage/ManualPage';
import SearchResults from './components/Main/SearchResults/SearchResults';
import { FaAngleDoubleUp } from 'react-icons/fa';
import './App.css';

type ProtectedRouteProps = {
  user: any;
  redirectPath?: string;
};

const ProtectedRoute = ({ user, redirectPath = '/' }: ProtectedRouteProps) => {
  return user ? <Outlet /> : <Navigate to={redirectPath} replace />;
};

function App() {
  const { token, user, isAuth, setUser, setIsAuth } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);

  const [sidebarActive, setSidebarActive] = useState<boolean>(false);
  const [refetchTrigger, setRefetchTrigger] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<ViewType | null>(
    (localStorage.getItem('currentView') as ViewType) || null
  );

  const toggleSidebarActive = () => {
    setSidebarActive(!sidebarActive);
  };

  useEffect(() => {
    setRefetchTrigger(false);
  }, [refetchTrigger]);

  if (!user) {
    return <LoginPage />;
  }

  if (!isAuth) {
    return <p className="loading">Loading...</p>;
  }

  return (
    <div className={`app-container ${theme}`}>
      <div className="main-container">
        <nav>
          <Navbar currentView={currentView} />
        </nav>
        <main>
          <Routes>
            <Route element={<ProtectedRoute user={user} />}>
              <Route
                path="/code-blog-admin/"
                element={<Navigate replace to="/code-blog-admin/all" />}
              />
              <Route
                path="/code-blog-admin/all"
                element={<AllArticles setCurrentView={setCurrentView} />}
              />
              <Route
                path="/code-blog-admin/article/:id"
                element={<ArticlePage setCurrentView={setCurrentView} />}
              />
              <Route
                path="/code-blog-admin/add_article"
                element={<AddArticlePage setCurrentView={setCurrentView} />}
              />
              <Route
                path="/code-blog-admin/edit_article/:id"
                element={<EditArticle setCurrentView={setCurrentView} />}
              />
              <Route
                path="/code-blog-admin/confirm_article_delete/:id"
                element={<ConfirmArticleDelete />}
              />
              <Route
                path="/code-blog-admin/manage_tags"
                element={<ManageTagsPage setRefetchTrigger={setRefetchTrigger} />}
              />
              <Route
                path="/code-blog-admin/published"
                element={<PublishedArticles setCurrentView={setCurrentView} />}
              />
              <Route
                path="/code-blog-admin/unpublished"
                element={<UnpublishedArticles setCurrentView={setCurrentView} />}
              />
              <Route
                path="/code-blog-admin/howto"
                element={<ManualPage setCurrentView={setCurrentView} />}
              />
              <Route
                path="/code-blog-admin/search"
                element={<SearchResults setCurrentView={setCurrentView} />}
              />
              <Route
                path="/code-blog-admin/*"
                element={<NotFoundPage setCurrentView={setCurrentView} />}
              />
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
          <Sidebar refetchTrigger={refetchTrigger} setCurrentView={setCurrentView} />
        </div>
      </aside>
    </div>
  );
}

export default App;
