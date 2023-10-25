import JSONdb from "simple-json-db";
import ShortUniqueId from "short-unique-id";

const jsonDB = new JSONdb(process.env.JSONDB_PATH, { jsonSpaces: 2 });
const uid = new ShortUniqueId();

const newItemBase = () => ({ id: uid() });
const db = (collection) => {
  const getCollection = () => jsonDB.get(collection);
  const setCollection = (...items) => jsonDB.set(collection, items);
  return {
    get: () => getCollection(),
    set: (...items) => setCollection(...items),
    add: (...items) => {
      setCollection(...getCollection(), ...items);
    },
    update: () => {},
    remove: (item) => {
      setCollection(...getCollection().filter((x) => x !== item));
    },
  };
};
export { db, newItemBase };
