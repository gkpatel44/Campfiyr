import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import HorizontalEventCard from "../reusable/HorizontalEventCard";

const styles = (theme) => ({
  root: {
    margin: "3rem",
  },
});

class AllNearbyEvents extends Component {
  render() {
    const { eventsHappenin } = this.props;
    const { classes } = this.props;
    return (
      <div>
        {eventsHappenin ? (
          eventsHappenin.map((item) => (
            <HorizontalEventCard
              item={item}
              classes={classes}
            ></HorizontalEventCard>
          ))
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isRetrievingEvents: state.events.isRetrievingEvents,
    eventsHappenin: state.events.eventsHappenin,
    userData: state.auth.userData,
    userType: state.auth.userType,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(AllNearbyEvents));
