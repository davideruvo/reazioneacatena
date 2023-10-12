import ThemeToggler from "#components/ThemeToggler";
import styles from "#styles/header.module.sass";

const HeaderActions = () => {
  return (
    <div className={styles.actions}>
      <ThemeToggler />
    </div>
  );
};

export default HeaderActions;
