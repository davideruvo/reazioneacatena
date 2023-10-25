import { getByName, isAsync } from "#server/data/dataManager";

const handler = (req, res) => {
  const entity = getByName(req.query.entity);
  if (entity === null)
    res.status(500).json({ result: false, error: "Invalid call" });
  switch (req.method) {
    case "POST":
      entity.add(entity.newItem(req.body));
      res.status(200).json({ result: true });
      break;
    default:
      res.status(500).json({ result: false, error: "Invalid call" });
  }
};

export default handler;
