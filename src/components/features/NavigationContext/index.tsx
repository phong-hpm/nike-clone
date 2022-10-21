import { createContext, Dispatch, FC, ReactNode, SetStateAction, useMemo, useState } from "react";

export interface INavigationContextValue {
  navigating: boolean;
  setNavigating: Dispatch<SetStateAction<boolean>>;
  onNavigate?: (nav: INavigation) => void;
}

export const NavigationContext = createContext<INavigationContextValue>({
  navigating: false,
  setNavigating: () => {},
});

export interface NavigationProviderProps {
  children: ReactNode;
  onNavigate?: (nav: INavigation) => void;
}

export const NavigationProvider: FC<NavigationProviderProps> = ({ onNavigate, children }) => {
  const [navigating, setNavigating] = useState(false);

  const values = useMemo(() => {
    return {
      navigating,
      setNavigating,
      onNavigate,
    };
  }, [navigating, onNavigate]);

  return <NavigationContext.Provider value={values}>{children}</NavigationContext.Provider>;
};
