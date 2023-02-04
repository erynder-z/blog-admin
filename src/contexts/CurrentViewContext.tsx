/* import { createContext, useState } from 'react';
import { ViewType } from '../interfaces/customTypes';

interface CurrentViewContextProviderProps {
  children: React.ReactElement;
}

interface CurrentViewContextProps {
  currentView: ViewType | null;
  setCurrentView: (currentView: ViewType | null) => void;
}

const CurrentViewContext = createContext<CurrentViewContextProps>({
  currentView: null,
  setCurrentView: () => {}
});

export function CurrentViewContextProvider({ children }: CurrentViewContextProviderProps) {
  const [currentView, setCurrentView] = useState<ViewType | null>(
    (localStorage.getItem('currentView') as ViewType) || 'All'
  );

  return (
    <CurrentViewContext.Provider value={{ currentView, setCurrentView }}>
      {children}
    </CurrentViewContext.Provider>
  );
}

export default CurrentViewContext;
 */
