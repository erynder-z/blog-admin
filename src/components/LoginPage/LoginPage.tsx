import React, { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

interface Props {
  setToken: Dispatch<SetStateAction<string | null>>;
}

export default function LoginPage({ setToken }: Props) {
  const navigate = useNavigate();

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      if (response.status === 200) {
        localStorage.setItem('jwt', data.token);
        setToken(data.token);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const usernameInput = event.currentTarget.querySelector(
      '[name="username"]'
    ) as HTMLInputElement;
    const passwordInput = event.currentTarget.querySelector(
      '[name="password"]'
    ) as HTMLInputElement;
    const username = usernameInput.value;
    const password = passwordInput.value;
    try {
      await login(username, password);
    } catch (error) {
      navigate('/login');
    }
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        <h1>Please login to continue!</h1>
        <form className="login-form" action="" method="POST" onSubmit={handleSubmit}>
          <div className="input-container">
            <input name="username" autoComplete="off" autoFocus required type="text" />
            <label htmlFor="username">Username</label>
          </div>
          <div className="input-container">
            <input name="password" autoComplete="off" autoFocus required type="password" />
            <label htmlFor="password">Password</label>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
