import JSONdb from "simple-json-db";
import ShortUniqueId from "short-unique-id";
import { compare } from "#server/data/dataUtils";

const jsonDB = new JSONdb(process.env.JSONDB_PATH, { jsonSpaces: 2 });
const uid = new ShortUniqueId();

const ISASYNC = false;

const dbCollection = (name) => {
  const getData = (where) => {
    const data = jsonDB.get(name);
    if (!where) return data;
    return data.filter((x) =>
      Object.keys(where).every((k) => where[k] === x[k]),
    );
  };
  const setData = (...items) => jsonDB.set(name, items);
  return {
    get: (where) => getData(where),
    add: (...items) => {
      setData(...getData(), ...items.map((x) => ({ id: uid(), ...x })));
    },
    update: (where, newItem) => {
      const toUpdate = getData(where);
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

const collection = function ({ name, keyFieldName, fnNew, fnGetLookups }) {
  const self = this;

  const db = dbCollection(name);
  const keyField = keyFieldName ?? "id";

  self.newItem = fnNew;
  self.getLookups = fnGetLookups;

  self.get = (options) => {
    let result = db.get();
    const { sort, lookup } = options ?? {};
    if (lookup && typeof self.getLookups === "function")
      result = db.get().map((x) => ({ ...x, ...self.getLookups(x) }));
    if (sort) result = result.sort((a, b) => compare(a, b, sort));
    return result;
  };
  self.getByKey = (k) => {
    return self.query({ [keyField]: k })[0];
  };
  self.query = (where) => db.get(where);
  self.add = (...items) => {
    db.add(...items);
  };
  self.update = (newItem) => {
    db.update({ [keyField]: newItem[keyField] }, newItem);
  };
  self.addOrUpdate = (newItem) => {
    self.query({ [keyField]: newItem[keyField] }).length
      ? self.update(newItem)
      : self.add(newItem);
  };
  self.remove = (item) => db.remove(item);

  return self;
};

export { collection, ISASYNC };
