import { jsonCollection, jsonDataObject, jsonData } from "#server/data/jsonDB";
import {
  faunaCollection,
  faunaDataObject,
  faunaData,
} from "#server/data/faunaDB";
const collection =
  process.env.DB_SOURCE === "json"
    ? jsonCollection
    : process.env.DB_SOURCE === "fauna"
    ? faunaCollection
    : null;
const dataObject =
  process.env.DB_SOURCE === "json"
    ? jsonDataObject
    : process.env.DB_SOURCE === "fauna"
    ? faunaDataObject
    : null;
const dbData =
  process.env.DB_SOURCE === "json"
    ? jsonData
    : process.env.DB_SOURCE === "fauna"
    ? faunaData
    : null;
export { collection, dataObject, dbData };
