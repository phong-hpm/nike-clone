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

  const setQuery = useCallback(
    (queries: Record<string, string>) => {
      setNavigating(true);

      const mappedQueries = { ...router.query, ...queries };
      // delete nunable query
      const filterdQueries = Object.entries(mappedQueries).reduce((result, [key, val]) => {
        if (val) result[key] = val;
        return result;
      }, {} as Record<string, string | string[]>);

      router.replace({ ...router, query: filterdQueries });
    },
    [setNavigating, router]
  );

  // when [router.asPath] was changed, set navigating to be "false"
  useEffect(() => {
    setNavigating(false);
  }, [router.asPath, setNavigating]);

  return { navigate, navigating, setNavigating, setQuery };
};
