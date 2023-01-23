import { createContext, useState } from 'react';
import { ThemeType } from '../interfaces/customTypes';

interface ThemeContextProviderProps {
  children: React.ReactElement;
}

interface ThemeContextProps {
  theme: ThemeType | null;
  setTheme: (theme: ThemeType | null) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: null,
  setTheme: () => {}
});

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  const [theme, setTheme] = useState<ThemeType | null>(
    (localStorage.getItem('theme') as ThemeType) || 'Default'
  );

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>;
}

export default ThemeContext;
