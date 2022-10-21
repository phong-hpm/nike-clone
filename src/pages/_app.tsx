import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

// utils
import { apolloClient } from "@root/utils";

import "@root/globals";
import "@root/styles/main.scss";
import "react-loading-skeleton/dist/skeleton.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
