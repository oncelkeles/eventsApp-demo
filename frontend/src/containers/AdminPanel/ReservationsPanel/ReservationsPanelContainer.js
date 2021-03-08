import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { message } from "antd";

import services from "../../../utils/services";
import classes from "../EventsPanel/EventsPanelContainer.module.css";
import * as actionTypes from "../../../store/actions/action";
import scrollOnClose from "../../../utils/scrollOnClose";
import EventDetails from "../../../components/EventDetails/EventDetails";
import ReservationsTable from "../../../components/AdminPanel/ReservationsPanel/ReservationsTable";

const EventsPanelContainer = (props) => {
  const history = useHistory();
  const [reservations, setReservations] = useState([]);

  const fetchReservations = async () => {
    try {
      const res = await services.get("/reservations");
      setReservations(null);
      setReservations([]);
      res.data.data.map((reservation, index) => {
        reservations.push({
          username: reservation.user.name,
          email: reservation.user.email,
          title: reservation.event.title,
          price: reservation.price,
          tickets: reservation.tickets,
          startDate: reservation.event.startDate,
          id: reservation._id,
          key: index,
        });
      });
      return reservations;
    } catch (err) {
      message.error(
        "Could not fetch reservations! Please try reloading the page."
      );
    }
  };

  const deleteReservationHandler = async (reservationRecord) => {
    try {
      const url = "/reservations/" + reservationRecord.id;
      const res = await services.delete(url);
      message.success("Reservation deleted successfully.");
      window.location.reload();
      const temp = await fetchReservations();
      setReservations(temp);
    } catch (err) {
      message.error("Could not delete the event! Try again.");
    }
  };

  useEffect(async () => {
    const temp = await fetchReservations();
    setReservations(temp);
  }, []);

  return (
    <div className={classes.EventsPanelContainer}>
      <ReservationsTable
        reservations={reservations}
        rerender={fetchReservations}
        deleteReservation={deleteReservationHandler}
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
