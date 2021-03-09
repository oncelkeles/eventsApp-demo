import React, { useState } from "react";
import { message } from "antd";

import classes from "./EventsPanel.module.css";
import EventsTable from "./EventsTable/EventsTable";
import services from "../../../apiService/services";
import UpdateEventForm from "./UpdateEventForm/UpdateEventForm";
import AddEventForm from "./AddEventForm/AddEventForm";

const EventsPanel = (props) => {
  // 0 for table, 1 for update form, 2 for add form
  const [showComponent, setShowComponent] = useState(0);
  const [currentEvent, setCurrentEvent] = useState(null);

  const showComponentHandler = (componentNumber, selectedEvent) => {
    if (selectedEvent) {
      setCurrentEvent(selectedEvent);
    } else setCurrentEvent(null);
    setShowComponent(componentNumber);
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ height: "20px" }} />
      <div className={classes.EventsPanel}>
        {showComponent === 0 ? (
          <EventsTable
            changeComponent={showComponentHandler}
            events={props.events}
            deleteEvent={props.deleteEvent}
            loadingTable={props.loadingTable}
          />
        ) : null}
        {showComponent === 1 ? (
          <UpdateEventForm
            currentEvent={currentEvent}
            changeComponent={showComponentHandler}
            updateEvent={props.updateEvent}
          />
        ) : null}
        {showComponent === 2 ? (
          <AddEventForm
            changeComponent={showComponentHandler}
            createEvent={props.createEvent}
          />
        ) : null}
      </div>
    </div>
  );
};

export default EventsPanel;
