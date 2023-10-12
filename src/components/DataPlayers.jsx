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
        width: 9,
      },
    ],
    key: "id",
    title: "name",
    subTitle: "id",
    sort: "name",
    listView: ["color", "name"],
    detailView: ["color", "name"],
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
