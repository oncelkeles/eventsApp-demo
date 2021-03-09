import React, { useEffect, useState } from "react";
import { message } from "antd";

import services from "../../../apiService/services";
import classes from "../PanelsContainer.module.css";
import ReservationsTable from "../../../components/AdminPanel/ReservationsPanel/ReservationsTable";
import background from "../../../images/reservation-background4.jpg";

const EventsPanelContainer = (props) => {
  const [reload, setReload] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [loadingTable, setLoadingTable] = useState(false);

  const fetchReservations = async () => {
    try {
      setLoadingTable(true);
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
      setLoadingTable(false);
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
      setReload(!reload);
      const temp = await fetchReservations();
      setReservations(temp);
    } catch (err) {
      message.error("Could not delete the event! Try again.");
    }
  };

  useEffect(async () => {
    const temp = await fetchReservations();
    setReservations(temp);
  }, [reload]);

  return (
    <div className={classes.EventsPanelContainer}>
      <img
        style={{
          width: "100vw",
          height: "100%",
          position: "fixed",
          opacity: "0.9",
          zIndex: "-1",
        }}
        src={background}
        alt={"https://www.freepik.com/photos/border by kstudio"}
      />
      <ReservationsTable
        reservations={reservations}
        rerender={fetchReservations}
        deleteReservation={deleteReservationHandler}
        loadingTable={loadingTable}
      />
    </div>
  );
};

export default EventsPanelContainer;
