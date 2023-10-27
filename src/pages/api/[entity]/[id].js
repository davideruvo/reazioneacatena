import { getByName } from "#server/data/dataManager";

const handler = async (req, res) => {
  const entity = getByName(req.query.entity);
  if (entity === null)
    res.status(500).json({ result: false, error: "Invalid call" });
  switch (req.method) {
    case "GET":
      if (entity.getByKeyAsync)
        await entity
          .getByKeyAsync(req.query.id)
          .then((r) => res.status(200).json(r));
      else res.status(200).json(entity.getByKey(req.query.id));
      break;
    case "PUT":
      if (entity.addOrUpdateAsync) {
        await entity
          .addOrUpdateAsync(req.body)
          .then((r) => res.status(200).json({ result: true }));
      } else {
        entity.addOrUpdate(req.body);
        res.status(200).json({ result: true });
      }
      break;
    case "DELETE":
      if (entity.deleteAsync) {
        await entity
          .deleteAsync(req.query.id)
          .then((r) => res.status(200).json({ result: true }));
      } else {
        entity.delete(req.query.id);
        res.status(200).json({ result: true });
      }
      break;
    default:
      res.status(500).json({ result: false, error: "Invalid call" });
  }
};

export default handler;
