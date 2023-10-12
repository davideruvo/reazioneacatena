import { getByName } from "#server/data/dataModel";

const handler = (req, res) => {
  const entity = getByName(req.query.entity);
  if (entity === null)
    res.status(500).json({ result: false, error: "Invalid call" });
  switch (req.method) {
    case "GET":
      res.status(200).json(entity.getByKey(req.query.id));
      break;
    case "PUT":
      entity.setItem(req.body);
      res.status(200).json({ result: true });
      break;
    case "DELETE":
      debugger;
      const toDelete = entity.getByKey(req.query.id);
      if (toDelete) {
        entity.remove(toDelete);
        res.status(200).json({ result: true });
      } else {
        res.status(404).json({ result: false, error: "Not found" });
      }
      break;
    default:
      res.status(500).json({ result: false, error: "Invalid call" });
  }
};

export default handler;
