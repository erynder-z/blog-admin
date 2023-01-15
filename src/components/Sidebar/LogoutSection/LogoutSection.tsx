import React from 'react';
import './LogoutSection.css';
import { FaPowerOff } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

type User = {
  _id: string;
  username: string;
};

interface Props {
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

export default function LogoutSection({ setToken, setUser }: Props) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setToken(null);
    setUser(null);
    navigate('/');
  };

  return (
    <div className="logout-container">
      <button className="logoutBtn" onClick={handleLogout}>
        Logout <FaPowerOff />
      </button>
    </div>
  );
}
