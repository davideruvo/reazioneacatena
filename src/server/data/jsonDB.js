import JSONdb from "simple-json-db";
import ShortUniqueId from "short-unique-id";

const jsonDB = new JSONdb(process.env.JSONDB_PATH, { jsonSpaces: 2 });
const uid = new ShortUniqueId();

const newItemBase = () => ({ id: uid() });
const _get = (key) => jsonDB.get(key);
const _set = (key, items) => jsonDB.set(key, items);
const db = {
  get: _get,
  set: _set,
  add: (key,...items) => {
    _set(key, [_get(key), ...items]);
    return items.map((x) => self.getKey(x));
  },
  update: () => {},
  remove: () => {},
};
export { db, newItemBase };

//get
//set
//  add
//  remove
//  update
