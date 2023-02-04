import React, { useContext } from 'react';
import './LogoutSection.css';
import { FaPowerOff } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../../contexts/AuthContext';

export default function LogoutSection() {
  const { setToken, setUser } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleLogout = () => {
    window.localStorage.clear();
    setToken(null);
    setUser(null);
    navigate('/');
  };

  return (
    <div className="logout-container">
      <button className="logoutBtn" onClick={handleLogout} aria-label="Logout">
        Logout <FaPowerOff />
      </button>
    </div>
  );
}
