// const getProviderModule = () => {
//   switch (process.env.DB_SOURCE) {
//     case "fauna":
//       return "faunaDB";
//     case "json":
//       return "jsonDB";
//     default:
//       return "jsonDB";
//   }
// };
// const { collection: dbCollection } = await import(
//   `#server/data/${getProviderModule()}`
// );

import { collection, ISASYNC } from "#server/data/jsonDataProvider";

export const isAsync = ISASYNC;

export const getByName = (key) => {
  switch (key) {
    case "players":
      return players;
    case "rules":
      return rules;
    case "games":
      return games;
    case "configuration":
      return configuration;
    default:
      return null;
  }
};

const players = new collection({
  name: "players",
  fnNew: ({ name, color, darkText, n }) => ({
    name: name ?? "",
    color: color ?? "",
    darkText: darkText ?? false,
    n: n ?? 0,
  }),
});

const rules = new collection({
  name: "rules",
  fnNew: ({ name, des, sequenceType, playAll, useErrorStatus }) => ({
    name: name ?? "",
    des: des ?? "",
    sequenceType: sequenceType ?? "",
    playAll: playAll ?? false,
    useErrorStatus: useErrorStatus ?? false,
  }),
});

const games = new collection({
  name: "games",
  fnNew: ({ title, n, words, gameType }) => ({
    title: title ?? "",
    n: n ?? 0,
    words: words ?? "",
    gameType: gameType ?? "",
  }),
  fnGetLookups: (x) => ({
    rules: rules.query({ name: x.gameType })[0],
  }),
});

const configuration = new collection({
  name: "configuration",
  keyFieldName: "key",
  fnNew: ({ key, value }) => ({
    key: key ?? "",
    value: value ?? null,
  }),
});
