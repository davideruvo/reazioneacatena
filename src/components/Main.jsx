import React from "react";
import ErrorHandler from "#components/ErrorHandler";
import DataRules from "#components/DataRules";
import DataPlayers from "#components/DataPlayers";
import Loader from "#components/Loader";
import Navbar from "#components/Navbar";
import DataGames from "#components/DataGames";
import Play from "#components/Play";
import styles from "#styles/main.module.sass";
import { useAppContext } from "#utils/appContext";
import { STATUS } from "#utils/constants";
import navbarData from "#utils/navbarData";

const Main = ({ containerRef, navbarVisible }) => {
  const {
    appContext: { status },
  } = useAppContext();
  const [navbarCurrent, setNavbarCurrent] = React.useState();
  const offsetBottom = parseInt(
    containerRef.current?.style.paddingBottom.replace("px", ""),
  );

  return (
    <>
      <Navbar
        data={navbarData}
        navbarCurrent={navbarCurrent}
        setNavbarCurrent={setNavbarCurrent}
        visible={navbarVisible}
      />
      {status === STATUS.loading && <Loader />}
      {status === STATUS.error && <ErrorHandler />}
      {navbarCurrent && (
        <main className={styles.main}>
          {navbarCurrent.cod == "games" && (
            <DataGames offsetBottom={offsetBottom} />
          )}
          {navbarCurrent.cod == "rules" && (
            <DataRules offsetBottom={offsetBottom} />
          )}
          {navbarCurrent.cod == "play" && <Play offsetBottom={offsetBottom} />}
          {navbarCurrent.cod == "players" && (
            <DataPlayers offsetBottom={offsetBottom} />
          )}
        </main>
      )}
    </>
  );
};

export default Main;
