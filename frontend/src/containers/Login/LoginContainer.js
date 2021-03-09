import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Login from "../../components/Login/Login";
import { message } from "antd";

import services from "../../apiService/services";
import setLoggedIn from "../../utils/setLoggedIn";
import classes from "./LoginContainer.module.css";
import * as actionTypes from "../../store/actions/action";
import background from "../../images/login-background2.jpg";

const LoginContainer = (props) => {
  const history = useHistory();

  const submitSignup = async (user) => {
    try {
      const res = await services.post("/users/signup", user.user);
      const userData = res.data.data.user;
      setLoggedIn(userData.name, userData.email, userData.role);
      props.loggedIn(true);
      props.setUserRole(userData.role);
      history.push("/");
      window.location.reload();
    } catch (err) {
      message.error("Cannot sign up! Try with a different e-mail address.");
    }
  };
  const submitLogin = async (user) => {
    try {
      const res = await services.post("/users/login", user.user);
      const userData = res.data.data.user;
      setLoggedIn(userData.name, userData.email, userData.role);
      props.loggedIn(true);
      props.setUserRole(userData.role);
      history.push("/");
      window.location.reload();
    } catch (err) {
      message.error("Cannot login! Check your credentials.");
    }
  };
  return (
    <div className={classes.LoginContainer}>
      <img
        style={{
          width: "100vw",
          height: "100%",
          position: "fixed",
          opacity: "0.9",
          zIndex: "-1",
        }}
        src={background}
        alt={"login-background"}
      />

      <div style={{ height: "60px" }} />
      <Login onFinishSignup={submitSignup} onFinishLogin={submitLogin} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userRole: state.userRole,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setUserRole: (role) =>
      dispatch({ type: actionTypes.SET_USER_ROLE, val: role }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
