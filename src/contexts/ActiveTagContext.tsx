/* import { createContext, useState } from 'react';
import { ITag } from '../interfaces/Tag';

interface ActiveTagContextProviderProps {
  children: React.ReactElement;
}

interface ActiveTagContextProps {
  activeTag: ITag | null;
  setActiveTag: (activeTag: ITag | null) => void;
}

const ActiveTagContext = createContext<ActiveTagContextProps>({
  activeTag: null,
  setActiveTag: () => {}
});

export function ActiveTagContextProvider({ children }: ActiveTagContextProviderProps) {
  const [activeTag, setActiveTag] = useState<ITag | null>(null);
  return (
    <ActiveTagContext.Provider value={{ activeTag, setActiveTag }}>
      {children}
    </ActiveTagContext.Provider>
  );
}

export default ActiveTagContext;
 */
