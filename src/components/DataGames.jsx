import DataManager from "#components/DataManager";

const DataGames = ({ offsetBottom }) => {
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
        maxlength: 1,
      },
      {
        key: "ruleName",
        des: "Regole",
        type: "text",
        width: 4,
      },
      {
        key: "words",
        des: "Parole",
        type: "longtext",
      },
    ],
    key: "id",
    title: "title",
    subTitle: "ruleName",
    sort: "n",
    listView: ["title", "ruleName", "n"],
    detailView: ["title", "n", "ruleName", "words"],
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
