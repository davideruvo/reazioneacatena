import { getByName } from "#server/data/dataModel";

const handler = (req, res) => {
  const entity = getByName(req.query.entity);
  if (entity === null)
    res.status(500).json({ result: false, error: "Invalid call" });
  switch (req.method) {
    case "GET":
      const { sort, nolookup } = req.query;
      res.status(200).json(entity.get({ sort, nolookup }));
      break;
    default:
      res.status(500).json({ result: false, error: "Invalid call" });
  }
};
export default handler;
