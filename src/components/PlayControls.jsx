import { ButtonBar } from "#components/Utils";
import { GAMESTATUS, SEQUENCETYPE } from "#utils/constants";

import styles from "#styles/play.module.sass";

const PlayControls = ({ game, gameActions, wordActions }) => {
  const { prev, next, start, stop } = gameActions;
  const { rounds, words } = game;
  const isGallery =
    rounds.list[rounds.current]?.rules.sequenceType === SEQUENCETYPE.gallery;
  const withErrorStatus = rounds.list[rounds.current]?.rules.useErrorStatus;
  return (
    <div className={styles.controls}>
      <div className={styles.gameTitleContainer}>
        <div className={styles.gameTitle}>
          {rounds.list[rounds.current]?.title}
        </div>
        <div className={styles.gameIndex}>
          {rounds.current + 1}/{rounds.list.length}
        </div>
      </div>
      <ButtonBar
        size="m"
        className={styles.playControls}
        buttons={[
          {
            ico: "angle-left",
            title: "Precedente",
            disabled:
              words.isError ||
              rounds.current <= 0 ||
              game.status === GAMESTATUS.running,
            onClick: prev,
          },
          {
            ico: "stop",
            title: "Ferma",
            hidden: game.status !== GAMESTATUS.running,
            style: { width: "10%" },
            disabled: words.isError,
            onClick: stop,
          },
          {
            ico: "check",
            title: "Risposta esatta",
            hidden: game.status !== GAMESTATUS.running || isGallery,
            disabled: words.isError || words.current === null,
            style: { width: "25%" },
            onClick: wordActions.right,
          },
          {
            ico: "xmark",
            title: "Risposta sbagliata",
            hidden: game.status !== GAMESTATUS.running || isGallery,
            disabled: words.isError || words.current === null,
            style: { width: "25%" },
            onClick: () => wordActions.wrong(withErrorStatus),
          },
          {
            ico: "play",
            title: "Avvia",
            hidden: game.status !== GAMESTATUS.notRunning,
            style: { width: "60%" },
            disabled: words.isError,
            onClick: start,
          },
          {
            ico: "forward",
            title: "Successiva",
            hidden: !isGallery || game.status !== GAMESTATUS.running,
            style: { width: "60%" },
            disabled: words.isError,
            onClick: wordActions.next,
          },
          {
            ico: "angle-right",
            title: "Successivo",
            disabled:
              words.isError ||
              rounds.current >= rounds.list.length - 1 ||
              game.status === GAMESTATUS.running,
            onClick: next,
          },
        ]}
      />
    </div>
  );
};

export default PlayControls;
