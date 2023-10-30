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
        <link rel="icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
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
