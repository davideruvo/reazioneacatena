import configuration from "#server/data/configuration";

const handler = (req, res) => {
  switch (req.method) {
    case "GET":
      const data = { [req.query.key]: configuration.get()[req.query.key] };
      res.status(200).json(data);
      break;
    case "PUT":
      configuration.update(req.body);
      res.status(200).json({ result: true });
      break;
    default:
      res.status(500).json({ result: false, error: "Invalid call" });
  }
};

export default handler;
