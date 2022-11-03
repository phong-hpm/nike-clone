import { createContext, Dispatch, FC, ReactNode, SetStateAction, useMemo, useState } from "react";

export type TabsContextType = {
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
};
export const TabsContext = createContext<TabsContextType>({
  selected: 0,
  setSelected: () => {},
});

export interface TabsProviderProps {
  children: ReactNode;
}

const TabsProvider: FC<TabsProviderProps> = ({ children }) => {
  const [selected, setSelected] = useState(0);

  const values = useMemo(() => ({ selected, setSelected }), [selected, setSelected]);

  return <TabsContext.Provider value={values}>{children}</TabsContext.Provider>;
};

export default TabsProvider;
