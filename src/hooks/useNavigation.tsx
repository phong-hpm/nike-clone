import { useContext } from "react";

// context
import { NavigationContext } from "@root/components/features";

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  return context;
};
