import React from "react";

import HeaderActions from "#components/HeaderActions";
import styles from "#styles/header.module.sass";
import { SITE } from "#utils/constants";

const Header = () => {
  return (
    <>
      <header className={styles.main}>
        {SITE.title}
        <HeaderActions />
      </header>
    </>
  );
};

export default Header;
