import { ButtonBar } from "#components/Utils";
import { GAMESTATUS } from "#utils/constants";

import styles from "#styles/play.module.sass";

const PlayControls = ({ games, gameActions }) => {
  const { prev, next, start, stop } = gameActions;
  return (
    <div className={styles.controls}>
      <div className={styles.gameTitle}>
        <div>{games.current?.title}</div>
        <div>
          {games.index + 1}/{games.list.length}
        </div>
      </div>
      <ButtonBar
        size="m"
        buttons={[
          {
            ico: "angle-left",
            title: "Precedente",
            disabled: games.index <= 0 || games.status === GAMESTATUS.running,
            onClick: prev,
          },
          {
            ico: "stop",
            title: "Ferma",
            hidden: games.status === GAMESTATUS.notStarted,
            style: { width: "60%" },
            onClick: stop,
          },
          {
            ico: "play",
            title: "Avvia",
            hidden: games.status !== GAMESTATUS.notStarted,
            style: { width: "60%" },
            onClick: start,
          },
          {
            ico: "angle-right",
            title: "Successivo",
            disabled:
              games.index >= games.list.length - 1 ||
              games.status === GAMESTATUS.running,
            onClick: next,
          },
        ]}
      />
    </div>
  );
};

export default PlayControls;
