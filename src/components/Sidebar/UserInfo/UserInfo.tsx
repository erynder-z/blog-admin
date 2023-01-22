import React, { useContext } from 'react';
import './UserInfo.css';
import AuthContext from '../../../contexts/AuthContext';

export default function UserInfo() {
  const { user } = useContext(AuthContext);

  const parsed = JSON.parse(JSON.stringify(user));

  return <div className="userinfo-container">{`Welcome, ${parsed.user.username}!`}</div>;
}
