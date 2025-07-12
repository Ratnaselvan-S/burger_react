import React from "react";
import classess from "./Navigationitem.module.css";
import { NavLink } from "react-router-dom/cjs/react-router-dom.min";

const navigationitem = (props) => (
  <li className={classess.Navigation}>
    <NavLink to={props.links} exact activeClassName={classess.active}>{props.children}</NavLink>
  </li>
);

export default navigationitem;


