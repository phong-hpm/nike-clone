import { createContext, FC, ReactNode, useCallback, useMemo, useState } from "react";

export type TabsContextType = {
  selected: number;
  handleChange: (index: number) => void;
};
export const TabsContext = createContext<TabsContextType>({
  selected: 0,
  handleChange: () => {},
});

export interface TabsProviderProps {
  selected?: number;
  onChangeTab?: (index: number) => void;
  children: ReactNode;
}

const TabsProvider: FC<TabsProviderProps> = ({ children, selected: selectedProp, onChangeTab }) => {
  const [selected, setSelected] = useState(0);

  const handleChange = useCallback(
    (index: number) => {
      setSelected(index);
      onChangeTab?.(index);
    },
    [onChangeTab]
  );

  const values = useMemo(
    () => ({
      selected: selectedProp || selectedProp === 0 ? selectedProp : selected,
      handleChange,
    }),
    [selected, selectedProp, handleChange]
  );

  return <TabsContext.Provider value={values}>{children}</TabsContext.Provider>;
};

export default TabsProvider;
