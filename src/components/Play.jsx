import React from "react";
import useFetch, { getReq } from "#utils/useFetch";

import { ButtonBar } from "#components/Utils";
import Scores from "#components/Scores";

const Play = ({ offsetBottom }) => {
  const { response: responseGet, doFetch: doGet } = useFetch();
  const [games, setGames] = React.useState(null);
  const [gameIndex, setGameIndex] = React.useState(0);
  React.useEffect(() => {
    doGet(getReq(`/api/games/get`, { sort: "n", lookup: true }));
  }, []);
  React.useEffect(() => {
    if (responseGet) {
      setGames(responseGet);
    }
  }, [responseGet]);
  React.useEffect(() => {
    if (games) setGameIndex(0);
  }, [games]);
  return (
    <>
      {/* <Scores /> */}
      {games && games.length && (
        <GameControls
          games={games}
          gameIndex={gameIndex}
          setGameIndex={setGameIndex}
        />
      )}
      {/* {games && games.length && <GamePlay game={games[gameIndex]} />} */}
    </>
  );
};
const GameControls = ({ games, gameIndex, setGameIndex }) => {
  const changeGame = (i) => {
    if (i < 0) return;
    if (i >= games.length) return;
    setGameIndex(i);
  };
  const handlePrev = () => changeGame(gameIndex - 1);
  const handleReset = null;
  const handlePlay = null;
  const handleNext = () => changeGame(gameIndex + 1);
  return (
    <>
      <h2>
        {gameIndex + 1}  {games[gameIndex].title}
      </h2>
      <ButtonBar
        size="m"
        buttons={[
          {
            ico: "angle-left",
            title: "Precedente",
            disabled: gameIndex <= 0,
            onClick: handlePrev,
          },
          {
            ico: "rotate-left",
            title: "Azzera",
            onClick: handleReset,
          },
          {
            ico: "play",
            title: "Avvia",
            onClick: handlePlay,
          },
          {
            ico: "angle-right",
            title: "Successivo",
            disabled: gameIndex >= games.length - 1,
            onClick: handleNext,
          },
          {
            ico: "floppy-disk",
            style: { width: "50%" },
            title: "Salva",
            hidden: true,
            disabled: false /*detail.errors.length > 0,*/,
            onClick: null /*() => handleSave(detail.values)*/,
          },
          {
            ico: "trash-can",
            hidden: true,
            title: "Elimina",
            onClick: null /*() => {
            setConfirm({
              text: `Vuoi eliminare l'elemento${
                fields.title ? ` "${data[fields.title]}"` : ""
              }?`,
              action: () => handleDelete(detail.values),
              cancel: () => setConfirm(null),
            });
          }*/,
          },
        ]}
      />
    </>
  );
};
const GamePlay = ({ game }) => {
  return <div key={game.id}>GameBoard</div>;
};

export default Play;
