import { createContext, Dispatch, FC, ReactNode, SetStateAction, useMemo, useState } from "react";

export interface INavigationContextValue {
  navigating: boolean;
  setNavigating: Dispatch<SetStateAction<boolean>>;
}

export const NavigationContext = createContext<INavigationContextValue>({
  navigating: false,
  setNavigating: () => {},
});

export interface NavigationProviderProps {
  children: ReactNode;
}

export const NavigationProvider: FC<NavigationProviderProps> = ({ children }) => {
  const [navigating, setNavigating] = useState(false);

  const values = useMemo(() => {
    return {
      navigating,
      setNavigating,
    };
  }, [navigating]);

  return <NavigationContext.Provider value={values}>{children}</NavigationContext.Provider>;
};
