import { useContext } from "react";

// context
import { NavigationContext } from "../components/main/NavigationContext";

const useNavigation = () => {
  const context = useContext(NavigationContext);
  return context;
};

export default useNavigation;
