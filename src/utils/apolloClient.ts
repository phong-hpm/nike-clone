import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const NEXT_PUBLIC_GRAPHQL_API = process.env.NEXT_PUBLIC_GRAPHQL_API;

const createApolloClient = () => {
  return new ApolloClient({
    link: new HttpLink({ uri: NEXT_PUBLIC_GRAPHQL_API }),
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            products: offsetLimitPagination(), // without it, [fetchmore] will not work
          },
        },
      },
    }),
    defaultOptions: {
      query: {
        // fetchPolicy: "network-only",
        // fetchPolicy: "no-cache",
      },
    },
  });
};

export const apolloClient = createApolloClient();
