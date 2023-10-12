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
        width: 4,
      },
    ],
    key: "id",
    title: "name",
    subTitle: "id",
    sort: "name",
    listView: ["name", "length", "visible"],
    detailView: ["name", "length", "visible"],
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
