import { useContext, useCallback, useEffect } from "react";
import { useRouter } from "next/router";

// context
import { NavigationContext } from "@root/components/features";

export const useNavigation = () => {
  const router = useRouter();
  const { navigating, setNavigating } = useContext(NavigationContext);

  const navigate = useCallback(
    (path: string) => {
      setNavigating(true);
      router.push(path);
    },
    [setNavigating, router]
  );

  // when [router.asPath] was changed, set navigating to be "false"
  useEffect(() => {
    setNavigating(false);
  }, [router.asPath, setNavigating]);

  return { navigate, navigating, setNavigating };
};
