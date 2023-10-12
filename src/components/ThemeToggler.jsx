import React from "react";

import { Icon } from "#components/Utils";
import useFetch, { getReq, putReq } from "#utils/useFetch";

const ThemeToggler = () => {
  const { response: responseGet, doFetch: doGet } = useFetch();
  const { response: responsePut, doFetch: doPut } = useFetch();
  const useDarkTheme = responseGet ? responseGet.useDarkTheme : null;
  const [darkTheme, setDarkTheme] = React.useState(useDarkTheme);

  React.useEffect(() => doGet(getReq("/api/configuration/useDarkTheme")), []);
  React.useEffect(() => setDarkTheme(useDarkTheme), [useDarkTheme]);
  React.useEffect(() => {
    document.body.setAttribute("theme", darkTheme ? "dark" : "");
    if (darkTheme !== null)
      doPut(
        putReq("/api/configuration/useDarkTheme", {
          useDarkTheme: darkTheme,
        })
      );
  }, [darkTheme]);

  return (
    <Icon
      ico={darkTheme ? "moon" : "sun"}
      onClick={() => setDarkTheme(!darkTheme)}
      title={`Tema ${darkTheme ? "scuro" : "chiaro"}`}
    />
  );
};

export default ThemeToggler;
