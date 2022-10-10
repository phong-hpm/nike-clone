import { AppProps } from "next/app";

import "../styles/main.css";

import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from "@apollo/client";

const NEXT_PUBLIC_GRAPHQL_API = process.env.NEXT_PUBLIC_GRAPHQL_API;

const createApolloClient = (authToken: string) => {
  return new ApolloClient({
    link: new HttpLink({
      uri: NEXT_PUBLIC_GRAPHQL_API,
      // headers: {
      //   Authorization: `Bearer ${authToken}`,
      // },
    }),
    cache: new InMemoryCache(),
  });
};

const client = createApolloClient("");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
