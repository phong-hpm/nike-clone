import { useContext, useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { UrlObject } from "url";

// context
import { NavigationContext } from "@root/components/features";

// from "next/router"
interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
  unstable_skipClientCache?: boolean;
}

/**
 * remove all query which are [null], [undefined], [empty], or it is an "Array"
 * @param {Record<string, string | string[] | undefined>} queries
 * @returns Record<tring, string>
 */
const removeInvalidQuery = (
  routerQuery: ParsedUrlQuery,
  queries: Record<string, string | string[] | undefined>
) => {
  Object.entries(queries).forEach(([key, val]) => {
    // if array, it is "slug"
    if (val) {
      routerQuery[key] = String(val);
    } else {
      delete routerQuery[key];
    }
  });
  return routerQuery;
};

export const useNavigation = () => {
  const router = useRouter();
  const { navigating, setNavigating, onNavigate } = useContext(NavigationContext);

  const navigate = useCallback(
    (url: string | UrlObject, options?: TransitionOptions) => {
      if (!options?.shallow) setNavigating(true);
      router.push(url, undefined, options);
    },
    [setNavigating, router]
  );

  const replace = useCallback(
    (url: string | UrlObject, options?: TransitionOptions) => {
      if (!options?.shallow) setNavigating(true);
      router.replace(url, undefined, options);
    },
    [setNavigating, router]
  );

  /**
   * [navigateQuery] won't add a new URL entry into the history stack.
   */
  const replaceQuery = useCallback(
    (queries: Record<string, string>, options?: TransitionOptions) => {
      if (!options?.shallow) setNavigating(true);

      const validQueries = removeInvalidQuery(router.query, queries);
      router.replace({ ...router, query: validQueries }, undefined, options);
    },
    [setNavigating, router]
  );

  // when [router.asPath] was changed, set navigating to be "false"
  useEffect(() => setNavigating(false), [router.asPath, setNavigating]);

  return { navigating, setNavigating, replace, navigate, replaceQuery, onNavigate };
};
