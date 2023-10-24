import JSONdb from "simple-json-db";
import ShortUniqueId from "short-unique-id";

const db = new JSONdb(process.env.JSONDB_PATH, { jsonSpaces: 2 });
const uid = new ShortUniqueId();

const newItem = () => ({ id: uid() });

export default db;
export { newItem };
