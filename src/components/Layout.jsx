import React from "react";
import Head from "next/head";

import Header from "#components/Header";
import Main from "#components/Main";
import { AppContextProvider } from "#utils/appContext";
import { SITE } from "#utils/constants";

export default function Layout({ children }) {
  const mainRef = React.useRef();
  const [navbarVisible, setNavbarVisible] = React.useState(false);
  const toggleNavbar = () => {
    setNavbarVisible(!navbarVisible);
  };

  return (
    <>
      <Head>
        <title>{SITE.title}</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
      </Head>
      <AppContextProvider>
        <Header toggleNavbar={toggleNavbar} />
        <div ref={mainRef} style={{ padding: 10 }}>
          <Main containerRef={mainRef} navbarVisible={navbarVisible} />
          {children}
        </div>
      </AppContextProvider>
    </>
  );
}
