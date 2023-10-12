import React from "react";

import { GAMESTATUS } from "#utils/constants";

const defaultGames = {
  list: [],
  current: null,
  scores: [],
  index: 0,
  status: GAMESTATUS.notStarted,
};

const gamesReducer = (games, action) => {
  switch (action.type) {
    case "init":
      const { list, scores } = action;
      return { ...defaultGames, list, scores, current: list[0] };
    case "start":
      if (games.status === GAMESTATUS.notStarted)
        return { ...games, status: GAMESTATUS.running };
    case "stop":
      if (games.status !== GAMESTATUS.notStarted)
        return { ...games, status: GAMESTATUS.notStarted };
    case "next":
      if (games.index < games.list.length - 1)
        return {
          ...games,
          index: games.index + 1,
          current: games.list[games.index + 1],
        };
    case "prev":
      if (games.index > 0)
        return {
          ...games,
          index: games.index - 1,
          current: games.list[games.index - 1],
        };
  }
  return games;
};

const useGames = () => {
  const [games, dispatch] = React.useReducer(gamesReducer, defaultGames);
  const gameActions = {
    init: (list, scores) => dispatch({ type: "init", list, scores }),
    start: () => dispatch({ type: "start" }),
    stop: () => dispatch({ type: "stop" }),
    prev: () => dispatch({ type: "prev" }),
    next: () => dispatch({ type: "next" }),
  };

  return {
    games,
    gameActions,
  };
};
export default useGames;
