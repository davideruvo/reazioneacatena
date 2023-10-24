// import { Client, fql } from "fauna";

// const getClient = () => new Client({ secret: process.env.FAUNA_SECRET });

// const createData = async () => {
//   const client = getClient();
//   let result = false;
//   const dog = { name: "Scout" };
//   const documentQuery = fql`configuration.create(${dog})`;

//   const response = await client.query(documentQuery);
//   result = { result: true, data: response };
//   console.log("RESPONSE", response);
//   client.close();
//   return result;
// };
