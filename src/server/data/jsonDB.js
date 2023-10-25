import JSONdb from "simple-json-db";
import ShortUniqueId from "short-unique-id";

const jsonDB = new JSONdb(process.env.JSONDB_PATH, { jsonSpaces: 2 });
const uid = new ShortUniqueId();

const db = (collection) => {
  const getData = (where) => {
    const data = jsonDB.get(collection);
    if (!where) return data;
    return data.filter((x) =>
      Object.keys(where).every((k) => where[k] === x[k]),
    );
  };
  const setData = (...items) => jsonDB.set(collection, items);
  return {
    get: (where) => getData(where),
    add: (...items) => {
      setData(...getData(), ...items.map((x) => ({ id: uid(), ...x })));
    },
    update: (where, newItem) => {
      const toUpdate = getData(where);
      console.log("toUpdate", where, toUpdate);
      if (!toUpdate.length) return;
      setData(
        ...getData().map((x) =>
          toUpdate.filter((y) => x === y).length ? { ...x, ...newItem } : x,
        ),
      );
    },
    remove: (where) => {
      const toDelete = getData(where);
      if (!toDelete.length) return;
      setData(
        ...getData().filter((x) => !toDelete.filter((y) => x === y).length),
      );
    },
  };
};
export { db };
