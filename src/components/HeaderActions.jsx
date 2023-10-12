import ThemeToggler from "#components/ThemeToggler";
import NavbarToggler from "#components/NavbarToggler";
import styles from "#styles/header.module.sass";

const HeaderActions = ({ toggleNavbar }) => {
  return (
    <div className={styles.actions}>
      <NavbarToggler toggleNavbar={toggleNavbar} />
      <ThemeToggler />
    </div>
  );
};

export default HeaderActions;
