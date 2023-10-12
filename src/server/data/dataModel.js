import ShortUniqueId from "short-unique-id";

const uid = new ShortUniqueId();

import { collection } from "#server/data/dataManager";

export const getByName = (key) => {
  switch (key) {
    case "players":
      return players;
    case "rules":
      return rules;
    case "games":
      return games;
    default:
      return null;
  }
};

const players = new collection({
  key: "players",
  fnNew: ({ name, color, n }) => ({
    id: uid(),
    name: name ?? "",
    color: color ?? "",
    n: n ?? 0,
  }),
});

const rules = new collection({
  key: "rules",
  fnNew: ({ name, des, sequenceType, playAll }) => ({
    id: uid(),
    name: name ?? "",
    des: des ?? "",
    sequenceType: sequenceType ?? "",
    playAll: playAll ?? false,
  }),
});

const games = new collection({
  key: "games",
  fnNew: ({ title, n, words, gameType }) => ({
    id: uid(),
    title: title ?? "",
    n: n ?? 0,
    words: words ?? "",
    gameType: gameType ?? "",
  }),
  fnGetLookups: (x) => ({
    rules: rules.findBy({ name: x.gameType }),
  }),
});
