import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Carousel from "react-material-ui-carousel";
import VideoPlayer from "../reusable/VideoPlayer";
import {
  convertTimeOfDayToDateObj,
  epochToDate,
  isoStringToTimeOFDay,
} from "../../util/util";

import { Dialog, Button, Grid, CardMedia } from "@material-ui/core";
import EventNoteIcon from "@material-ui/icons/EventNote";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/Edit";

import { Info } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";

import CreateEditEvent from "./CreateEditEvent";
import { connect } from "react-redux";
import {
  cleanEventState,
  pullAllAuthBusinessUserEvents,
  updateEvent,
  updateEventCancellation,
} from "../../redux/actions";
import Confirmation from "../reusable/Confirmation";

function TabEventCard(props) {
  const { item, classes, dispatch, userData, isAuthUser } = props;
  const {
    isUpdatingEventDB,
    isUpdatingEventFB,
    isEventSuccessfullyUpdatedDB,
    isEventSuccessfullyUpdatedFB,
    errorUpdatingEventDB,
    errorUpdatingEventFB,
  } = props;
  const [editEventDialogState, setEditEventDialogState] = useState(false);
  const [cancelEventDialogState, setCancelEventDialogState] = useState(false);
  const [unCancelEventDialogState, setUnCancelEventDialogState] =
    useState(false);
  const [stateValues, setStateValues] = useState({
    ...item,
    eventType: item["repeat interval"] || item.eventType || "oneTimeEvent", // naming discrepancy because it is named two different things in two DBs
    existingImages: item.images, // old images that may be overwritten
    editingEvent: true,
    chooseLocation:
      userData.coordlat === item?.location?.lat &&
      userData.coordlong === item?.location?.lng
        ? "businessLocation"
        : "inputLocation",
    "end time": item["end time"],
    "start time": item["start time"],
  });

  const handleEditEventDialog = (val) => {
    setEditEventDialogState(val);
  };
  const handleCancelEventDialog = (val) => {
    setCancelEventDialogState(val);
  };

  const handleChange = (input, value) => {
    setStateValues({
      ...stateValues,
      [input]: value,
    });
  };

  const collectImages = (images) => {
    setStateValues({
      ...stateValues,
      images,
    });
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
        if (stateValues["start time"]) {
          delete stateValues["start time"];
          setStateValues({
            ...stateValues,
            "start time": null,
          });
        }
        if (stateValues["end time"]) {
          delete stateValues["end time"];
          setStateValues({
            ...stateValues,
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
        setStateValues({
          ...stateValues,
          "start time": isoStringToTimeOFDay(stateValues["Start time"]),
          "end time": isoStringToTimeOFDay(stateValues["End time"]),
        });
        break;
    }
    setStateValues({
      ...stateValues,
      eventType: e.target.name,
    });
    // for editing repeating events
    setStateValues({
      ...stateValues,
      "repeat interval": e.target.name,
    });
  };

  const handleTimeChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
    // handle repeating events times
    if (stateValues.eventType && stateValues.eventType !== "oneTimeEvent") {
      if (input.toLowerCase() === "start time") {
        this.setState({
          "start time": isoStringToTimeOFDay(e.target.value),
        });
      }
      if (input.toLowerCase() === "end time") {
        this.setState({
          "end time": isoStringToTimeOFDay(e.target.value),
        });
      }
    }
  };
  const handleSubmit = (data) => {
    dispatch(updateEvent(item.busuid, item.eventid, data));
    console.log(data);
  };

  const handlePullOnSuccessfulUpdate = () => {
    // dispatch(pullSpecificEvent(item.busuid, item.eventid));
    // opted to pull all events rather than go through the pain of mapping the specific updated event
    // to the card, this way anything that has changed will be updated immediately
    dispatch(pullAllAuthBusinessUserEvents(item.busuid));
  };

  const generateCancelledTag = (status) => {
    return (
      status && (
        <>
          <div
            style={{ borderRadius: "8px" }}
            className="absolute top-0 right-0 bottom-0 left-0 bg-gray-700 opacity-75 z-10"
          />
          <div
            className="absolute top-0 right-0 bottom-0 left-0 z-20
            flex flex-col justify-center items-center"
          >
            <div
              className="w-full flex justify-center items-center font-bold text-4xl tracking-widest"
              style={{ paddingBottom: "70px", color: "red" }}
            >
              CANCELLED
            </div>
            {/*<Chip*/}
            {/*  key={`cancelled-tag`}*/}
            {/*  style={{*/}
            {/*    backgroundColor: "#6661F2",*/}
            {/*    color: "White",*/}
            {/*  }}*/}
            {/*  variant="outlined"*/}
            {/*  label={"Restart Event"}*/}
            {/*  onClick={() => {*/}
            {/*    handleUnCancelEventDialog(true);*/}
            {/*  }}*/}
            {/*/>*/}
            {item.busuid === userData.uid && (
              <Button
                className="focus:outline-none"
                color="primary"
                variant="contained"
                key={`cancelled-tag`}
                style={{
                  backgroundColor: "#6661F2",
                  color: "#FFFFFF",
                  borderRadius: "8px",
                }}
                onClick={() => {
                  handleUnCancelEventDialog(true);
                }}
              >
                Restart Event
              </Button>
            )}
          </div>
        </>
      )
    );
  };

  const handleUpdateEventCancellation = (status) => {
    dispatch(updateEventCancellation(item.busuid, item.eventid, status));
  };

  const handleUnCancelEventDialog = (val) => {
    setUnCancelEventDialogState(val);
  };
  return (
    <Grid item xs={12} sm={8} md={4} lg={3} xl={2}>
      <div
        className="relative w-full flex flex-col justify-center items-center text-white shadow-lg"
        style={{ padding: "16px", background: "#383D43", borderRadius: "8px" }}
      >
        <Carousel
          className={`${classes.carousel} w-full`}
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
                <Link
                  to={`/event/${item.busuid}/${item.eventId || item.eventid}`}
                  key={key}
                >
                  <CardMedia
                    className={classes.media}
                    // src={value || ""}
                    image={value || ""}
                    key={key}
                    title="image"
                  />
                </Link>
              );
            } else if (key.includes("video")) {
              return (
                <div key={key}>
                  <VideoPlayer videoSrc={value} key={key} />
                </div>
              );
            }
          })}
        </Carousel>
        <div
          className="w-full flex justify-center items-center"
          style={{ marginTop: "8px" }}
        >
          <div className="text-lg font-bold">
            <Link to={`/event/${item.busuid}/${item.eventId || item.eventid}`}>
              {item["Event Name"]}
            </Link>
          </div>
          {/*<div className="flex justify-center items-center">*/}
          {/* <LocationOnIcon
              style={{ color: "#7950F3", width: "16px", height: "16px" }}
            />
            <span className="ml-1 text-xs">0.6 Km</span> */}
          {/*</div>*/}
        </div>
        <div
          className="w-full flex justify-center items-center text-xs"
          style={{
            color: "#ABABAB",
            marginBottom: "14px",
          }}
        >
          {item["Event Description"]}
        </div>
        <div className="w-full flex justify-start items-center text-xs">
          <EventNoteIcon
            style={{ color: "#7950F3", width: "16px", height: "16px" }}
          />
          <span className="ml-1" style={{ fontSize: "9px" }}>
            {item.repeats
              ? convertTimeOfDayToDateObj(
                  item["start time"]
                ).toLocaleTimeString([], { hour12: true, timeStyle: "short" }) +
                " - " +
                convertTimeOfDayToDateObj(item["end time"]).toLocaleTimeString(
                  [],
                  { hour12: true, timeStyle: "short" }
                )
              : // if event is not repeating, generate time from epoch string
                (item && item["Start time"]
                  ? epochToDate(item["Start time"].seconds)
                  : "Loading ...") +
                " - " +
                (item && item["End time"]
                  ? epochToDate(item["End time"].seconds)
                  : "Loading ...")}
          </span>
        </div>
        {isAuthUser && (
          <Grid
            container
            spacing={1}
            justifyContent="center"
            style={{
              fontSize: "10px",
              marginTop: "8px",
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
                    <div>{item?.clickednumber || 0}</div>
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
                    <div>{item?.savedforlater || 0}</div>
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
                    <div>{item?.seennumber || 0}</div>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
        {/*<div*/}
        {/*  className="w-full flex justify-end items-start"*/}
        {/*>*/}
        {/*<div className="flex justify-center items-center">*/}
        {/*  <People*/}
        {/*    style={{ color: "#7950F3", width: "16px", height: "16px" }}*/}
        {/*  />*/}
        {/*  <span className="ml-1">{item.goingnumber} People visited</span>*/}
        {/*</div>*/}
        {/*<div className={classes.btnActions}>*/}
        {/*  <Link to={`/event/${item.busuid}/${item.eventId || item.eventid}`}>*/}
        {/*    <IconButton>*/}
        {/*      <Info*/}
        {/*        style={{ color: "#7950F3", width: "20px", height: "20px" }}*/}
        {/*      />*/}
        {/*    </IconButton>*/}
        {/*  </Link>*/}
        {/*<IconButton>*/}
        {/*  <ConfirmationNumber*/}
        {/*    className={classes.ticket}*/}
        {/*    style={{ color: "#7950F3", width: "20px", height: "20px" }}*/}
        {/*  />*/}
        {/*</IconButton>*/}
        {/*<IconButton>*/}
        {/*  <Message*/}
        {/*    style={{ color: "#7950F3", width: "20px", height: "20px" }}*/}
        {/*  />*/}
        {/*</IconButton>*/}
        {/*  </div>*/}
        {/*</div>*/}
        {!item.isCanceled && isAuthUser && (
          <div className="w-full flex justify-between items-center">
            <div className="flex justify-start items-center">
              <div
                className="flex justify-center items-center cursor-pointer"
                style={{
                  background: "#292C31",
                  borderRadius: "8px",
                  padding: "5px 10px",
                }}
                onClick={() => {
                  // ensureStateUpToDate();
                  handleEditEventDialog(true);
                }}
              >
                <EditIcon style={{ width: "16px", height: "16px" }} />
                <span className="ml-1 text-xs">Edit Event</span>
              </div>
              <Dialog
                className={classes.dialog}
                open={editEventDialogState}
                onClose={() => {
                  handleEditEventDialog(false);
                }}
              >
                <CreateEditEvent
                  // key={Date.now()}
                  setDialogState={handleEditEventDialog}
                  values={stateValues}
                  successAction={handlePullOnSuccessfulUpdate}
                  handleChange={handleChange}
                  handleChecked={handleChecked}
                  sendImagesAndVideosBack={collectImages}
                  handleSubmit={handleSubmit}
                  handleTimeChange={handleTimeChange}
                  loading={isUpdatingEventDB || isUpdatingEventFB}
                  success={
                    isEventSuccessfullyUpdatedDB && isEventSuccessfullyUpdatedFB
                  }
                  error={errorUpdatingEventDB || errorUpdatingEventFB}
                />
              </Dialog>
              <div
                className="flex justify-center items-center ml-2 cursor-pointer"
                style={{
                  background: "#292C31",
                  borderRadius: "8px",
                  padding: "5px 10px",
                }}
                onClick={() => {
                  handleCancelEventDialog(true);
                }}
              >
                <CloseIcon style={{ width: "16px", height: "16px" }} />
                <span className="ml-1 text-xs">Cancel Event</span>
              </div>
              <Dialog
                open={cancelEventDialogState}
                onClose={() => {
                  handleCancelEventDialog(false);
                }}
              >
                <Confirmation
                  title={`Cancel ${item["Event Name"]} ?`}
                  body={`Are you sure you want to cancel this and every other occurence of this event?`}
                  confirmAction={() => {
                    handleUpdateEventCancellation(true);
                  }}
                  cancelAction={() => {
                    handleCancelEventDialog(false);
                  }} // If they deccide against cancelling event
                  cancelText={"Nevermind"}
                  confirmText={"Yeah, cancel it."}
                  loading={isUpdatingEventDB || isUpdatingEventFB}
                  success={
                    isEventSuccessfullyUpdatedDB && isEventSuccessfullyUpdatedFB
                  }
                  error={errorUpdatingEventDB || errorUpdatingEventFB}
                  successAction={() => {
                    handleCancelEventDialog(false);
                    dispatch(cleanEventState());
                    handlePullOnSuccessfulUpdate();
                  }}
                />
              </Dialog>
            </div>
            <div className={classes.btnActions}>
              <Link
                to={`/event/${item.busuid}/${item.eventId || item.eventid}`}
              >
                <IconButton className="focus:outline-none">
                  <Info
                    style={{ color: "#7950F3", width: "20px", height: "20px" }}
                  />
                </IconButton>
              </Link>
            </div>
          </div>
        )}
        {generateCancelledTag(item.isCanceled)}
        <div>
          {/* UNCANCEL EVENT DIALOG,  doesn't matter where its placed */}

          <Dialog
            open={unCancelEventDialogState}
            onClose={() => {
              handleUnCancelEventDialog(false);
            }}
          >
            <Confirmation
              title={`Un-Cancel ${item["Event Name"]} ?`}
              body={`This will reinstate this annd every other occurence of this event`}
              confirmAction={() => {
                handleUpdateEventCancellation(false); // close dialog, then successAction is triggered
              }}
              cancelAction={() => {
                handleUnCancelEventDialog(false);
              }} // If they deccide against cancelling event
              cancelText={"Nevermind"}
              confirmText={"Bring it back"}
              loading={isUpdatingEventDB || isUpdatingEventFB}
              success={
                isEventSuccessfullyUpdatedDB && isEventSuccessfullyUpdatedFB
              }
              error={errorUpdatingEventDB || errorUpdatingEventFB}
              successAction={() => {
                handleUnCancelEventDialog(false);
                dispatch(cleanEventState());
                handlePullOnSuccessfulUpdate();
              }}
            />
          </Dialog>
        </div>
        {/*<div className="w-full flex justify-start items-center text-xs" style={{ padding: "0 10px" }}>*/}
        {/*  <Typography component="p" variant="button">*/}
        {/*    /!*<People />: {item.goingnumber}*!/*/}
        {/*    <Bookmark />: -{" "}*/}
        {/*    <Visibility />*/}
        {/*    {item.uniqueSeen ? item.uniqueSeen.length : ""} <Mouse />: -{" "}*/}
        {/*  </Typography>*/}
        {/*</div>*/}
      </div>
    </Grid>
  );
}

TabEventCard.propTypes = {
  children: PropTypes.node,
  item: PropTypes.object.isRequired,
  classes: PropTypes.any.isRequired,
  isAuthUser: PropTypes.bool.isRequired,
};

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

export default connect(mapStateToProps)(TabEventCard);
