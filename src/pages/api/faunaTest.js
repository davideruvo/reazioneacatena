import { createData } from "#server/data/faunaDB";

const handler = async (req, res) => {
  const response = await createData();
  switch (req.method) {
    case "GET":
      res.status(200).json(response);
      break;
    default:
      res.status(500).json({ result: false, error: "Invalid call" });
  }
};

export default handler;
