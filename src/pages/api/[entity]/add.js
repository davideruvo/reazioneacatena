import { getByName } from "#server/data/dataManager";

const handler = async (req, res) => {
  const entity = getByName(req.query.entity);
  if (entity === null)
    res.status(500).json({ result: false, error: "Invalid call" });
  switch (req.method) {
    case "POST":
      if (entity.addAsync) {
        await entity
          .addAsync(entity.newItem(req.body))
          .then((r) => res.status(200).json({ result: true }));
      } else {
        entity.add(entity.newItem(req.body));
        res.status(200).json({ result: true });
      }
      break;
    default:
      res.status(500).json({ result: false, error: "Invalid call" });
  }
};

export default handler;
