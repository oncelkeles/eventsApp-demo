import React from "react";
import { FaTicketAlt } from "react-icons/fa";

import formatDate from "../../../utils/formatDate";
import classes from "../Reservations.module.css";

const ReservationHeader = (props) => {
  console.log(props.reservation);
  return (
    <div className={classes.ReservationHeader}>
      <div>{props.title}</div>
      <div>{formatDate(props.startDate)}</div>
      <div className={classes.ReservationHeaderTicket}>
        {props.tickets} x <FaTicketAlt style={{ fontSize: "30px" }} />
      </div>
    </div>
  );
};

export default ReservationHeader;
