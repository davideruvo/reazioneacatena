import React from "react";

import HeaderActions from "#components/HeaderActions";
import styles from "#styles/header.module.sass";
import { SITE } from "#utils/constants";

const Header = ({ toggleNavbar }) => {
  return (
    <>
      <header className={styles.main}>
        <HeaderActions toggleNavbar={toggleNavbar} />
      </header>
    </>
  );
};

export default Header;
