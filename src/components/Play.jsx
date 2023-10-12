import React from "react";

import useFetch, { getReq } from "#utils/useFetch";
import useGames from "#utils/useGames";
import { GAMESTATUS } from "#utils/constants";

import PlayControls from "#components/PlayControls";
import PlayBoard from "#components/PlayBoard";

const Play = () => {
  const { response: responseGet, doFetch: doGet } = useFetch();
  const { games, gameActions } = useGames();

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
      {games.list.length && <PlayControls {...{ games, gameActions }} />}
      {games.status === GAMESTATUS.running && (
        <PlayBoard game={games.current} scores={games.scores} />
      )}
    </>
  );
};

export default Play;
