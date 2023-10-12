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
  fnNew: ({ name, des, length, visible, playAll }) => ({
    id: uid(),
    name: name ?? "",
    des: des ?? "",
    length: length ?? 0,
    visible: visible ?? "",
    playAll: playAll ?? false,
  }),
});

const games = new collection({
  key: "games",
  fnNew: ({ title, n, words, ruleName }) => ({
    id: uid(),
    title: title ?? "",
    n: n ?? 0,
    words: words ?? "",
    ruleName: ruleName ?? "",
  }),
  fnGetLookups: (x) => ({
    rule: rules.findBy({ name: x.ruleName }),
  }),
});
