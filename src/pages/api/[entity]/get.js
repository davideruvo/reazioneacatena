import { getByName, isAsync } from "#server/data/dataManager";

const handler = (req, res) => {
  const entity = getByName(req.query.entity);
  if (entity === null)
    res.status(500).json({ result: false, error: "Invalid call" });
  switch (req.method) {
    case "GET":
      const { sort, lookup } = req.query;
      if (isAsync) res.status(200).json(entity.get({ sort, lookup }));
      else res.status(200).json(entity.get({ sort, lookup }));
      break;
    default:
      res.status(500).json({ result: false, error: "Invalid call" });
  }
};
export default handler;
