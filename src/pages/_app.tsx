import { AppProps } from "next/app";

import "../globals";
import "../styles/main.scss";

import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";

const NEXT_PUBLIC_GRAPHQL_API = process.env.NEXT_PUBLIC_GRAPHQL_API;

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        products: offsetLimitPagination(),
      },
    },
  },
});

const createApolloClient = (authToken: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: NEXT_PUBLIC_GRAPHQL_API,
      // headers: { Authorization: `Bearer ${authToken}` },
    }),
    cache,
  });
};

export const apolloClient = createApolloClient("");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
