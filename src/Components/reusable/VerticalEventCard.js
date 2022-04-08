import React, { Component } from "react";
import PropTypes from "prop-types";

import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Typography,
  withStyles,
} from "@material-ui/core";
import { AccountCircle, Event, Info} from "@material-ui/icons";
import Carousel from "react-material-ui-carousel";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import VideoPlayerPlay from "./VideoPlayerPlay";
import { convertTimeOfDayToDateObj, distanceInKM } from "../../util/util";
import { ReactComponent as LocationIcon } from "../../Components/auth/assets/location.svg";
import { BUSINESSNAME, EVENTDESCRIPTION, EVENTNAME } from "../../util/keywords";
import { firebaseAnalytics } from "../../firebase/firebase";

const styles = (theme) => ({
  root: {
    // margin: "3rem",
    background: "#383D43",
    width: "300px",
    "& .MuiCardContent-root:last-child": {
      padding: "0 10px",
    },
    borderRadius: "8px",
  },
  media: {
    // height: 500,
    width: "100%",
    height: "250px",
    borderRadius: "8px",
    backgroundSize: "contain",
    backgroundColor: "#292C31",
  },
  carousel: {
    "& button:focus": {
      outline: "none",
    },
  },
  cardHeader: {
    backgroundColor: "transparent",
    position: "relative",
    top: "0rem",
    zIndex: "99",
    // marginBottom: "-5rem",
    paddingBottom: 0,
  },
  cardContent: {
    fontSize: "10px",
    color: "#FFFFFF",
    padding: "0 10px 10px 10px",
  },
  avatar: {
    backgroundColor: "#b4a2ff",
  },
  ticket: {
    color: "#b4a2ff",
  },
  titleText: {
    color: "white",
    fontWeight: "900",
  },
  white: {
    color: "white",
  },
  btnActions: {
    display: "flex",
    "& .MuiIconButton-root": {
      padding: "5px",
    },
  },
  button: {
    "&:focus": {
      outline: "none",
    },
  },
});
class VerticalEventCard extends Component {
  state = {
    videoPlaying: false,
  };
  render() {
    const { classes } = this.props;
    // const { children,  item } = this.props;
    const { item } = this.props;
    const { videoPlaying } = this.state;
    const epochToDate = (epoch) => {
      var d = new Date(epoch * 1000); // The 0 there is the key, which sets the date to the epoch
      return d.toString().slice(0, 21);
    };

    const togglePlay = () => {
      this.vidRef.play();
      this.setState({ videoPlaying: !videoPlaying });
    };

    return (
      <>
        {item && item[EVENTNAME] && item.userData ? (
          <Grid item>
            <Card className={classes.root}>
              <CardHeader
                avatar={
                  <Link
                    to={item && item.busuid ? `/user/${item.busuid}` : "#"}
                    onClick={() => {
                      firebaseAnalytics.logEvent("view_business", {
                        from: "event_card",
                        business_id: item.busuid,
                        event_id: item.eventid,
                      });
                    }}
                  >
                    <Avatar
                      aria-label="avatar"
                      className={classes.avatar}
                      alt={
                        item && item.userData
                          ? item.userData.displayName ||
                            item.userData[BUSINESSNAME]
                          : "User Profile Image"
                      }
                      src={
                        item && item.userData
                          ? item.userData.photoURL ||
                            item.userData.imageDownloadURL
                          : null
                      }
                    >
                      <AccountCircle />
                    </Avatar>
                  </Link>
                }
                action={
                  <IconButton aria-label="settings" className={classes.white}>
                    {/* hidden for now */}
                    {/* <StarBorder /> */}
                  </IconButton>
                }
                title={
                  <Link
                    to={item && item.busuid ? `/user/${item.busuid}` : "#"}
                    onClick={() => {
                      firebaseAnalytics.logEvent("view_business", {
                        from: "event_card",
                        business_id: item.busuid,
                        event_id: item.eventid,
                      });
                    }}
                  >
                    <Typography
                      variant="body1"
                      component="span"
                      className={classes.titleText}
                      noWrap
                    >
                      {item && item.userData
                        ? item.userData.displayName ||
                          item.userData[BUSINESSNAME]
                        : ""}
                    </Typography>{" "}
                  </Link>
                }
                // subheader="September 14, 2016"
                className={classes.cardHeader}
              />{" "}
              <Carousel
                style={{
                  paddingBottom: "5px",
                  "button:focus": { outline: "none" },
                }}
                className={`${classes.carousel} pt-3 pr-3 pl-3`}
                autoPlay={false}
                indicators={true}
                // navButtonsAlwaysVisible={true}
                animation={"slide"}
                activeIndicatorIconButtonProps={{
                  style: {
                    color: "#7950F3",
                    // backgroundColor: 'red', // 2,
                    "& button: focus": {
                      outline: "none",
                    },
                  },
                }}
              >
                {Object.entries(
                  item && item.images
                    ? item.images
                    : {
                        image1:
                          "https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e47vtzsd17u2b56t2rtt4mrw474d6e74cxihor1qzzi&rid=giphy.gif",
                        image2:
                          "https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e47vtzsd17u2b56t2rtt4mrw474d6e74cxihor1qzzi&rid=giphy.gif",
                      }
                  // eslint-disable-next-line array-callback-return
                ).map(([key, value]) => {
                  if (key.includes("image")) {
                    return (
                      <CardMedia
                        className={classes.media}
                        // src={value || ""}
                        image={value || ""}
                        key={key}
                        title="image"
                      />
                    );
                  } else if (key.includes("video")) {
                    return (
                      // <div className={classes.videoContainer} key={key}>
                      <div key={key}>
                        <CardMedia
                          className={classes.media} // if you uncomment this, you 'force' aspect ratio and white borders
                          component="video"
                          controls
                          // src={value || ""}
                          image={value || ""}
                          key={key}
                          title="image"
                          onPause={() => {
                            this.setState({ videoPlaying: false });
                          }}
                          ref={(el) => (this.vidRef = el)}
                        />
                        {/*<Button onClick={togglePlay}>play/Pause</Button>*/}
                        <div hidden={videoPlaying}>
                          <VideoPlayerPlay play={togglePlay} />
                        </div>
                      </div>
                    );
                  }
                })}
              </Carousel>
              <CardContent className={classes.cardContent}>
                <Grid
                  container
                  justifyContent="space-between"
                  className="text-white"
                >
                  <Grid item xs={12}>
                    <div className="w-full flex flex-col justify-center items-start">
                      <div className="w-full flex justify-between items-start">
                        <h4 className="text-base font-bold">
                          {item ? item["Event Name"] : "Loading ..."}
                        </h4>
                        <div
                          className="flex whitespace-nowrap items-center text-xs"
                          style={{ marginTop: "3px" }}
                        >
                          <div
                            className="w-3 h-3 mx-1"
                            style={{ color: "#7950F3" }}
                          >
                            <LocationIcon />
                          </div>
                          <div>{distanceInKM(item.distance, 1)} KM</div>
                        </div>
                      </div>
                      <span className="text-xs" style={{ color: "#ABABAB" }}>
                        {item ? item[EVENTDESCRIPTION] : "Loading ..."}
                      </span>
                    </div>
                  </Grid>
                </Grid>
                <div className="flex justify-start items-center mt-2">
                  <Event
                    style={{ color: "#7950F3", width: "16px", height: "16px" }}
                  />
                  <div className="ml-2" style={{ fontSize: "9px" }}>
                    {item.repeats
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
                  </div>
                </div>
                <div className="flex justify-end items-start mb-2">
                  <div className={classes.btnActions}>
                    <Link
                      to={
                        item && item.busuid && item.eventid
                          ? `/event/${item.busuid}/${item.eventid}`
                          : "#"
                      }
                      onClick={() => {
                        firebaseAnalytics.logEvent("view_event", {
                          from: "event_card",
                          business_id: item.busuid,
                          event_id: item.eventid,
                        });
                      }}
                    >
                      {" "}
                      <IconButton className={classes.button}>
                        <Info
                          style={{
                            color: "#7950F3",
                            width: "20px",
                            height: "20px",
                          }}
                        />
                      </IconButton>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ) : null}
      </>
    );
  }
}

VerticalEventCard.propTypes = {
  children: PropTypes.node,
  item: PropTypes.object.isRequired,
  //   classes: PropTypes.any.isRequired,
};

function mapStateToProps(state) {
  return {
    userData: state.user.userData,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(VerticalEventCard));
