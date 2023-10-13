import React from "react";

import PlayWord from "#components/PlayWord";
import { SEQUENCETYPE } from "#utils/constants";

import styles from "#styles/play.module.sass";

const PlayBoard = ({ game, wordActions }) => {
  const { rounds, words } = game;
  const {
    rules: { sequenceType, playAll },
    words: roundWords,
  } = rounds.list[rounds.current];
  const isGallery = sequenceType === SEQUENCETYPE.gallery;

  const wordIsComplete = (w) => w.letters < 0 || w.letters === w.full.length;
  const getStartingLetters = (i, n) => {
    switch (sequenceType) {
      case SEQUENCETYPE.empty:
        return i === 0 || i === n - 1 ? -1 : playAll ? 1 : 0;
      case SEQUENCETYPE.alternate:
        return i % 2 ? (playAll ? 1 : 0) : -1;
      case SEQUENCETYPE.gallery:
        return -1;
    }
    return i % 2 ? 1 : -1;
  };
  const wordClasses = {
    [SEQUENCETYPE.empty]: styles.wordSequence,
    [SEQUENCETYPE.alternate]: styles.wordChain,
    [SEQUENCETYPE.gallery]: styles.wordGallery,
  };

  React.useEffect(() => {
    wordActions.init(
      roundWords.split("\n").map((w, i) => ({
        full: w.trim().toUpperCase(),
        letters: getStartingLetters(i, roundWords.split("\n").length),
      })),
    );
  }, []);

  React.useEffect(() => {
    if (playAll) wordActions.setCurrent("");
    else if (isGallery) wordActions.setCurrent(0);
  }, []);

  const handleActivateWord = (word) => {
    if (playAll || isGallery || words.current !== null) return;
    wordActions.setCurrent(word);
  };
  return (
    <div className={styles.gameBoardContainer}>
      <div
        className={styles.gameBoard}
        style={isGallery ? { marginTop: 40 } : null}
      >
        {isGallery && words.list.length
          ? words.current !== null && (
              <PlayWord
                word={words.list[words.current]}
                wordClass={wordClasses[sequenceType]}
              />
            )
          : words.list.map((w, i) => (
              <PlayWord
                key={i}
                word={w}
                wordClass={`${
                  wordIsComplete(w)
                    ? styles.wordComplete
                    : wordClasses[sequenceType]
                } ${words.current === w.full ? styles.wordCurrent : ""}`}
                handleClick={wordIsComplete(w) ? null : handleActivateWord}
              />
            ))}
      </div>
    </div>
  );
};

export default PlayBoard;
