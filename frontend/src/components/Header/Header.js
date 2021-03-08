import React from "react";

import classes from "./Header.module.css";
import Navigation from "./Navigation/Navigation";

const Header = (props) => {
  return (
    <div className={classes.Header}>
      <div style={{ width: "15%" }}/>
      <div style={{ width: "35%" }} />
      <Navigation loggedIn={props.loggedIn}/>
    </div>
  );
};

export default Header;
