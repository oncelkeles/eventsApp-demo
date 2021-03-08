import React from "react";

import classes from "./Events.module.css";
import Event from "./Event/Event";

const Events = (props) => {
  console.log(props.events);
  let events = props.events
    ? props.events.map((event, id) => <Event event={event} key={id} />)
    : null;
  return (
    <div className={classes.Events}>
      {events}
      {events}
      {events}
      {events}
      {events}
      {events}
      {events}
      {events}
      {events}
      {events}
      {events}
      {events}
    </div>
  );
};

export default Events;
