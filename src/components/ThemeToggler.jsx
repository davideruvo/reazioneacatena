import React from "react";

import { Icon } from "#components/Utils";
import useFetch, { getReq, putReq } from "#utils/useFetch";

const ThemeToggler = () => {
  const { response: responseGet, doFetch: doGet } = useFetch();
  const { response: responsePut, doFetch: doPut } = useFetch();
  const useDarkTheme = responseGet
    ? responseGet.filter((x) => x.key === "useDarkTheme")[0]?.value
    : null;
  const [darkTheme, setDarkTheme] = React.useState(useDarkTheme);

  React.useEffect(() => doGet(getReq("/api/configuration/get")), []);
  React.useEffect(() => setDarkTheme(useDarkTheme), [useDarkTheme]);
  React.useEffect(() => {
    document.body.setAttribute("theme", darkTheme ? "dark" : "");
    if (darkTheme !== null)
      doPut(
        putReq("/api/configuration/useDarkTheme", {
          key: "useDarkTheme",
          value: darkTheme,
        }),
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
