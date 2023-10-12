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
        key: "length",
        des: "Lunghezza",
        type: "number",
        maxLength: 2,
        width: 2,
      },
      {
        key: "visible",
        des: "Visibili",
        type: "text",
        width: 2,
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
    listView: ["name", "length", "visible", "playAll"],
    detailView: ["name", "des", "length", "visible", "playAll"],
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
