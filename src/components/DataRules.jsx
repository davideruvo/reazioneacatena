import DataManager from "#components/DataManager";

const DataRules = ({ offsetBottom }) => {
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
        width: 4,
      },
      {
        key: "des",
        des: "Descrizione",
        type: "longtext",
        optional: true,
      },
      {
        key: "sequenceType",
        des: "Tipo",
        type: "list",
        width: 4,
        values: { empty: "Vuoto", alternate: "Alternato" },
      },
      {
        key: "playAll",
        des: "Tutto insieme",
        type: "bool",
        width: 2,
      },
    ],
    key: "id",
    title: "name",
    subTitle: "id",
    sort: "name",
    listView: ["name", "sequenceType", "playAll"],
    detailView: ["name", "des", "sequenceType", "playAll"],
  };

  return (
    <DataManager
      entityName="rules"
      fields={fields}
      offsetBottom={offsetBottom}
    />
  );
};

export default DataRules;
