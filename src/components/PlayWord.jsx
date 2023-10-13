import { Button } from "#components/Utils";

import styles from "#styles/play.module.sass";

const PlayWord = ({ word, wordClass, handleClick }) => {
  const { full, letters } = word;
  return (
    <>
      <div
        className={`${styles.word} ${wordClass}`}
        onClick={handleClick ? () => handleClick(full) : null}
      >
        {letters < 0 ? full : full.slice(0, letters)}
      </div>
    </>
  );
};

export default PlayWord;
