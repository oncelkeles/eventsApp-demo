import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { message } from "antd";

import EventsPanel from "../../../components/AdminPanel/EventsPanel/EventsPanel";
import services from "../../../utils/services";
import classes from "./EventsPanelContainer.module.css";
import * as actionTypes from "../../../store/actions/action";
import scrollOnClose from "../../../utils/scrollOnClose";
import EventDetails from "../../../components/EventDetails/EventDetails";

const EventsPanelContainer = (props) => {
  const history = useHistory();
  const [events, setEvents] = useState({});

  const fetchEvents = async () => {
    try {
      const res = await services.get("/events");
      setEvents(res.data.data);
      return res.data.data;
    } catch (err) {
      message.error("Could not fetch events! Please try reloading the page.");
    }
  };

  const createEventHandler = async (
    values,
    selectedImage,
    imageDescription,
    startDate
  ) => {
    const data = new FormData();
    data.append("title", values.title);
    data.append("artist", values.artist);
    data.append("price", values.price);
    data.append("description", values.description);
    data.append("duration", values.duration);
    data.append("summary", values.summary);
    data.append("startDate", values.startDate);
    data.append("city", values.city);
    data.append("venue", values.venue);
    data.append("maxPeople", values.maxPeople);
    if (selectedImage) {
      data.append("photo", selectedImage, imageDescription);
    }
    const url = "/events/";

    try {
      const res = await services.post(url, data);
      history.push("/events-panel");
      window.location.reload();
    } catch (err) {
      message.error("Could not create event, please try again!");
    }
  };

  const updateEventHandler = async (
    values,
    selectedImage,
    imageDescription
  ) => {
    const data = new FormData();
    data.append("title", values.title);
    data.append("artist", values.artist);
    data.append("price", values.price);
    data.append("description", values.description);
    data.append("duration", values.duration);
    data.append("summary", values.summary);
    data.append("startDate", values.startDate);
    data.append("location.city", values.city);
    data.append("location.venue", values.venue);
    data.append("maxPeople", values.maxPeople);
    if (selectedImage) {
      data.append("imageCover", selectedImage, imageDescription);
    }
    const url = "/events/" + values.id;

    try {
      const res = await services.patch(url, data);
      history.push("/events-panel");
      window.location.reload();
    } catch (err) {
      message.error("Could not update event, please try again!");
    }
  };

  useEffect(async () => {
    const temp = fetchEvents();
    setEvents(temp);
  }, []);

  return (
    <div className={classes.EventsPanelContainer}>
      <EventsPanel
        events={events}
        rerender={fetchEvents}
        updateEvent={updateEventHandler}
        createEvent={createEventHandler}
      />
      {props.openDetails ? (
        <EventDetails
          open={props.openDetails}
          closed={props.onDetailOpen}
          scrollOnClose={scrollOnClose}
        />
      ) : null}
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
    onDetailOpen: () => dispatch({ type: actionTypes.OPEN_DETAILS }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventsPanelContainer);
