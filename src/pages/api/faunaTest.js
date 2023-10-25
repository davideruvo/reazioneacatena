import { collection } from "#server/data/faunaDB";

const handler = (req, res) => {
  const db = collection("players");
  const response = db.get();
  switch (req.method) {
    case "GET":
      response.then((r) => res.status(200).json(r));
      break;
    default:
      res.status(500).json({ result: false, error: "Invalid call" });
  }
};

export default handler;
