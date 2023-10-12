import React from "react";

import { Icon } from "#components/Utils";

const NavbarToggler = ({ toggleNavbar }) => {
  return <Icon ico="table-list" onClick={toggleNavbar} title={"Menu"} />;
};

export default NavbarToggler;
