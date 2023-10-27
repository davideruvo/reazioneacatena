import React from "react";

import { Icon } from "#components/Utils";
import styles from "#styles/navbar.module.sass";

const Navbar = ({
  data,
  navbarCurrent,
  setNavbarCurrent,
  visible,
  className,
}) => {
  React.useEffect(() => {
    setNavbarCurrent(data.filter((x) => x.cod === "play")[0]);
  }, []);

  return (
    visible && (
      <header className={`${styles.container} ${className}`}>
        <div className={styles.main}>
          <ul>
            {data.map((item, i) => (
              <NavbarItem
                key={i}
                item={item}
                current={navbarCurrent}
                setCurrent={setNavbarCurrent}
              />
            ))}
            <div className={styles.indicator}></div>
          </ul>
        </div>
      </header>
    )
  );
};

const NavbarItem = ({ item, current, setCurrent }) => {
  const handleClick = () => {
    setCurrent(item);
  };
  return (
    <>
      <li className={`${item.cod == current?.cod ? styles.active : ""}`}>
        <a onClick={handleClick} title={item.des}>
          <span className={styles.icon}>
            <Icon ico={item.ico} />
          </span>
          <span className={styles.text}>{item.des}</span>
        </a>
      </li>
    </>
  );
};
export default Navbar;
