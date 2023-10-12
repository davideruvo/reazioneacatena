import { Overlay } from "#components/Utils";
import styles from "#styles/loader.module.sass";

const Loader = () => {
  return (
    <Overlay style={{ zIndex: 100 }}>
      <span className={styles.main}></span>
    </Overlay>
  );
};

export default Loader;
