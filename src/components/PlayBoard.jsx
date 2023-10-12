import React from "react";

import PlayScores from "#components/PlayScores";
import styles from "#styles/play.module.sass";

const PlayBoard = ({ game, scores }) => {
  return (
    <>
      <PlayScores scores={scores} />
      <div className={styles.gameBoard}>
        {game.words.split("\n").map((w, i) => (
          <div key={i} className={styles.word}>
            {w}
          </div>
        ))}
      </div>
    </>
  );
};

export default PlayBoard;
