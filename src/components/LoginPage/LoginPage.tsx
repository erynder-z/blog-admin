import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../contexts/AuthContext';
import { Blocks } from 'react-loader-spinner';
import './LoginPage.css';

export default function LoginPage() {
  const { setToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    setIsVerifying(true);
    setError(null);
    try {
      const serverURL = import.meta.env.VITE_SERVER_URL;
      const response = await fetch(`${serverURL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        setError('invalid credentials');
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      localStorage.setItem('jwt', data.token);
      setToken(data.token);
    } catch (error: any) {
      console.error(error);
    }
    setIsVerifying(false);
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
      navigate('/code-blog-admin/login');
    }
  };

  return (
    <div className="login-overlay">
      <h1 className="login-heading">./code/blog/admin</h1>
      <div className="login-container">
        <h1>Please login to continue!</h1>
        <form className="login-form" action="" method="POST" onSubmit={handleSubmit}>
          <div className="input-container">
            <input name="username" autoComplete="off" required type="text" />
            <label htmlFor="username">Username</label>
          </div>
          <div className="input-container">
            <input name="password" autoComplete="off" required type="password" />
            <label htmlFor="password">Password</label>
          </div>
          <button type="submit" className="loginBtn">
            <span className="loginBtn-text">Login</span>
          </button>
          <div className="status_message">
            {isVerifying && (
              <div className="verifying-container">
                <Blocks
                  visible={true}
                  height="80"
                  width="80"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                />
                verifying...
              </div>
            )}
            {error && <p className="error-container">{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
}
