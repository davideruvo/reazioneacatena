import DataManager from "#components/DataManager";

const DataPlayers = ({ offsetBottom }) => {
  const fields = {
    list: [
      {
        key: "id",
        des: "Id",
        type: "text",
      },
      {
        key: "name",
        des: "Nome",
        type: "text",
        width: 6,
      },
      {
        key: "color",
        des: null,
        type: "color",
        width: 1,
      },
      {
        key: "darkText",
        des: "Testo scuro",
        type: "bool",
        width: 1,
      },
      {
        key: "n",
        des: "N",
        type: "number",
        maxLength: 1,
        width: 2,
      },
    ],
    key: "id",
    title: "name",
    subTitle: "id",
    sort: "n",
    listView: ["color", "name", "n"],
    detailView: ["name", "color", "darkText", "n"],
  };

  return (
    <DataManager
      entityName="players"
      fields={fields}
      maxItems={2}
      offsetBottom={offsetBottom}
    />
  );
};

export default DataPlayers;
