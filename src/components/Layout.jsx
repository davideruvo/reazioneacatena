import React from "react";
import Head from "next/head";

import Header from "#components/Header";
import Main from "#components/Main";
import { AppContextProvider } from "#utils/appContext";
import { SITE } from "#utils/constants";

export default function Layout({ children }) {
  const mainRef = React.useRef();

  return (
    <>
      <Head>
        <title>{SITE.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppContextProvider>
        <Header />
        <div ref={mainRef} style={{ padding: 10 }}>
          <Main containerRef={mainRef} />
          {children}
        </div>
      </AppContextProvider>
    </>
  );
}
