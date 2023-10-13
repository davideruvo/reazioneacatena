import DataManager from "#components/DataManager";
import { SEQUENCETYPE } from "#utils/constants";

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
        width: 2,
      },
      {
        key: "des",
        des: "Descrizione",
        type: "longtext",
        optional: true,
        width: 5,
      },
      {
        key: "sequenceType",
        des: "Tipo",
        type: "list",
        width: 2,
        values: Object.assign(
          ...Object.keys(SEQUENCETYPE).map((k) => ({
            [SEQUENCETYPE[k]]: SEQUENCETYPE[k],
          })),
        ),
      },
      {
        key: "playAll",
        des: "Tutto insieme",
        type: "bool",
        width: 1,
      },
    ],
    key: "id",
    title: "name",
    subTitle: "id",
    sort: "name",
    listView: ["name", "des", "sequenceType", "playAll"],
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
