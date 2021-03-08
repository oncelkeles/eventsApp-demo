import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Dropdown, Menu, message } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import setLoggedOut from "../../../utils/setLoggedOut";
import classes from "./Navigation.module.css";
import services from "../../../utils/services";

const Navigation = (props) => {
  const [rerender, setRerender] = useState(false);
  const history = useHistory();

  const navigateRoute = (route) => {
    history.push(route);
  };

  const userLogout = async () => {
    try {
      const res = await services.get("/users/logout");
      setLoggedOut();
      setRerender(!rerender);
      message.success("Logged out successfully!");
      navigateRoute("/");
    } catch (err) {
      message.error("Could not logout!");
    }
  };

  const menu = (
    <Menu>
      <Menu.Item
        key="1"
        icon={<UserOutlined />}
        onClick={() => navigateRoute("/profile")}
      >
        Profile
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item
        key="2"
        onClick={() => {
          userLogout();
        }}
      >
        Logout
      </Menu.Item>
    </Menu>
  );

  let loginProfile =
    localStorage.getItem("loggedIn") === "true" ? (
      <Dropdown overlay={menu}>
        <Button
          className={classes.Button}
          style={{ width: "100px", marginTop: "20px" }}
          type="primary"
        >
          User <DownOutlined />
        </Button>
      </Dropdown>
    ) : (
      <div>
        <div style={{ display: "block", marginTop: "auto" }}>
          <Button
            className={classes.Button}
            style={{ width: "60%", marginTop: "10px" }}
            type="primary"
            onClick={() => navigateRoute("/login")}
          >
            Login
          </Button>
        </div>
        <span
          onClick={() => navigateRoute("/login")}
          style={{ fontSize: "11px", padding: "5px", cursor: "pointer" }}
        >
          or sign up!
        </span>
      </div>
    );

  useEffect(() => {
    console.log("hey");

    /*if (props.loggedIn === "true") {
      loginProfile = (
        <div style={{ display: "block" }}>
          <Button
            className={classes.Button}
            style={{ width: "60%", marginTop: "20px" }}
            type="primary"
            onClick={() => navigateRoute("/profile")}
          >
            Profile
          </Button>
        </div>
      );
    }

    function checkUserData() {
      const loggedIn = localStorage.getItem("loggedIn");
    }

    window.addEventListener("storage", checkUserData);

    return () => {
      window.removeEventListener("storage", checkUserData);
    };*/
  }, [props.loggedIn, props.userRole]);

  return (
    <div className={classes.Navigation}>
      <div
        style={{
          width: "80%",
          height: "100%",
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Button
          onClick={() => navigateRoute("/")}
          className={classes.Button}
          type="link"
        >
          Home
        </Button>
        <Button />
        {localStorage.getItem("userRole") === "user" ? (
          <Button className={classes.Button} type="link">
            Events
          </Button>
        ) : (
          <Button
            className={classes.Button}
            onClick={() => navigateRoute("/events-panel")}
            type="link"
          >
            Events Panel
          </Button>
        )}
        {localStorage.getItem("userRole") === "user" ? null : (
          <Button
            className={classes.Button}
            onClick={() => navigateRoute("/reservations-panel")}
            type="link"
          >
            Reservations Panel
          </Button>
        )}
      </div>
      <div style={{ width: "20%", height: "100%", display: "grid" }}>
        {loginProfile}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userRole: state.userRole,
  };
};

export default connect(mapStateToProps)(Navigation);
