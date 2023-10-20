import React from "react";

import { GAMESTATUS, SEQUENCETYPE } from "#utils/constants";

const defaultGame = {
  rounds: {
    list: [],
    current: 0,
  },
  status: GAMESTATUS.notRunning,
  scores: [],
  words: {
    list: [],
    current: null,
    isError: false,
  },
};

const gameReducer = (game, action) => {
  const isPlayAll = game.rounds.list[game.rounds.current]?.rules.playAll;
  const isGallery =
    game.rounds.list[game.rounds.current]?.rules.sequenceType ===
    SEQUENCETYPE.gallery;
  let isCompleting = false;

  switch (action.type) {
    case "init":
      const { list, scores } = action;
      return {
        ...defaultGame,
        rounds: { ...game.rounds, list, current: 0 },
        scores: scores.map((x) => ({ ...x, score: 0 })),
      };
    case "start":
      if (game.status === GAMESTATUS.notRunning)
        return {
          ...game,
          status: GAMESTATUS.running,
          words: { ...game.words, list: [], current: null },
        };
    case "stop":
      if (game.status !== GAMESTATUS.notRunning)
        return {
          ...game,
          status: GAMESTATUS.notRunning,
          words: { ...game.words, list: [], current: null },
        };
    case "next":
      if (game.rounds.current < game.rounds.list.length - 1)
        return {
          ...game,
          rounds: { ...game.rounds, current: game.rounds.current + 1 },
        };
    case "prev":
      if (game.rounds.current > 0)
        return {
          ...game,
          rounds: { ...game.rounds, current: game.rounds.current - 1 },
        };
    case "initWords":
      const { words } = action;
      return { ...game, words: { ...game.words, list: words } };
    case "setCurrentWord":
      const { current } = action;
      return {
        ...game,
        words: {
          ...game.words,
          list: game.words.list.map((w) => ({
            ...w,
            letters: w.full === current ? 1 : w.letters,
          })),
          current,
        },
      };
    case "setError":
      return {
        ...game,
        words: {
          ...game.words,
          isError: true,
        },
      };
    case "setNextWord":
      const newValue =
        (isNaN(game.words.current) ? 0 : Number(game.words.current)) + 1;
      isCompleting = isGallery && newValue === game.words.list.length - 1;
      return {
        ...game,
        status: isCompleting ? GAMESTATUS.notRunning : game.status,
        words: {
          ...game.words,
          current: isCompleting ? null : newValue,
        },
      };
    case "setRightAnswer":
      return {
        ...game,
        words: {
          ...game.words,
          list: game.words.list.map((w) => ({
            ...w,
            letters:
              w.full !== game.words.current && !isPlayAll ? w.letters : -1,
          })),
          current: null,
        },
      };
    case "setWrongAnswer":
      isCompleting = isPlayAll
        ? game.words.list[1].letters > 1
        : game.words.list.filter((x) => x.full === game.words.current)[0]
            .letters ===
          game.words.current.length - 1;
      return {
        ...game,
        words: {
          ...game.words,
          list: game.words.list.map((w, i) => ({
            ...w,
            letters:
              w.full !== game.words.current
                ? isPlayAll && w.letters >= 0
                  ? isCompleting
                    ? -1
                    : w.letters + 1
                  : w.letters
                : isCompleting
                ? -1
                : w.letters + 1,
          })),
          current: isCompleting ? null : game.words.current,
          isError: false,
        },
      };
    case "addScore":
      return {
        ...game,
        scores: [
          ...game.scores.map((x) => ({
            ...x,
            score: x.id === action.player ? x.score + 1 : x.score,
          })),
        ],
      };
    case "removeScore":
      return {
        ...game,
        scores: [
          ...game.scores.map((x) => ({
            ...x,
            score:
              x.id === action.player
                ? x.score > 0
                  ? x.score - 1
                  : 0
                : x.score,
          })),
        ],
      };
  }
  return game;
};

const useGame = () => {
  const [game, dispatch] = React.useReducer(gameReducer, defaultGame);
  const gameActions = {
    init: (list, scores) => dispatch({ type: "init", list, scores }),
    start: () => dispatch({ type: "start" }),
    stop: () => dispatch({ type: "stop" }),
    prev: () => dispatch({ type: "prev" }),
    next: () => dispatch({ type: "next" }),
  };
  const wordActions = {
    init: (words) => dispatch({ type: "initWords", words }),
    setCurrent: (current) => dispatch({ type: "setCurrentWord", current }),
    right: () => dispatch({ type: "setRightAnswer" }),
    wrong: (withErrorStatus) => {
      if (withErrorStatus) dispatch({ type: "setError" });
      window.setTimeout(
        () => dispatch({ type: "setWrongAnswer" }),
        withErrorStatus ? 1500 : 0,
      );
    },
    next: () => dispatch({ type: "setNextWord" }),
  };
  const scoreActions = {
    add: (player) => dispatch({ type: "addScore", player }),
    remove: (player) => dispatch({ type: "removeScore", player }),
  };

  return {
    game,
    gameActions,
    wordActions,
    scoreActions,
  };
};

export default useGame;
