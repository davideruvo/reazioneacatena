import { Client, fql } from "fauna";
import { compare } from "#server/data/dataUtils";

const getClient = () => new Client({ secret: process.env.FAUNA_SECRET });
const clean = (item) => {
  const reservedFields = ["id", "coll", "ts"];
  reservedFields.forEach((f) => delete item[f]);
  return item;
};

const dbCollection = (name) => {
  const run = async (...queries) => {
    const client = getClient();
    let response = [];
    try {
      response = await Promise.all(queries.map((q) => client.query(q)));
    } catch (error) {
      console.error("Error in faunaDB Provider", error);
    } finally {
      client.close();
      return response;
    }
  };

  return {
    getAsync: async (where) => {
      const query = where
        ? fql`Collection(${name}).where((x) =>
          Object.keys(${where}).every((k) => ${where}[k] == x[k]))`
        : fql`Collection(${name}).all()`;
      const data = await run(query);
      return data[0]?.data?.data ?? null;
    },
    addAsync: async (...items) => {
      const queries = [];
      for (const x of items)
        queries.push(fql`Collection(${name}).create(${clean(x)})`);
      const data = await run(...queries);
      return data?.map((x) => x.data) ?? null;
    },
    updateAsync: async (where, newItem) => {
      const query = fql`Collection(${name}).firstWhere((x) =>
        Object.keys(${where}).every((k) => ${where}[k] == x[k])).update(${clean(
          newItem,
        )})`;
      const data = await run(query);
      return data[0]?.data ?? null;
    },
    deleteAsync: async (where) => {
      const query = fql`Collection(${name}).firstWhere((x) =>
        Object.keys(${where}).every((k) => ${where}[k] == x[k])).delete()`;
      const data = await run(query);
      return data[0]?.data ?? null;
    },
  };
};

const collection = function ({ name, keyFieldName, fnNew, fnGetLookupsAsync }) {
  const self = this;

  const db = dbCollection(name);
  const keyField = keyFieldName ?? "id";

  self.newItem = fnNew;
  self.getLookupsAsync = fnGetLookupsAsync;

  self.getAsync = async (options) => {
    let result = await db.getAsync();
    const { sort, lookup } = options ?? {};
    if (lookup && typeof self.getLookupsAsync === "function") {
      for (const x of result) {
        const objLookup = await fnGetLookupsAsync(x);
        Object.assign(x, objLookup);
      }
    }
    if (sort) result = result.sort((a, b) => compare(a, b, sort));
    return result;
  };
  self.getByKeyAsync = async (k) => {
    return await self.queryAsync({ [keyField]: k })[0];
  };
  self.queryAsync = async (where) => await db.getAsync(where);
  self.addAsync = async (...items) => {
    await db.addAsync(...items);
  };
  self.updateAsync = async (newItem) => {
    await db.updateAsync({ [keyField]: newItem[keyField] }, newItem);
  };
  self.addOrUpdateAsync = async (newItem) => {
    const exists =
      (await self.queryAsync({ [keyField]: newItem[keyField] })).length > 0;
    exists ? await self.updateAsync(newItem) : await self.addAsync(newItem);
  };
  self.deleteAsync = async (key) => {
    await db.deleteAsync({ [keyField]: key });
  };

  return self;
};

export { collection };
