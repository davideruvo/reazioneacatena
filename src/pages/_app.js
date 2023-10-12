import React from "react";

import "#styles/fontawesome/css/all.min.css";
import "#styles/global.sass";

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
