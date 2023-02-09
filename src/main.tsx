import React from 'react';
import { HashRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { AuthContextProvider } from './contexts/AuthContext';
import { ThemeContextProvider } from './contexts/ThemeContext';
import { FilterContextProvider } from './contexts/FilterContext';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <AuthContextProvider>
        <ThemeContextProvider>
          <FilterContextProvider>
            <App />
          </FilterContextProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </HashRouter>
  </React.StrictMode>
);
