import { createContext, useEffect, useState } from 'react';

type User = {
  _id: string;
  username: string;
};

interface AuthContextProviderProps {
  children: React.ReactElement;
}

interface AuthContextProps {
  token: string | null;
  user: User | null;
  isAuth: boolean;
  setToken: (token: string | null) => void;
  setUser: (user: User | null) => void;
  setIsAuth: (isAuth: boolean) => void;
}

const AuthContext = createContext<AuthContextProps>({
  token: null,
  user: null,
  isAuth: false,
  setToken: () => {},
  setUser: () => {},
  setIsAuth: () => {}
});

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('jwt') || null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    if (token) {
      localStorage.setItem('jwt', token);
    } else {
      localStorage.removeItem('jwt');
    }
  }, [token]);

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

  return (
    <AuthContext.Provider value={{ token, user, isAuth, setToken, setUser, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
