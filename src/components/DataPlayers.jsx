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
        key: "color",
        des: null,
        type: "color",
        width: 1,
      },
      {
        key: "name",
        des: "Nome",
        type: "text",
        width: 8,
      },
      {
        key: "n",
        des: "N",
        type: "number",
        maxLength: 1,
        width: 1,
      },
    ],
    key: "id",
    title: "name",
    subTitle: "id",
    sort: "n",
    listView: ["color", "name", "n"],
    detailView: ["color", "name", "n"],
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
