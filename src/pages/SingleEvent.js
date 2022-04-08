import {
  CardMedia,
  Grid,
  withStyles,
  Dialog,
  Button,
  Snackbar,
} from "@material-ui/core";
import React, { Component } from "react";
import NavBar from "../Components/NavBar";
import Carousel from "react-material-ui-carousel";
import { Room } from "@material-ui/icons";
import {
  cleanEventState,
  get_SpecificEvent,
  pullSpecificEvent,
  updateEvent,
  updateEventCancellation,
} from "../redux/actions";
import { connect } from "react-redux";
import CreateEditEvent from "../Components/authUserProfilePage/CreateEditEvent";
import { Helmet } from "react-helmet";
import Confirmation from "../Components/reusable/Confirmation";
import { EVENTNAME, EVENTDESCRIPTION } from "../util/keywords";
import VideoPlayerPlay from "../Components/reusable/VideoPlayerPlay";
import {
  convertTimeOfDayToDateObj,
  distanceInKM,
  isoStringToTimeOFDay,
} from "../util/util";

const styles = (theme) => ({
  media: {
    width: "100%",
    backgroundSize: "contain",
    height: 500,
    "@media (max-width: 600px)": {
      height: 300,
    },
  },
  eventCard: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    minHeight: "500px",
    width: "auto",
    height: "auto",
  },
  topMargin: {
    marginTop: "2rem",
  },
  carousel: {
    "& button:focus": {
      outline: "none",
    },
  },
  button: {
    "& .MuiButton-label": {
      fontSize: "12px",
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

const toronto = {
  lng: -79.38544,
  lat: 43.6487,
};
class SingleEvent extends Component {
  hideLocation = () => {
    this.setState({ hideLocation: true });
  };

  componentDidMount() {
    const { dispatch } = this.props;
    const eventID = this.props.match.params.eventId;
    const hideLocation = this.hideLocation;
    const showError = this.showError;
    const showPosition = this.showPosition;
    console.log("Single event page mounted ");
    dispatch(cleanEventState()); //clean any previous event state data ### Might be problematic, time will tell - Akin 2021-04-04
    var longitude = "";
    var latitude = "";
    //TODO: https://medium.com/trabe/rendering-different-react-components-depending-on-the-users-geographic-location-99d321ed0959

    if (
      navigator.permissions &&
      navigator.permissions.query &&
      navigator.geolocation
    ) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            // If granted get the location from navigator instead of params
            navigator.geolocation.getCurrentPosition((position) => {
              let longitude = position.coords.longitude;
              let latitude = position.coords.latitude;
              dispatch(get_SpecificEvent(eventID, latitude, longitude));
            });
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
          } else if (result.state === "denied") {
            hideLocation();
            dispatch(get_SpecificEvent(eventID, toronto.lat, toronto.lng));
          }
        });
    } else {
      /* Check for safari */
      dispatch(get_SpecificEvent(eventID, latitude, longitude));
    }

    // navigator.geolocation.getCurrentPosition((position) => {
    //   longitude = position.coords.longitude;
    //   latitude = position.coords.latitude;
    //   console.log("Latitude is :", position.coords.latitude);
    //   console.log("Longitude is :", position.coords.longitude);
    //   locationProvided = true;
    //   dispatch(
    //     get_SpecificEvent(this.props.match.params.eventId, latitude, longitude)
    //   );
    // });
    dispatch(
      pullSpecificEvent(
        this.props.match.params.uid,
        this.props.match.params.eventId
      )
    );
    // if (!locationProvided && latitude === "" && longitude === "") {
    //   console.log("dispatched again");
    //   dispatch(
    //     get_SpecificEvent(this.props.match.params.eventId, latitude, longitude)
    //   );
    // }
  }

  /** Method triggered by broswers navigation API
   * Takes in position object and sets the value of latitude and longitude within component state
   * Component state.location is then passed as a prop down to the Map which re-renders on update
   *
   * @param {Object} position
   */
  showPosition = (position) => {
    const { dispatch } = this.props;
    if (typeof position?.coords?.latitude === "number") {
      dispatch(
        get_SpecificEvent(
          this.props.match.params.eventId,
          position.coords.latitude,
          position.coords.longitude
        )
      );
    }
  };

  /**Handles the possible array of errors thrown by the geolocation API
   *
   * @param {*} error
   */
  showError = (error) => {
    // const { dispatch } = this.props;
    switch (error.code) {
      case error.PERMISSION_DENIED:
        // Default to Toronto
        this.hideLocation();
        this.handleLocation(
          toronto,
          "Allow location access or enter a location"
        );

        break;
      case error.POSITION_UNAVAILABLE:
        this.hideLocation();
        this.handleLocation(
          toronto,
          "Location information is unavailable. Please enter a postal code"
        );

        break;
      case error.TIMEOUT:
        this.hideLocation();
        // Default to Toronto
        this.handleLocation(
          toronto,
          "The request to get your location timed out. Please enter a postal code"
        );

        break;
      case error.UNKNOWN_ERROR:
        this.hideLocation();
        // Default to Toronto
        this.handleLocation(
          toronto,
          "Something went wrong. Please enter a postal code"
        );
        break;
      default:
        this.hideLocation();
        // Default to Toronto
        this.handleLocation(
          toronto,
          "Please enter a postal code or allow location to continue!"
        );
    }
  };
  handleLocation = (loc, status) => {
    this.setState({
      status: status || "You are currently viewing events in:",
      location: loc,
    });
  };

  state = {
    // existingImages: this.props.eventData ? this.props.eventData.images : null,
    // "End time": this.props.eventData ? this.props.eventData["End time"] : null,
    // "Event Description": this.props.eventData
    //   ? this.props.eventData["Event Description"]
    //   : null,
    // "Event Name": this.props.eventData
    //   ? this.props.eventData["Event Name"]
    //   : null,
    // "Start time": this.props.eventData
    //   ? this.props.eventData["Start time"]
    //   : null,
    // goingnumber: this.props.eventData.goingnumber,
    // uniqueSeen: this.props.eventData.uniqueSeen,
    // isCanceled: this.props.eventData.isCanceled,
    // categories: this.props.eventData.categories,
    editEventDialogState: false,
    cancelEventDialogState: false,
    successSnackState: false,
    statePreParsed: false,
    videoPlaying: false,
    images: [],
    hideLocation: false,
    location: {},
  };

  constructor() {
    super();
    this.vidRef = React.createRef();
  }

  render() {
    const { match } = this.props;
    const { classes, eventData, userData } = this.props;
    const {
      // isUpdatingEvent,
      // errorUpdatingEvent,
      // updatedEvent,
      errorUpdatingEventDB,
      errorUpdatingEventFB,
      isEventSuccessfullyUpdatedDB,
      isEventSuccessfullyUpdatedFB,
      isUpdatingEventDB,
      isUpdatingEventFB,
      msg,
    } = this.props;
    const { dispatch } = this.props;

    const {
      editEventDialogState,
      cancelEventDialogState,
      // unCancelEventDialogState,
      successSnackState,
      videoPlaying,
      hideLocation,
    } = this.state;

    // const eventId = match.params.eventId;
    const userId = match.params.uid;
    const ensureStateUpToDate = () => {
      if (eventData && !this.state[EVENTNAME] && !this.state.statePreParsed) {
        this.setState({
          // eventData populated but state not up to date (before editing at least)
          existingImages: eventData.images, // old images that may be overwritten
          "End time": eventData["End time"],
          "Event Description": eventData["Event Description"],
          "Event Name": eventData["Event Name"],
          "Start time": eventData["Start time"],
          statePreParsed: true,
          repeats: eventData.repeats || false,
          goingnumber: this.props.eventData.goingnumber
            ? this.props.eventData.goingnumber
            : 0,
          uniqueSeen: this.props.eventData.uniqueSeen
            ? this.props.eventData.uniqueSeen
            : 0,
          isCanceled: this.props.eventData.isCanceled
            ? this.props.eventData.isCanceled
            : false, // this is sketchy
          categories: this.props.eventData.categories
            ? this.props.eventData.categories
            : {}, // this is sketchy
          ...eventData,
        });
      }
    };

    const values = {
      "End time": this.state["End time"],
      "end time": this.state["end time"],
      "Event Description": this.state["Event Description"],
      "Event Name": this.state["Event Name"],
      "Start time": this.state["Start time"],
      "start time": this.state["start time"],
      eventType:
        this.state["repeat interval"] || this.state.eventType || "oneTimeEvent", // naming discrepancy because it is named two different things in two DBs
      goingnumber: this.state.goingnumber,
      uniqueSeen: this.state.uniqueSeen,
      isCanceled: this.state.isCanceled,
      categories: this.state.categories,
      location: this.state.location,
      images: this.state.images,
      existingImages: this.state.existingImages,
      repeats: this.state.repeats,
      editingEvent: true,
      chooseLocation:
        userData.coordlat === this.state.location.lat &&
        userData.coordlong === this.state.location.lng
          ? "businessLocation"
          : "inputLocation",
    };

    const handleTimeChange = (input, time) => {
      // handle repeating events times
      if (values.eventType && values.eventType !== "oneTimeEvent") {
        if (input.toLowerCase() === "start time") {
          this.setState({
            "start time": isoStringToTimeOFDay(time),
          });
        }
        if (input.toLowerCase() === "end time") {
          this.setState({
            "end time": isoStringToTimeOFDay(time),
          });
        }
      }
    };

    const handleUpdateEventCancellation = (status) => {
      dispatch(
        updateEventCancellation(eventData.busuid, eventData.eventid, status)
      );
      // handleCancelEventDialog(false);
      // handleUnCancelEventDialog(false);
      // handlePullOnSuccessfulUpdate();
    };
    const epochToDate = (epoch) => {
      var d = new Date(epoch * 1000); // to  miliseconds
      return d.toString().slice(0, 21);
    };
    const handleEditEventDialog = (val) => {
      this.setState({
        editEventDialogState: val,
      });
    };
    const handleCancelEventDialog = (val) => {
      this.setState({
        cancelEventDialogState: val,
      });
    };

    const handleUnCancelEventDialog = (val) => {
      this.setState({
        unCancelEventDialogState: val,
      });
    };

    const collectImages = (images) => {
      this.setState({
        images,
      });
    };
    const handleChange = (input, value) => {
      this.setState({ [input]: value });
    };

    const handleChecked = (e) => {
      // Below applies to both start and end time
      // The mobile app creator chose to distinguish one time events from repeating events by storing them differently
      // One time events have their days values stored as epoch timestamps  with the key "Start time"
      // Repeating events have the key "start time" (lower case `s`) and value of midnight(today) minus the desired event time
      // the result of this a numerical value that can be added to the epoch of any day to resolve in the correct time
      // Example : midnight today + 81797  = today at 10:43 pm (with 17 seconds) - where 81797 is the resulting value of above calculation
      console.log(e.target.name);
      // var midnight = new Date(new Date().setHours(0, 0, 0, 0));
      switch (e.target.name) {
        case "oneTimeEvent":
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
      // for editing repeating events
      this.setState({ "repeat interval": e.target.name });
    };

    const handleSubmit = (data) => {
      dispatch(updateEvent(eventData.busuid, eventData.eventid, data));
      console.log(data);
    };
    // FIXME: THIS IS HANDLED IN REDUX EVENT ACTIONS, REMOVE THIS LINE BELOW AND LET IT MATCH THE EVENT CREATION CODE

    const handlePullOnSuccessfulUpdate = () => {
      dispatch(pullSpecificEvent(eventData.busuid, eventData.eventid));
    };

    const setSuccessSnack = (boolVal) => {
      this.setState({
        successSnackState: boolVal,
      });
    };

    const handleCloseSuccessSnackbar = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }

      setSuccessSnack(false);
    };
    const togglePlay = () => {
      this.vidRef.play();
      this.setState({ videoPlaying: !videoPlaying });
    };

    const generateChipTags = (incomingData) => {
      var week = [
        "sunday",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
      ];
      var chips = [];
      console.log(incomingData);

      Object.entries(incomingData).forEach(([key, value]) => {
        console.log(key, value);
        if (week.includes(key) && value === 1) {
          console.log(key, value);
          chips.push(key);
        }
      });
      return chips.map((key, value) => (
        // <Chip
        //   key={`category-tag-${key}`}
        //   style={{ marginRight: "0.5em" }}
        //   variant="outlined"
        //   color="primary"
        //   label={key}
        // />
        <Grid item xs={6} key={`category-tag-${key}`}>
          <div
            className="text-xs font-bold"
            style={{
              background: "#383D43",
              borderRadius: "8px",
              padding: "8px",
              color: "#FFFFFF",
            }}
          >
            {key}
          </div>
        </Grid>
      ));
    };

    const generateCancelledTag = (status) => {
      if (status === true) {
        return (
          // <Chip
          //   key={`cancelled-tag`}
          //   style={{
          //     marginRight: "1em",
          //     backgroundColor: "Red",
          //     color: "White",
          //   }}
          //   variant="outlined"
          //   label={"Cancelled"}
          //   onClick={() => {
          //     handleUnCancelEventDialog(true);
          //   }}
          // />
          <Button
            variant="contained"
            color="primary"
            style={{
              background: "#7950F3",
              borderRadius: "8px",
              marginTop: "40px",
            }}
            onClick={() => {
              handleUnCancelEventDialog(true);
            }}
          >
            Restart Event
          </Button>
        );
      } else {
        return <></>;
      }
    };
    // FIXME: validate match params and then determine what to return
    // IF(MATHC.PARAMS. UID && MATHC.PARAMS.EVENTID  IS NOT VALID){
    // RETURN  404 PAGE OR " LOOKS LIEK YOU'RE SEARCHING FOR A NONE EXISTENT EVENT"
    // }

    console.log("eventData: ", eventData);

    return (
      <div style={{ background: "#292C31", minHeight: "100vh" }}>
        <Helmet>
          <title>
            {eventData && eventData["Event Name"]
              ? eventData["Event Name"] + " : Happenin"
              : "Event : Happenin"}
          </title>
        </Helmet>
        <NavBar />
        {/* {!isUpdatingEvent && !errorUpdatingEvent && updatedEvent ? (
          <Redirect to={`/event/${eventData.busuid}/${eventData.eventId}`} />
        ) : (
          ""
        )} */}
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={successSnackState}
          autoHideDuration={5000}
          message={msg}
          onClose={handleCloseSuccessSnackbar}
        />
        <div className="w-full flex justify-center items-center py-20 xs:px-5 sm:px-20 md:px-48">
          <Grid
            container
            spacing={2}
            justifyContent="center"
            style={{
              background: "#383D43",
              borderRadius: "8px",
              padding: "20px",
              maxWidth: "1200px",
              position: "relative",
            }}
          >
            {eventData && eventData.isCanceled && (
              <>
                <div
                  className="absolute z-10 top-0 right-0 bottom-0 left-0 bg-gray-700 opacity-75"
                  style={{ borderRadius: "8px" }}
                />
                <div className="absolute z-20 top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center">
                  <div
                    className="text-red-600 text-4xl font-archivoBlack tracking-widest"
                    style={{
                      textShadow:
                        "1px 0 white, 0 1px white, 1px 0 white, 0 1px white",
                    }}
                  >
                    CANCELLED
                  </div>
                  {userData.uid === userId && (
                    <div>{generateCancelledTag(eventData.isCanceled)}</div>
                  )}
                </div>
              </>
            )}
            {!hideLocation && (
              <Grid
                item
                xs={12}
                className="flex justify-center items-center text-white"
              >
                <div className="w-full flex flex-wrap sm:justify-between xs:justify-center items-center">
                  <span
                    className="font-archivoBlack text-2xl xs:text-base text-center"
                    style={{
                      padding: "8px 40px",
                      borderRadius: "8px",
                      background: "#292C31",
                    }}
                  >
                    {eventData ? eventData[EVENTNAME] : "Loading ..."}{" "}
                    {/*{generateCancelledTag(eventData.isCanceled)}*/}
                  </span>
                  <span
                    className="flex justify-center items-center text-base xs:mt-2"
                    style={{ fontSize: "12px" }}
                  >
                    <Room
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#7950F3",
                        margin: "0 5px 3px 0",
                      }}
                    />
                    {distanceInKM(eventData?.dbData?.distance, 1) || "-.-"}
                    KM
                  </span>
                </div>
              </Grid>
            )}
            <Grid item xs={12} md={8}>
              <div
                style={{
                  width: "100%",
                  borderRadius: "8px",
                  background: "#292C31",
                  padding: "16px",
                }}
              >
                <Carousel
                  style={{
                    borderRadius: "8px",
                  }}
                  className={classes.carousel}
                  autoPlay={false}
                  indicators={true}
                  // navButtonsAlwaysVisible={true}
                  animation={"slide"}
                  activeIndicatorIconButtonProps={{
                    style: {
                      color: "#7950F3",
                    },
                  }}
                >
                  {Object.entries(
                    eventData && eventData.images
                      ? eventData.images
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
                          style={{ borderRadius: "8px" }}
                          // component="iframe"
                          // src={value || ""}
                          image={value || ""}
                          key={key}
                          title="image"
                        />
                      );
                    } else if (key.includes("video")) {
                      return (
                        <div
                          className={classes.videoContainer}
                          key={`vid-container-${key}`}
                        >
                          <CardMedia
                            // className={classes.media} // if you uncomment this, you 'force' aspect ratio and white borders
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
                          <Button onClick={togglePlay}>play/Pause</Button>
                          <div hidden={videoPlaying}>
                            <VideoPlayerPlay play={togglePlay} />
                          </div>
                        </div>
                      );
                    }
                  })}
                </Carousel>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              {userData.uid === userId ? (
                <div
                  style={{
                    padding: "16px",
                    borderRadius: "8px",
                    background: "#292C31",
                    marginBottom: "16px",
                  }}
                >
                  <Grid container spacing={2} justifyContent="space-between">
                    <Grid item xs={12} md={6}>
                      <Button // TODO: MAKE THIS AN ICON BUTTON
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          ensureStateUpToDate();
                          handleEditEventDialog(true);
                        }}
                        style={{
                          width: "100%",
                          background: "#7950F3",
                          borderRadius: "8px",
                        }}
                        className={`${classes.button} focus:outline-none`}
                        disabled={eventData.isCanceled}
                      >
                        Edit Event
                      </Button>
                      <Dialog
                        open={editEventDialogState}
                        onClose={() => {
                          handleEditEventDialog(false);
                        }}
                        className={classes.dialog}
                      >
                        <CreateEditEvent
                          // key={Date.now()}
                          setDialogState={handleEditEventDialog}
                          values={values}
                          successAction={handlePullOnSuccessfulUpdate}
                          setSuccessSnack={setSuccessSnack}
                          handleChange={handleChange}
                          handleChecked={handleChecked}
                          sendImagesAndVideosBack={collectImages}
                          handleSubmit={handleSubmit}
                          handleTimeChange={handleTimeChange}
                          loading={isUpdatingEventDB || isUpdatingEventFB}
                          success={
                            isEventSuccessfullyUpdatedDB &&
                            isEventSuccessfullyUpdatedFB
                          }
                          error={errorUpdatingEventDB || errorUpdatingEventFB}
                        />
                      </Dialog>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Button // TODO: MAKE THIS AN ICON BUTTON
                        variant="contained"
                        color="primary"
                        onClick={() => {
                          ensureStateUpToDate();
                          handleCancelEventDialog(true);
                        }}
                        style={{
                          width: "100%",
                          background: "red",
                          borderRadius: "8px",
                        }}
                        className={`${classes.button} focus:outline-none`}
                        disabled={eventData.isCanceled}
                      >
                        Cancel Event
                      </Button>
                      <Dialog
                        open={cancelEventDialogState}
                        onClose={() => {
                          handleCancelEventDialog(false);
                        }}
                      >
                        <Confirmation
                          title={`Cancel ${eventData["Event Name"]} ?`}
                          body={`Are you sure you want to cancel this annd every other occurence of this event?`}
                          confirmAction={() => {
                            handleUpdateEventCancellation(true); //cancel event
                          }}
                          cancelAction={() => {
                            handleCancelEventDialog(false);
                          }} // If they deccide against cancelling event
                          cancelText={"Nevermind"}
                          confirmText={"Yeah, cancel it."}
                          loading={isUpdatingEventDB || isUpdatingEventFB}
                          success={
                            isEventSuccessfullyUpdatedDB &&
                            isEventSuccessfullyUpdatedFB
                          }
                          error={errorUpdatingEventDB || errorUpdatingEventFB}
                          successAction={() => {
                            handleCancelEventDialog(false);
                            dispatch(cleanEventState());
                            handlePullOnSuccessfulUpdate();
                          }}
                        />
                      </Dialog>
                    </Grid>
                  </Grid>
                </div>
              ) : null}
              {eventData.categories &&
              eventData.categories.length &&
              Array.isArray(eventData.categories) ? (
                <div
                  style={{
                    padding: "16px",
                    borderRadius: "8px",
                    background: "#292C31",
                    marginBottom: "16px",
                  }}
                >
                  <div className="font-bold mb-2" style={{ color: "#7950F3" }}>
                    Categories
                  </div>
                  <Grid container spacing={2} justifyContent="space-between">
                    {eventData.categories.map((value, key) => {
                      return (
                        <Grid item xs={6} key={key}>
                          <div
                            className="text-xs"
                            style={{
                              background: "#383D43",
                              borderRadius: "8px",
                              padding: "8px",
                              color: "#FFFFFF",
                            }}
                          >
                            {value}
                          </div>
                        </Grid>
                      );
                    })}
                  </Grid>
                </div>
              ) : null}
              {eventData.repeats && (
                <div
                  style={{
                    padding: "16px",
                    borderRadius: "8px",
                    background: "#292C31",
                  }}
                >
                  <div className="font-bold mb-2" style={{ color: "#7950F3" }}>
                    Days
                  </div>
                  <Grid container spacing={2} justifyContent="space-between">
                    {generateChipTags(eventData.dbData)}
                  </Grid>
                  {eventData["repeat interval"] && (
                    <div className="w-full mt-2">
                      <Grid
                        container
                        spacing={2}
                        justifyContent="space-between"
                      >
                        <Grid item xs={6}>
                          <div
                            className="font-bold mb-2"
                            style={{ color: "#7950F3" }}
                          >
                            Time
                          </div>
                          <div
                            className="text-center font-bold"
                            style={{
                              background: "#383D43",
                              borderRadius: "8px",
                              padding: "8px",
                              color: "#FFFFFF",
                              fontSize: "10px",
                            }}
                          >
                            {eventData.repeats
                              ? convertTimeOfDayToDateObj(
                                  eventData["start time"]
                                ).toLocaleTimeString([], {
                                  hour12: true,
                                  timeStyle: "short",
                                }) +
                                // ? convertTimeOfDayToDateObj(eventData["start time"]).toString().slice(0, 21) +
                                " - " +
                                convertTimeOfDayToDateObj(
                                  eventData["end time"]
                                ).toLocaleTimeString([], {
                                  hour12: true,
                                  timeStyle: "short",
                                })
                              : // convertTimeOfDayToDateObj(eventData["end time"]).toString().slice(0, 21)

                                // if event is not repeating, generate time from epoch string
                                (eventData && eventData["Start time"]
                                  ? epochToDate(eventData["Start time"].seconds)
                                  : "Loading ...") +
                                " - " +
                                (eventData && eventData["End time"]
                                  ? epochToDate(eventData["End time"].seconds)
                                  : "Loading ...")}
                            {/* {Date(1606838449 * 1000).toLocaleString()} */}
                            {/* Nov 18, 13:00 - Nov 26, 23:30 */}
                          </div>
                        </Grid>
                        <Grid item xs={6}>
                          <div
                            className="font-bold mb-2"
                            style={{ color: "#7950F3" }}
                          >
                            Repeat
                          </div>
                          <div
                            className="text-xs font-bold"
                            style={{
                              background: "#383D43",
                              borderRadius: "8px",
                              padding: "8px",
                              color: "#FFFFFF",
                            }}
                          >
                            {eventData["repeat interval"]}
                          </div>
                        </Grid>
                      </Grid>
                    </div>
                  )}
                </div>
              )}
              <div
                style={{
                  padding: "16px",
                  borderRadius: "8px",
                  background: "#292C31",
                  marginTop: "16px",
                }}
              >
                <div className="font-bold mb-2" style={{ color: "#7950F3" }}>
                  Description
                </div>
                <div
                  className="text-xs"
                  style={{
                    background: "#383D43",
                    borderRadius: "8px",
                    padding: "8px",
                    color: "#FFFFFF",
                  }}
                >
                  {eventData ? eventData[EVENTDESCRIPTION] : "Loading ..."}
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isRetrievingEventFB: state.events.isRetrievingEventFB,
    isUpdatingEventFB: state.events.isUpdatingEventFB,
    isRetrievingEventDB: state.events.isRetrievingEventDB,
    isUpdatingEventDB: state.events.isUpdatingEventDB,
    isEventSuccessfullyUpdatedDB: state.events.isEventSuccessfullyUpdatedDB,
    isEventSuccessfullyUpdatedFB: state.events.isEventSuccessfullyUpdatedFB,
    errorUpdatingEventDB: state.events.errorUpdatingEventDB,
    errorUpdatingEventFB: state.events.errorUpdatingEventFB,
    updatedEvent: state.events.updatedEvent,
    eventData: {
      ...state.events.specificEventFB,
      dbData: { ...state.events.specificEventDB },
    },
    specificEventDB: state.events.specificEventDB, //already spread as DB data, but incse direct access is needed
    msg: state.events.msg,
    userData: state.auth.userData,
    userType: state.auth.userType,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(SingleEvent));

// <Grid
//   container
//   spacing={0}
//   direction="column"
//   alignItems="center"
//   justifyContent="center"
// >
//   <Grid container item>
//     <Grid item xs={12} md={3}></Grid>
//     <Grid item xs={12} md={6}>
//       <div className={classes.topMargin}>
//         {eventData && eventData[EVENTNAME] ? (
//           <Card>
//             {/* */}
//             <Carousel
//               autoPlay={false}
//               indicators={true}
//               // navButtonsAlwaysVisible={true}
//               animation={"slide"}
//             >
//               {Object.entries(
//                 eventData && eventData.images
//                   ? eventData.images
//                   : {
//                     image1:
//                       "https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e47vtzsd17u2b56t2rtt4mrw474d6e74cxihor1qzzi&rid=giphy.gif",
//                     image2:
//                       "https://media3.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif?cid=ecf05e47vtzsd17u2b56t2rtt4mrw474d6e74cxihor1qzzi&rid=giphy.gif",
//                   }
//               ).map(([key, value]) => {
//                 if (key.includes("image")) {
//                   return (
//                     <CardMedia
//                       className={classes.media}
//                       // component="iframe"
//                       // src={value || ""}
//                       image={value || ""}
//                       key={key}
//                       title="image"
//                     />
//                   );
//                 } else if (key.includes("video")) {
//                   return (
//                     <div
//                       className={classes.videoContainer}
//                       key={`vid-container-${key}`}
//                     >
//                       <CardMedia
//                         // className={classes.media} // if you uncomment this, you 'force' aspect ratio and white borders
//                         component="video"
//                         controls
//                         // src={value || ""}
//                         image={value || ""}
//                         key={key}
//                         title="image"
//                         onPause={() => {
//                           this.setState({ videoPlaying: false });
//                         }}
//                         ref={(el) => (this.vidRef = el)}
//                       />
//                       <Button onClick={togglePlay}>play/Pause</Button>
//                       <div hidden={videoPlaying}>
//                         <VideoPlayerPlay play={togglePlay} />
//                       </div>
//                     </div>
//                   );
//                 }
//               })}
//             </Carousel>
//
//             <CardContent>
//               <Grid
//                 container
//                 direction="row"
//                 justifyContent="space-between"
//                 alignItems="center"
//               >
//                 <Grid item>
//                   <Typography variant="h4">
//                     {eventData ? eventData[EVENTNAME] : "Loading ..."}{" "}
//                     {generateCancelledTag(eventData.isCanceled)}
//                   </Typography>
//                 </Grid>
//                 <Grid item>
//                   {eventData.repeats ? (
//                     <div>
//                       {generateChipTags(eventData.dbData)}
//                       <Chip
//                         style={{ marginRight: "2em" }}
//                         variant="outlined"
//                         color="primary"
//                         label={eventData["repeat interval"]}
//                       />
//                     </div>
//                   ) : (
//                     <></>
//                   )}
//                   {/* If the event has a category, display as chip tags  */}
//                   {eventData.categories &&
//                   Array.isArray(eventData.categories) ? (
//                     eventData.categories.map((key, value) => (
//                       <Chip
//                         key={`category-tag-${key}`}
//                         style={{ marginRight: "0.5em" }}
//                         color="primary"
//                         label={value}
//                       />
//                     ))
//                   ) : (
//                     <></>
//                   )}
//                 </Grid>
//
//                 <Grid item>
//                   <Typography variant="h5">
//                     <Room />{" "}
//                     {distanceInKM(eventData?.dbData?.distance, 1) ||
//                     "-.-"}{" "}
//                     KM
//                   </Typography>
//                 </Grid>
//               </Grid>
//               <Typography variant="body1">
//                 {eventData
//                   ? eventData[EVENTDESCRIPTION]
//                   : "Loading ..."}
//               </Typography>
//               <Typography variant="body2">
//                 <Event />
//                 {eventData.repeats
//                   ? convertTimeOfDayToDateObj(
//                   eventData["start time"]
//                   ).toLocaleTimeString() +
//                   // ? convertTimeOfDayToDateObj(eventData["start time"]).toString().slice(0, 21) +
//                   " - " +
//                   convertTimeOfDayToDateObj(
//                     eventData["end time"]
//                   ).toLocaleTimeString()
//                   : // convertTimeOfDayToDateObj(eventData["end time"]).toString().slice(0, 21)
//
//                   // if event is not repeating, generate time from epoch string
//                   (eventData && eventData["Start time"]
//                     ? epochToDate(eventData["Start time"].seconds)
//                     : "Loading ...") +
//                   " - " +
//                   (eventData && eventData["End time"]
//                     ? epochToDate(eventData["End time"].seconds)
//                     : "Loading ...")}
//                 {/* {Date(1606838449 * 1000).toLocaleString()} */}
//                 {/* Nov 18, 13:00 - Nov 26, 23:30 */}
//               </Typography>
//               <Typography variant="body2">
//                 <People />
//                 {/* {eventData
//                     ? eventData?  eventDate[0].uniqueSeen? eventDate[0].uniqueSeen.length : null : null : null
//                     : "Loading ..."}{" "}
//                   people visited */}
//               </Typography>
//             </CardContent>
//             <CardActions>
//               {userData.uid === userId ? (
//                 <div>
//                   <Button // TODO: MAKE THIS AN ICON BUTTON
//                     variant="outlined"
//                     color="primary"
//                     onClick={() => {
//                       ensureStateUpToDate();
//                       handleEditEventDialog(true);
//                     }}
//                     style={{ marginBottom: 5 }}
//                     disabled={eventData.isCanceled}
//                   >
//                     Edit Event
//                   </Button>
//                   <Dialog
//                     open={editEventDialogState}
//                     onClose={() => {
//                       handleEditEventDialog(false);
//                     }}
//                   >
//                     <CreateEditEvent
//                       // key={Date.now()}
//                       setDialogState={handleEditEventDialog}
//                       values={values}
//                       successAction={handlePullOnSuccessfulUpdate}
//                       setSuccessSnack={setSuccessSnack}
//                       handleChange={handleChange}
//                       handleChecked={handleChecked}
//                       sendImagesAndVideosBack={collectImages}
//                       handleSubmit={handleSubmit}
//                       handleTimeChange={handleTimeChange}
//                       loading={isUpdatingEventDB || isUpdatingEventFB}
//                       success={
//                         isEventSuccessfullyUpdatedDB &&
//                         isEventSuccessfullyUpdatedFB
//                       }
//                       error={
//                         errorUpdatingEventDB || errorUpdatingEventFB
//                       }
//                     />
//                   </Dialog>
//                   <Button // TODO: MAKE THIS AN ICON BUTTON
//                     variant="outlined"
//                     color="primary"
//                     onClick={() => {
//                       ensureStateUpToDate();
//                       handleCancelEventDialog(true);
//                     }}
//                     style={{ marginBottom: 5 }}
//                     disabled={eventData.isCanceled}
//                   >
//                     Cancel Event
//                   </Button>
//                   <Dialog
//                     open={cancelEventDialogState}
//                     onClose={() => {
//                       handleCancelEventDialog(false);
//                     }}
//                   >
//                     <Confirmation
//                       title={`Cancel ${eventData["Event Name"]} ?`}
//                       body={`Are you sure you want to cancel this annd every other occurence of this event?`}
//                       confirmAction={() => {
//                         handleUpdateEventCancellation(true); //cancel event
//                       }}
//                       cancelAction={() => {
//                         handleCancelEventDialog(false);
//                       }} // If they deccide against cancelling event
//                       cancelText={"Nevermind"}
//                       confirmText={"Yeah, cancel it."}
//                       loading={isUpdatingEventDB || isUpdatingEventFB}
//                       success={
//                         isEventSuccessfullyUpdatedDB &&
//                         isEventSuccessfullyUpdatedFB
//                       }
//                       error={
//                         errorUpdatingEventDB || errorUpdatingEventFB
//                       }
//                       successAction={() => {
//                         handleCancelEventDialog(false);
//                         dispatch(cleanEventState());
//                         handlePullOnSuccessfulUpdate();
//                       }}
//                     />
//                   </Dialog>{" "}
//                 </div>
//               ) : (
//                 <div></div>
//               )}
//             </CardActions>
//           </Card>
//         ) : (
//           <EventSkeleton />
//         )}
//       </div>
//       <div>
//         {/* UNCANCEL EVENT DIALOG,  doesn't matter where its placed */}
//
//         <Dialog
//           open={unCancelEventDialogState}
//           onClose={() => {
//             handleUnCancelEventDialog(false);
//           }}
//         >
//           <Confirmation
//             title={`Un-Cancel ${eventData["Event Name"]} ?`}
//             body={`This will reinstate this annd every other occurence of this event`}
//             confirmAction={() => {
//               handleUpdateEventCancellation(false); // re-enable event
//             }}
//             cancelAction={() => {
//               handleUnCancelEventDialog(false);
//             }} // If they deccide against un-cancelling event
//             cancelText={"Nevermind"}
//             confirmText={"Bring it back"}
//             loading={isUpdatingEventDB || isUpdatingEventFB}
//             success={
//               isEventSuccessfullyUpdatedDB &&
//               isEventSuccessfullyUpdatedFB
//             }
//             error={errorUpdatingEventDB || errorUpdatingEventFB}
//             successAction={() => {
//               handleUnCancelEventDialog(false);
//               dispatch(cleanEventState());
//               handlePullOnSuccessfulUpdate();
//             }}
//           />
//         </Dialog>
//       </div>
//     </Grid>
//     <Grid item xs={12} md={3}></Grid>
//   </Grid>
// </Grid>
