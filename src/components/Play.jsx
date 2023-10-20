import React from "react";

import useFetch, { getReq } from "#utils/useFetch";
import useGame from "#utils/useGame";
import { GAMESTATUS } from "#utils/constants";

import PlayScores from "#components/PlayScores";
import PlayControls from "#components/PlayControls";
import PlayBoard from "#components/PlayBoard";

const Play = () => {
  const { response: responseGet, doFetch: doGet } = useFetch();
  const { game, gameActions, wordActions, scoreActions } = useGame();
  const { rounds } = game;

  React.useEffect(() => {
    doGet(
      getReq(`/api/games/get`, { sort: "n", lookup: true }),
      getReq(`/api/players/get`, { sort: "n" }),
    );
  }, []);
  React.useEffect(() => {
    if (responseGet) gameActions.init(...responseGet);
  }, [responseGet]);
  return (
    <>
      {rounds.list.length > 0 && (
        <PlayControls {...{ game, gameActions, wordActions }} />
      )}
      <PlayScores scores={game.scores} scoreActions={scoreActions} />
      {game.status === GAMESTATUS.running && (
        <PlayBoard {...{ game, wordActions }} />
      )}
    </>
  );
};

export default Play;
