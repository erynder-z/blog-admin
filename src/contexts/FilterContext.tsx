import { createContext, useState } from 'react';
import { ITag } from '../interfaces/Tag';

interface FilterContextProviderProps {
  children: React.ReactElement;
}

interface FilterContextProps {
  filter: ITag | string | null;
  setFilter: (filter: ITag | string | null) => void;
}

const FilterContext = createContext<FilterContextProps>({
  filter: null,
  setFilter: () => {}
});

export function FilterContextProvider({ children }: FilterContextProviderProps) {
  const [filter, setFilter] = useState<ITag | string | null>(null);
  return <FilterContext.Provider value={{ filter, setFilter }}>{children}</FilterContext.Provider>;
}

export default FilterContext;
