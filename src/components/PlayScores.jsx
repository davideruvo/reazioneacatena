import { Button } from "#components/Utils";

import styles from "#styles/scores.module.sass";

const Scores = ({ scores, scoreActions }) => {
  const textColor = (dark) => (dark ? "#000" : "#fff");
  return (
    <div className={styles.container}>
      {scores.map((p) => (
        <div
          className={styles.item}
          style={{
            backgroundColor: p.color,
            borderColor: p.color,
            color: textColor(p.darkText),
          }}
          key={p.id}
        >
          {p.name}
          <div className={styles.scoreControls}>
            <Button
              title="-1"
              ico="minus"
              size="l"
              style={{
                backgroundColor: p.color,
                borderColor: p.color,
                color: textColor(p.darkText),
                borderWidth: 2,
              }}
              onClick={() => scoreActions.remove(p.id)}
            />
            <div
              className={styles.scoreValue}
              style={{
                borderColor: p.color,
                color: textColor(p.darkText),
              }}
            >
              {p.score}
            </div>
            <Button
              title="+1"
              ico="plus"
              size="l"
              style={{
                backgroundColor: p.color,
                borderColor: p.color,
                borderWidth: 2,
                color: textColor(p.darkText),
              }}
              onClick={() => scoreActions.add(p.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Scores;
