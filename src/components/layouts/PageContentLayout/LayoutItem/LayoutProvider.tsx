import { createContext, FC, ReactNode, useMemo } from "react";

export interface IDebugCard {
  grid?: string;
  row?: string;
  col?: string;
  block?: string;
  card?: string;
  containerType?: string;
}

export const LayoutContext = createContext<{
  layoutItemList: ILayoutItem[];
}>({
  layoutItemList: [],
});

export interface LayoutProviderProps {
  layoutItemList: ILayoutItem[];
  children: ReactNode;
}

const LayoutProvider: FC<LayoutProviderProps> = ({ layoutItemList, children }) => {
  const values = useMemo(
    () => ({
      layoutItemList,
    }),
    [layoutItemList]
  );

  return <LayoutContext.Provider value={values}>{children}</LayoutContext.Provider>;
};

export default LayoutProvider;
