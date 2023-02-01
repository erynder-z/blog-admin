import { createContext, useState } from 'react';
import { ThemeType } from '../interfaces/customTypes';

interface ThemeContextProviderProps {
  children: React.ReactElement;
}

interface ThemeContextProps {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: 'Default',
  setTheme: () => {}
});

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<ThemeType>(
    (localStorage.getItem('theme') as ThemeType) || 'Default'
  );

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export default ThemeContext;
