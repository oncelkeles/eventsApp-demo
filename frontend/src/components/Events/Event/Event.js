import React from "react";
import { connect } from "react-redux";
import { Button } from "antd";

import scrollToInfo from "../../../utils/scrollToInfo";
import classes from "./Event.module.css";
import * as actionTypes from "../../../store/actions/action";

const Event = (props) => {
  let event = props.event ? props.event : null;

  return (
    <div className={classes.EventBox}>
      <div className={classes.Event}>
        <div style={{ height: "2%" }} />
        <div style={{ height: "18%" }}>
          <h3>{event.title}</h3>
          <span style={{ fontSize: "12px" }}>{event.description}</span>
        </div>
        <div style={{ height: "3%" }} />
        <div style={{ height: "54%" }} className={classes.Image}>
          <img
            className={classes.Image}
            src={event.imageCover}
            alt={event.title}
          />
        </div>
        <div style={{ height: "2%" }} />
        <div style={{ display: "grid", height: "21%" }}>
          <div className={classes.Info}>
            <p style={{ textAlign: "center" }}>1 Person: &nbsp;</p>
            <p className={classes.InfoPrg}>{event.price} $</p>
          </div>
          <div className={classes.Info}>
            <p style={{ textAlign: "center" }}>Max. Capacity: &nbsp;</p>
            <p className={classes.InfoPrg}>{event.maxPeople} people</p>
          </div>
          <div className={classes.Info}>
            <p style={{ textAlign: "center" }}>Seats left: &nbsp;</p>
            <p className={classes.InfoPrg}>{event.seatsLeft}</p>
          </div>
        </div>
        <Button
          onClick={() => {
            props.onEventClicked(props.event);
            props.onDetailOpen();
            props.onModalOpen(window.pageYOffset);
            scrollToInfo(window.pageYOffset);
          }}
          className={classes.Button}
        >
          Details
        </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    eventDetails: state.eventDetails,
    openDetails: state.openDetails,
    scrollY: state.scrollY,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onEventClicked: (eventData) =>
      dispatch({ type: actionTypes.STORE_EVENTS, eventData }),
    onDetailOpen: () => dispatch({ type: actionTypes.OPEN_DETAILS }),
    onModalOpen: (posY) =>
      dispatch({ type: actionTypes.STORE_SCROLL_POSITION, val: posY }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);
