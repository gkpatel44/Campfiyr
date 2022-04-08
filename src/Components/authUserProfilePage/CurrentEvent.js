import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
  withStyles,
  Dialog,
  Snackbar,
} from "@material-ui/core";
import { Event, Info, People, Room } from "@material-ui/icons";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  pullCurrentEvent,
  createEvent,
  clearOnCreateSuccessEvent,
  pullAllAuthBusinessUserEvents,
} from "../../redux/actions/events";
import CreateEditEvent from "./CreateEditEvent";
import Carousel from "react-material-ui-carousel";
import {
  Link,
  Redirect,
  // useHistory
} from "react-router-dom";
import {
  convertTimeOfDayToDateObj,
  isoStringToTimeOFDay,
} from "../../util/util";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import EventNoteIcon from "@material-ui/icons/EventNote";

import VideoPlayer from "../reusable/VideoPlayer";

const styles = (theme) => ({
  media: {
    height: "250px",
    borderRadius: "8px",
  },
  eventCard: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    // minHeight: "500px",
    width: "auto",
    height: "auto",
    borderRadius: "8px",
  },
  newEventButton: {
    background: "#6661F2",
    color: "#FFFFFF",
  },
  carousel: {
    "& button:focus": {
      outline: "none",
    },
  },
  dialog: {
    "& .MuiPaper-root": {
      background: "#383D43",
      borderRadius: "8px",
      color: "#ABABAB",
    },
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "900px",
    },
    "& .MuiDialog-paperScrollPaper": {
      "-ms-overflow-style": "none",
      "scrollbar-width": "none",
      "&::-webkit-scrollbar": {
        display: "none",
      },
    },
  },
});

class CurrentEvent extends Component {
  state = {
    dialogState: false,
    "Event Name": "",
    "Event Description": "",
    "End time": null,
    "Start time": null,
    "end time": null,
    "start time": null,
    eventType: "",
    // oneTimeEvent: true,
    // repeatsDaily: false,
    // repeatsWeekly: false,
    // repeatsSatSun: false,
    // repeatsMonFri: false,
    location: { lat: "", lng: "" },
    images: [],
    successSnackState: false,
    pushToEvent: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(clearOnCreateSuccessEvent()); // clear lingering states
    dispatch(pullCurrentEvent());
  }

  render() {
    const { classes, eventData, newEventData, msg } = this.props;
    const { userData } = this.props;
    const {
      isCreatingEventDB,
      isCreatingEventFB,
      errorCreatingEventDB,
      errorCreatingEventFB,
      isEventSuccessfullyCreatedDB,
      isEventSuccessfullyCreatedFB,
    } = this.props;
    const { dispatch } = this.props;

    const { dialogState, successSnackState, pushToEvent } = this.state;
    const { snackMsg } = this.state;

    const values = {
      "End time": this.state["End time"],
      "end time": this.state["end time"], // for repeating events
      "Event Description": this.state["Event Description"],
      "Event Name": this.state["Event Name"],
      "Start time": this.state["Start time"],
      "start time": this.state["start time"], // for repeating events
      location: this.state.location,
      images: this.state.images,
      eventType: this.state.eventType,
    };
    const pullEvents = () => {
      dispatch(pullCurrentEvent());
    };

    //TODO: consider using datejs or moment js instead, this is messy
    const epochToDate = (epoch) => {
      var d = new Date(epoch * 1000); // The 0 there is the key, which sets the date to the epoch
      return d.toString().slice(0, 21);
    };

    const handleDialog = (val) => {
      this.setState({
        dialogState: val,
      });
    };

    const collectImagesAndVideos = (images) => {
      this.setState({
        images, //TODO: this could also contain videos. naming to be updated
      });
    };

    const handleChange = (input, value) => {
      this.setState({ [input]: value });
    };

    const handleTimeChange = (input, value) => {
      this.setState({ [input]: value });
      // handle repeating events times
      if (values.eventType && values.eventType !== "oneTimeEvent") {
        if (input.toLowerCase() === "start time") {
          this.setState({
            "start time": isoStringToTimeOFDay(value),
          });
        }
        if (input.toLowerCase() === "end time") {
          this.setState({
            "end time": isoStringToTimeOFDay(value),
          });
        }
      }
    };

    const handleChecked = (e) => {
      // var midnight = new Date(new Date().setHours(0, 0, 0, 0));

      /* Below applies to both start and end time
       * The mobile app creator chose to distinguish one time events from repeating events by stprign them differently
       * One time events have their days values stored as epoch timestamps  with the key "Start time"
       * Repeating events have the key "start time" (lower case `s`) and value of midnight(today) minus the desired event time
       * the result of this a numerical value that can be added to the epoch of any day to resolve in the correct time
       * Example : midnight today + 81797  = today at 10:43 pm (with 17 seconds) - where 81797 is the resulting value of above calculation
       */
      console.log(e.target.name);
      switch (e.target.name) {
        case "oneTimeEvent":
          console.log("boob");
          if (values["start time"]) {
            delete values["start time"];
            this.setState({
              "start time": null,
            });
          }
          if (values["end time"]) {
            delete values["end time"];
            this.setState({
              "end time": null,
            });
          }
          break;
        // for ALL OTHER EVENT TYPES, action is the same
        default:
          // "start time" must have been provided before users can select event type
          // values["start time"] =
          // values["end time"] =
          //   Math.round(values["End time"] / 1000) - midnight.valueOf() / 1000;
          console.log("Event is anything BUT  a one time event");
          this.setState({
            "start time": isoStringToTimeOFDay(values["Start time"]),
            "end time": isoStringToTimeOFDay(values["End time"]),
          });
          break;
      }
      this.setState({ eventType: e.target.name });
    };

    // const getDateTimeNow = () => {
    //   var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
    //   return new Date(Date.now() - tzoffset).toISOString().slice(0, 16);
    // };

    const handleSubmit = (data) => {
      // if (data["Start time"] === null) {
      //   data["Start time"] = getDateTimeNow();
      // }
      dispatch(createEvent(data));
    };

    const setSuccessSnack = (boolVal) => {
      // console.log(msg);
      this.setState({
        snackMsg: msg,
        successSnackState: boolVal,
      });
    };
    const redirectPageToEvent = () => {
      this.setState({
        pushToEvent: true,
      });
      this.setState({
        "End time": null,
        "Event Description": "",
        "Event Name": "",
        "Start time": null,
        images: [],
      });
      console.log("push to history successful");
    };
    const handleCloseSuccessSnackbar = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      setSuccessSnack(false);
    };

    const newEventBtnAction = () => {
      return (
        <div className="w-full flex justify-between items-center">
          <div className="text-xs text-white font-bold">
            {eventData && eventData[0] && Object.keys(eventData[0]).length
              ? "Current Event"
              : " "}
          </div>
          <Button // TODO: MAKE THIS AN ICON BUTTON
            variant="contained"
            className={`${classes.newEventButton} focus:outline-none`}
            color="primary"
            onClick={() => {
              handleDialog(true);
            }}
            // style={{ marginBottom: 5 }}
          >
            New Event
          </Button>
          <Dialog
            className={classes.dialog}
            open={dialogState}
            onClose={() => {
              handleDialog(false);
            }}
          >
            <CreateEditEvent
              setDialogState={handleDialog}
              values={values}
              handleChange={handleChange}
              setSuccessSnack={setSuccessSnack}
              handleChecked={handleChecked}
              sendImagesAndVideosBack={collectImagesAndVideos}
              handleSubmit={handleSubmit}
              handleTimeChange={handleTimeChange}
              successAction={() => {
                redirectPageToEvent();
                dispatch(pullAllAuthBusinessUserEvents(userData.uid));
              }}
              loading={isCreatingEventDB || isCreatingEventFB}
              success={
                isEventSuccessfullyCreatedDB && isEventSuccessfullyCreatedFB
              }
              error={errorCreatingEventDB || errorCreatingEventFB}
            />
          </Dialog>
          <Snackbar
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            open={successSnackState}
            autoHideDuration={5000}
            message={snackMsg}
            onClose={handleCloseSuccessSnackbar}
          />
        </div>
      );
    };
    var eventHappeningSoonIsh =
      eventData && eventData[0] && Object.keys(eventData[0]).length > 0
        ? 0 //0 is what this is usually but because the back end is fuck it keeps brreaking app
        : -1; // -1 represents default " no events happenin"
    switch (eventHappeningSoonIsh) {
      case -1:
        return (
          <div className="w-full">
            <Grid container spacing={2} direction="column">
              <Grid item xs={12}>
                {newEventBtnAction()}
              </Grid>
              <Grid item xs={12}>
                {pushToEvent &&
                // isEventSuccessfullyCreated && TODO: change below. its whack and should be removed lol. useEffect instead
                newEventData &&
                newEventData.uid &&
                (newEventData.eventId || newEventData.eventid) ? (
                  <Redirect
                    to={`/event/${newEventData.uid}/${
                      newEventData.eventId || newEventData.eventid
                    }`}
                  />
                ) : (
                  <div></div>
                )}
                <Card className="w-full">
                  <img
                    className={classes.eventCard}
                    src={
                      process.env.PUBLIC_URL +
                      // "/assets/placeholderVectors/nothingToShow.png"
                      "/assets/placeholderVectors/imgpsh_fullsize_anim.png"
                    }
                    alt="No events happenign around you"
                  />
                </Card>
              </Grid>
            </Grid>
          </div>
        );
      case 0:
        return (
          <div className="w-full">
            <Grid container spacing={2} direction="column">
              <Grid item xs={12}>
                {newEventBtnAction()}
              </Grid>
              <Grid item xs={12}>
                {/* <>
                <Button
                  onClick={() => {
                    setSuccessSnack(true);
                  }}
                >
                  Trigger Snack
                </Button>
              </> */}
                {pushToEvent &&
                // isEventSuccessfullyCreated &&
                newEventData &&
                newEventData.uid &&
                (newEventData.eventId || newEventData.eventid) ? (
                  <Redirect
                    to={`/event/${newEventData.uid}/${
                      newEventData.eventId || newEventData.eventid
                    }`}
                  />
                ) : (
                  <div></div>
                )}
                <div
                  style={{
                    margin: "2px",
                    background: "#383D43",
                    color: "#FFFFFF",
                    borderRadius: "8px",
                  }}
                >
                  {/* */}
                  <Carousel
                    className={`${classes.carousel} pt-3 pr-3 pl-3 w-full`}
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
                      eventData && eventData[0].images
                        ? eventData[0].images
                        : {
                            image1:
                              "https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e47vtzsd17u2b56t2rtt4mrw474d6e74cxihor1qzzi&rid=giphy.gif",
                            image2:
                              "https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e47vtzsd17u2b56t2rtt4mrw474d6e74cxihor1qzzi&rid=giphy.gif",
                          }
                      // eslint-disable-next-line array-callback-return
                    ).map(([key, value], idx) => {
                      if (key.includes("image")) {
                        return (
                          <Link
                            key={idx}
                            to={`/event/${eventData[0].busuid}/${
                              eventData[0].eventId || eventData[0].eventid
                            }`}
                          >
                            <CardMedia
                              className={classes.media}
                              style={{ backgroundSize: "auto" }}
                              // src={value || ""}
                              image={value || ""}
                              key={key}
                              title="image"
                            />
                          </Link>
                        );
                      } else if (key.includes("video")) {
                        return (
                          <div key={idx}>
                            <VideoPlayer videoSrc={value} key={key} />
                          </div>
                        );
                      }
                    })}
                  </Carousel>
                  <div
                    className="w-full flex justify-between items-center"
                    style={{ padding: "0 10px" }}
                  >
                    <div className="text-lg font-bold">
                      {eventData[0]["Event Name"]}
                    </div>
                    <div className="flex whitespace-nowrap justify-center items-center">
                      <LocationOnIcon
                        style={{
                          color: "#7950F3",
                          width: "16px",
                          height: "16px",
                        }}
                      />
                      <span className="ml-1 text-xs">0.6 Km</span>
                    </div>
                  </div>
                  <div
                    className="w-full flex justify-start items-center text-xs"
                    style={{
                      padding: "0 10px",
                      color: "#ABABAB",
                      marginBottom: "14px",
                    }}
                  >
                    {eventData[0]["Event Description"]}
                  </div>
                  <div
                    className="w-full flex justify-start items-center text-xs"
                    style={{ padding: "0 10px" }}
                  >
                    <EventNoteIcon
                      style={{
                        color: "#7950F3",
                        width: "16px",
                        height: "16px",
                      }}
                    />
                    <span className="ml-1" style={{ fontSize: "9px" }}>
                      {eventData[0].repeats
                        ? convertTimeOfDayToDateObj(
                            eventData[0]["start time"]
                          ).toLocaleTimeString() +
                          " - " +
                          convertTimeOfDayToDateObj(
                            eventData[0]["end time"]
                          ).toLocaleTimeString()
                        : // if event is not repeating, generate time from epoch string
                          (eventData[0] && eventData[0]["Start time"]
                            ? epochToDate(eventData[0]["Start time"].seconds)
                            : "Loading ...") +
                          " - " +
                          (eventData[0] && eventData[0]["End time"]
                            ? epochToDate(eventData[0]["End time"].seconds)
                            : "Loading ...")}
                    </span>
                  </div>
                  <Grid
                    container
                    spacing={1}
                    justifyContent="center"
                    style={{
                      marginTop: "10px",
                      marginBottom: "1px",
                      padding: "0 8px",
                      fontSize: "10px",
                    }}
                  >
                    <Grid item xs={6}>
                      <Grid
                        container
                        spacing={1}
                        direction="column"
                        alignItems="flex-start"
                      >
                        <Grid item style={{ width: "100%" }}>
                          <div
                            className="w-full flex justify-start items-center"
                            style={{
                              background: "#292C31",
                              color: "#ABABAB",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <div className="mr-1">Profile Clicks:</div>
                            <div>0</div>
                          </div>
                        </Grid>
                        <Grid item style={{ width: "100%" }}>
                          <div
                            className="w-full flex justify-start items-center"
                            style={{
                              background: "#292C31",
                              color: "#ABABAB",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <div className="mr-1">Saved:</div>
                            <div>0</div>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Grid
                        container
                        spacing={1}
                        direction="column"
                        alignItems="flex-start"
                      >
                        <Grid item style={{ width: "100%" }}>
                          <div
                            className="w-full flex justify-start items-center"
                            style={{
                              background: "#292C31",
                              color: "#ABABAB",
                              borderRadius: "8px",
                              padding: "8px",
                            }}
                          >
                            <div className="mr-1">Event views:</div>
                            <div>0</div>
                          </div>
                        </Grid>
                        <Grid item style={{ width: "100%" }}>
                          <div
                            className="w-full flex justify-end items-center"
                            style={{
                              // background: "#292C31",
                              color: "#ABABAB",
                              borderRadius: "8px",
                              padding: "5px 8px",
                              marginBottom: "8px",
                            }}
                          >
                            <Link
                              to={
                                eventData[0] &&
                                eventData[0].busuid &&
                                eventData[0].eventid
                                  ? `/event/${eventData[0].busuid}/${eventData[0].eventid}`
                                  : "#"
                              }
                            >
                              <Info
                                style={{
                                  color: "#7950F3",
                                  width: "20px",
                                  height: "20px",
                                }}
                              />
                            </Link>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </div>
        );
      default:
        return (
          <div style={{ padding: "10px" }}>
            <Card>
              <CardMedia
                square
                className={classes.media}
                image={
                  "https://images.unsplash.com/photo-1606592641978-bbfa15596820?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=2100&q=80"
                }
                title="image"
              />

              <CardContent>
                <Grid container>
                  <Grid item>
                    <Typography variant="h4">7 Rooms Available</Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h5">
                      <Room /> 0.6 KM
                    </Typography>
                  </Grid>
                </Grid>
                <Typography variant="body1">
                  Groups of under 8 are welcome!
                </Typography>
                <Typography variant="body2">
                  <Event />
                  Nov 18, 13:00 - Nov 26, 23:30
                </Typography>
                <Typography variant="body2">
                  <People />
                  120 People Visited
                </Typography>
                <Button
                  onClick={async () => {
                    console.log("clicked attempt");
                    pullEvents();
                  }}
                >
                  attempt
                </Button>
              </CardContent>
            </Card>
          </div>
        );
    }
  }
}

function mapStateToProps(state) {
  return {
    isRetrievingEventFB: state.events.isRetrievingEventFB,
    eventData: state.events.events,
    userData: state.auth.userData,
    userType: state.auth.userType,
    newEventData: state.events.newEvent,
    isCreatingEventDB: state.events.isCreatingEventDB,
    isCreatingEventFB: state.events.isCreatingEventFB,
    isEventSuccessfullyCreatedDB: state.events.isEventSuccessfullyCreatedDB,
    isEventSuccessfullyCreatedFB: state.events.isEventSuccessfullyCreatedFB,
    errorCreatingEventDB: state.events.errorCreatingEventDB,
    errorCreatingEventFB: state.events.errorCreatingEventFB,
    msg: state.events.msg,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(CurrentEvent));

// <div className="flex justify-end items-start">
//   {/*<div>*/}
//   {/* <People
//                   style={{ color: "#7950F3", width: "16px", height: "16px" }}
//                 /> */}
//   {/* {item
//                     ? item?  eventDate[0].uniqueSeen? eventDate[0].uniqueSeen.length : null : null : null
//                     : "Loading ..."}{" "}
//                   people visited */}
//   {/*</div>*/}
//   <div className={classes.btnActions}>
//     <Link
//       to={
//         eventData[0] && eventData[0].busuid && eventData[0].eventid
//           ? `/event/${eventData[0].busuid}/${eventData[0].eventid}`
//           : "#"
//       }
//     >
//       {" "}
//       <IconButton>
//         <Info
//           style={{
//             color: "#7950F3",
//             width: "20px",
//             height: "20px",
//           }}
//         />
//       </IconButton>
//     </Link>
//     {/* <IconButton>
//                   <ConfirmationNumber
//                     className={classes.ticket}
//                     style={{ color: "#7950F3", width: "20px", height: "20px" }}
//                   />
//                 </IconButton>
//                 <IconButton>
//                   <Message
//                     style={{ color: "#7950F3", width: "20px", height: "20px" }}
//                   />
//                 </IconButton> */}
//   </div>
// </div>
