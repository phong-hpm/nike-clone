import { useEffect } from "react";
import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import NProgress from "nprogress";
import Router from "next/router";

// utils
import { apolloClient } from "@root/utils";

import "nprogress/nprogress.css";
import "react-loading-skeleton/dist/skeleton.css";
import "rc-rate/assets/index.css";
import "@root/globals";
import "@root/styles/main.scss";

const App = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    NProgress.configure({ showSpinner: false, speed: 500 });

    Router.events.on("routeChangeStart", NProgress.start);
    Router.events.on("routeChangeComplete", NProgress.done);
    Router.events.on("routeChangeError", NProgress.done);
    return () => {
      Router.events.off("routeChangeStart", NProgress.start);
      Router.events.off("routeChangeComplete", NProgress.done);
      Router.events.off("routeChangeError", NProgress.done);
    };
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};

export default App;
