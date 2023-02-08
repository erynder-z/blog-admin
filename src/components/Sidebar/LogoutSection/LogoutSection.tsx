import React, { useContext } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaPowerOff } from 'react-icons/fa';
import './LogoutSection.css';

export default function LogoutSection() {
  const { setToken, setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.clear();
    setToken(null);
    setUser(null);
    navigate('/code-blog-admin/');
  };

  return (
    <div className="logout-container">
      <button className="logoutBtn" onClick={handleLogout} aria-label="Logout">
        Logout <FaPowerOff />
      </button>
    </div>
  );
}
