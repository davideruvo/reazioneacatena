import { Client, fql } from "fauna";

const getClient = () => new Client({ secret: process.env.FAUNA_SECRET });

const collection = (name) => {
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
    get: async (where) => {
      const query = where
        ? fql`Collection(${name}).where((x) =>
        Object.keys(${where}).every((k) => ${where}[k] == x[k]))`
        : fql`Collection(${name}).all()`;
      const data = await run(query);
      return data[0]?.data?.data ?? null;
    },
    add: async (...items) => {
      const queries = [];
      for (const x of items) {
        queries.push(fql`Collection(${name}).create(${x})`);
      }
      const data = await run(...queries);
      return data?.map((x) => x.data) ?? null;
    },
    update: async (where, newItem) => {
      const query = fql`Collection(${name}).firstWhere((x) =>
      Object.keys(${where}).every((k) => ${where}[k] == x[k])).update(${newItem})`;
      const data = await run(query);
      return data[0]?.data ?? null;
    },
    remove: async (where) => {
      const query = fql`Collection(${name}).firstWhere((x) =>
      Object.keys(${where}).every((k) => ${where}[k] == x[k])).delete()`;
      const data = await run(query);
      return data[0]?.data ?? null;
    },
  };
};
export { collection };
