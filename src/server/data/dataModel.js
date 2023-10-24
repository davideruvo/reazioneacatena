import { collection } from "#server/data/dataManager";

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
  key: "players",
  fnNew: ({ name, color, darkText, n }) => ({
    name: name ?? "",
    color: color ?? "",
    darkText: darkText ?? "",
    n: n ?? 0,
  }),
});

const rules = new collection({
  key: "rules",
  fnNew: ({ name, des, sequenceType, playAll, useErrorStatus }) => ({
    name: name ?? "",
    des: des ?? "",
    sequenceType: sequenceType ?? "",
    playAll: playAll ?? false,
    useErrorStatus: useErrorStatus ?? false,
  }),
});

const games = new collection({
  key: "games",
  fnNew: ({ title, n, words, gameType }) => ({
    title: title ?? "",
    n: n ?? 0,
    words: words ?? "",
    gameType: gameType ?? "",
  }),
  fnGetLookups: (x) => ({
    rules: rules.findBy({ name: x.gameType }),
  }),
});

const configuration = new collection({
  key: "configuration",
  keyField: "key",
  fnNew: ({ key, value }) => ({
    key: key ?? "",
    value: value ?? null,
  }),
});
