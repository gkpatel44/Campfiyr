import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
// import { connect } from "react-redux";
import { Bookmark, Mouse, People, Visibility } from "@material-ui/icons";
import { Link } from "react-router-dom";
import withStyles from "@material-ui/core/styles/withStyles";
import { convertTimeOfDayToDateObj } from "../../util/util";
import { firebaseAnalytics } from "../../firebase/firebase";

const styles = (theme) => ({
  root: {
    margin: "3rem",
  },
  cardRoot: {
    display: "flex",
  },
  media: {
    width: "10rem",
    height: "10rem",
  },
  details: {
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: "1 0 auto",
  },
  metrics: {
    alignSelf: "flex-end",
  },
  singleEvent: {
    paddingBottom: "1rem",
  },
});
const epochToDate = (epoch) => {
  var d = new Date(epoch * 1000); // The 0 there is the key, which sets the date to the epoch
  return d.toString().slice(0, 21);
};

class HorizontalEventCard extends Component {
  render() {
    const { classes } = this.props;
    const { children, item } = this.props;

    return (
      <div className={classes.singleEvent}>
        <Link
          to={`/event/${item?.busuid}/${item?.eventId}`}
          onClick={() => {
            firebaseAnalytics.logEvent("view_event", {
              from: "event_card",
              business_id: item.busuid,
              event_id: item.eventid,
            });
          }}
        >
          <Card className={classes.cardRoot}>
            <CardMedia
              className={classes.media}
              image={item?.images?.image1}
              title={item && item["Event Name"]}
            />
            <div className={classes.details}>
              <CardActionArea>
                <CardContent className={classes.content}>
                  <Typography variant="subtitle2" color="textSecondary">
                    {item?.repeats
                      ? convertTimeOfDayToDateObj(
                          item["start time"]
                        ).toLocaleTimeString() +
                        " - " +
                        convertTimeOfDayToDateObj(
                          item["end time"]
                        ).toLocaleTimeString()
                      : // if event is not repeating, generate time from epoch string
                        (item && item["Start time"]
                          ? epochToDate(item["Start time"].seconds)
                          : "Loading ...") +
                        " - " +
                        (item && item["End time"]
                          ? epochToDate(item["End time"].seconds)
                          : "Loading ...")}
                  </Typography>
                  <Typography component="h6" variant="h6">
                    {item && item["Event Name"]}
                  </Typography>
                  <div className={classes.metrics} hidden={true}>
                    {" "}
                    {/*Hidden for now since it .. does nothing? */}
                    <Typography component="p" variant="button">
                      <People />:{" "}
                      {item && item.goingnumber ? item.goingnumber : ""}{" "}
                      <Bookmark />: - <Visibility />
                      {item && item.uniqueSeen
                        ? item.uniqueSeen.length
                        : ""}{" "}
                      <Mouse />: -{" "}
                    </Typography>
                  </div>
                </CardContent>
              </CardActionArea>
            </div>
            {children}
          </Card>
        </Link>
      </div>
    );
  }
}
HorizontalEventCard.propTypes = {
  children: PropTypes.node,
  item: PropTypes.object.isRequired,
  classes: PropTypes.any.isRequired,
};

export default withStyles(styles)(HorizontalEventCard);
