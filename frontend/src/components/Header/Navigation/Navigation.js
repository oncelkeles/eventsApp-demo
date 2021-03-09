import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Dropdown, Menu, message } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

import setLoggedOut from "../../../utils/setLoggedOut";
import classes from "./Navigation.module.css";
import services from "../../../apiService/services";

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
          style={{ width: "100px", marginTop: "20px"}}
          type="link"
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
            onClick={() => navigateRoute("/login")}
            type="link"
          >
            Login
          </Button>
        </div>
        <span
          onClick={() => navigateRoute("/login")}
          style={{color:"white", fontSize: "11px", padding: "5px", cursor: "pointer" }}
        >
          or sign up!
        </span>
      </div>
    );

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
        {localStorage.getItem("userRole") !== "admin" ? null : (
          <Button
            className={classes.Button}
            onClick={() => navigateRoute("/events-panel")}
            type="link"
          >
            Events Panel
          </Button>
        )}
        {localStorage.getItem("userRole") !== "admin" ? null : (
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
