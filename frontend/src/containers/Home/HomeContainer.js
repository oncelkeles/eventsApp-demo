import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Skeleton, Switch, Card, Avatar } from "antd";

import Event from "../../components/Events/Event/Event";
import Events from "../../components/Events/Events";
import classes from "./HomeContainer.module.css";
import services from "../../utils/services";
import EventDetails from "../../components/EventDetails/EventDetails";
import * as actionTypes from "../../store/actions/action";
import scrollOnClose from "../../utils/scrollOnClose";

const { Meta } = Card;

const HomeContainer = (props) => {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(async () => {
    const fetchData = async () => {
      setLoading(true);
      const res = await services.get("/events");
      setEvents(res.data.data);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div
        className={classes.HomeContainer}
        style={
          props.openDetails
            ? { overflow: "hidden", position: "fixed" }
            : { overflow: "unset" }
        }
      >
        {loading ? (
          <>
            <Card style={{ width: "27%", marginTop: 16 }} loading={loading}>
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
            <Card style={{ width: "27%", marginTop: 16 }} loading={loading}>
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
            <Card style={{ width: "27%", marginTop: 16 }} loading={loading}>
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
            <Card style={{ width: "27%", marginTop: 16 }} loading={loading}>
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
            <Card style={{ width: "27%", marginTop: 16 }} loading={loading}>
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
            <Card style={{ width: "27%", marginTop: 16 }} loading={loading}>
              <Meta
                avatar={
                  <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                }
                title="Card title"
                description="This is the description"
              />
            </Card>
          </>
        ) : null}

        <Events events={events} />
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
