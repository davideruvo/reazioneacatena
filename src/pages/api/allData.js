import { dbJSON } from "#server/data/dataManager";

const handler = (req, res) => {
  switch (req.method) {
    case "GET":
      res.status(200).json(dbJSON());
      break;
    case "PUT":
      dbJSON(req.body);
      res.status(200).json({ result: true });
      break;
    default:
      res.status(500).json({ result: false, error: "Invalid call" });
  }
};

export default handler;
