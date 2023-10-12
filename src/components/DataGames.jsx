import React from "react";

import DataManager from "#components/DataManager";
import useFetch, { getReq } from "#utils/useFetch";

const DataGames = ({ offsetBottom }) => {
  const { response: responseGet, doFetch: doGet } = useFetch();
  const [rules, setRules] = React.useState({});
  React.useEffect(() => {
    doGet(getReq(`/api/rules/get`, { sort: "name" }));
  }, []);
  React.useEffect(() => {
    if (responseGet) {
      setRules(
        Object.assign({}, ...responseGet.map((x) => ({ [x.name]: x.name }))),
      );
    }
  }, [responseGet]);

  const fields = {
    list: [
      {
        key: "id",
        des: "Id",
        type: "text",
      },
      {
        key: "title",
        des: "Titolo",
        type: "text",
        width: 5,
      },
      {
        key: "n",
        des: "N",
        type: "number",
        maxLength: 1,
      },
      {
        key: "gameType",
        des: "Tipo",
        type: "list",
        width: 4,
        list: rules,
      },
      {
        key: "words",
        des: "Parole",
        type: "longtext",
      },
    ],
    key: "id",
    title: "title",
    subTitle: "gameType",
    sort: "n",
    listView: ["title", "gameType", "n"],
    detailView: ["title", "n", "gameType", "words"],
  };

  return (
    <DataManager
      entityName="games"
      fields={fields}
      offsetBottom={offsetBottom}
    />
  );
};

export default DataGames;
