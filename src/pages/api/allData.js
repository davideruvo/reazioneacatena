import { dbData } from "#server/data/dataManager";

const handler = (req, res) => {
  switch (req.method) {
    case "GET":
      res.status(200).json(dbData());
      break;
    case "PUT":
      dbData(req.body);
      res.status(200).json({ result: true });
      break;
    default:
      res.status(500).json({ result: false, error: "Invalid call" });
  }
};

export default handler;
