import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
// import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { pullAllAuthBusinessUserEvents } from "../../redux/actions/events";
import Box from "@material-ui/core/Box";
import { IconButton, Typography, Grid } from "@material-ui/core";
import { connect } from "react-redux";
import RefreshIcon from "@material-ui/icons/Refresh";

import noEventImage from "../../pages/assets/FireIcon.png";

import TabEventCard from "./TabEventCard";

// TODO:  this is genrally wrong - need to consider what days event repeats on and such
// const generateDateForRepeatingEvent = (slicedTime) => {
//   var midnight = new Date(new Date().setHours(0, 0, 0, 0));
//   var dateObj = new Date(midnight.valueOf() + slicedTime);
//   return dateObj.toString().slice(0, 21);
// };

function TabPanel(props) {
  const { children, value, index, loading, ...other } = props;
  return loading ? (
    <></>
  ) : (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`events-tabpanel-${index}`}
      aria-labelledby={`events-tab-${index}`}
      style={{ overflow: "auto" }}
      {...other}
    >
      {value === index && (
        <Box p={3} component="div" overflow="hidden">
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  loading: PropTypes.bool.isRequired,
};

const StyledTabs = withStyles({
  root: {
    borderBottom: "1px solid #383D43",
  },
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      width: "100%",
      // backgroundColor: '#635ee7',
      backgroundColor: "#6661F2",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    padding: "8px",
    textTransform: "none",
    color: "#fff",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
      outline: "none",
      color: "#6661F2",
    },
    "&$selected": {
      color: "#6661F2",
      fontWeight: theme.typography.fontWeightMedium,
    },
    selected: {},
  },
}))((props) => <Tab disableRipple {...props} />);

function a11yProps(index) {
  return {
    id: `events-tab-${index}`,
    "aria-controls": `events-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    display: "flex",
  },
  media: {
    // width: "10rem",
    // height: "10rem",
    height: "250px",
    width: "100%",
    borderRadius: "8px",
    backgroundSize: "contain",
  },
  carousel: {
    "& button:focus": {
      outline: "none",
    },
    backgroundColor: "#292C31",
    padding: "8px",
    borderRadius: "8px",
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
}));

export const renderNoAnyEventsToDisplay = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <img
        src={noEventImage}
        alt="No events to display"
        style={{
          display: "block",
          maxWidth: "300px",
          height: "auto",
          borderRadius: "8px",
        }}
      />
      <span className="text-white text-3xl">No Any events to display</span>
    </div>
  );
};

function AllEventsTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  useEffect(() => {
    dispatch(pullAllAuthBusinessUserEvents(props.userData.uid));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userData.uid]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { allEvents, isRetrievingEvent, dispatch, userData } = props;
  // this is true because allEvents Tab should ONLY be rendered on the profiel of the  user logged in
  const isAuthUser = true;
  return (
    <div className="relative">
      <div className="z-10 absolute right-1 cursor-pointer xs:hidden sm:block">
        <IconButton
          className="focus:outline-none"
          onClick={(e) => {
            dispatch(pullAllAuthBusinessUserEvents(userData.uid));
          }}
        >
          <RefreshIcon style={{ color: "#FFC107" }} />
        </IconButton>
      </div>
      <StyledTabs
        value={value}
        onChange={handleChange}
        aria-label="Event tabs"
        centered
      >
        <StyledTab label="One-Time" {...a11yProps(0)} />
        <StyledTab label="Repeating" {...a11yProps(1)} />
        <StyledTab label="Cancelled" {...a11yProps(2)} />
      </StyledTabs>
      <TabPanel value={value} index={0} loading={isRetrievingEvent}>
        {isRetrievingEvent ? (
          <div>Loading your past events...</div>
        ) : (
          <div className="w-full flex flex-col">
            <div className="w-full">
              {allEvents &&
                allEvents.activeEvents &&
                allEvents.activeEvents.length > 0 && (
                  <Typography
                    component="span"
                    variant="button"
                    style={{ color: "#ABABAB" }}
                  >
                    Active Events
                  </Typography>
                )}
              <Grid container spacing={2} justifyContent="center">
                {allEvents &&
                  allEvents.activeEvents &&
                  allEvents.activeEvents.length > 0 &&
                  allEvents.activeEvents.map((item, index) => (
                    <TabEventCard
                      key={index}
                      item={item}
                      classes={classes}
                      isAuthUser={isAuthUser}
                    />
                  ))}
              </Grid>
            </div>
            <div className="w-full">
              {allEvents &&
                allEvents.pastEvents &&
                allEvents.pastEvents.length > 0 && (
                  <Typography
                    component="span"
                    variant="button"
                    style={{ color: "#ABABAB" }}
                  >
                    Past Events
                  </Typography>
                )}
              <Grid container spacing={2} justifyContent="center">
                {allEvents &&
                  allEvents.pastEvents &&
                  allEvents.pastEvents.length > 0 &&
                  allEvents.pastEvents.map((item, index) => (
                    <TabEventCard
                      key={index}
                      item={item}
                      classes={classes}
                      isAuthUser={isAuthUser}
                    />
                  ))}
              </Grid>
            </div>
            <div className="w-full">
              {(!allEvents ||
                !allEvents.activeEvents ||
                !allEvents.activeEvents.length) &&
                (!allEvents ||
                  !allEvents.pastEvents ||
                  !allEvents.pastEvents.length) &&
                renderNoAnyEventsToDisplay()}
            </div>
          </div>
        )}
      </TabPanel>
      <TabPanel value={value} index={1} loading={isRetrievingEvent}>
        {isRetrievingEvent ? (
          <div>Loading your active events...</div>
        ) : (
          <div className="w-full flex flex-col">
            <div className="w-full">
              {allEvents &&
                allEvents.weeklyEvents &&
                allEvents.weeklyEvents.length && (
                  <Typography
                    component="span"
                    variant="subtitle2"
                    style={{ color: "#ABABAB" }}
                  >
                    Weekly Events
                  </Typography>
                )}
              <Grid container spacing={2} justifyContent="center">
                {allEvents &&
                  allEvents.weeklyEvents &&
                  allEvents.weeklyEvents.length > 0 &&
                  allEvents.weeklyEvents.map((item, index) => (
                    <TabEventCard
                      key={index}
                      item={item}
                      classes={classes}
                      isAuthUser={isAuthUser}
                    />
                  ))}
              </Grid>
            </div>
            <div className="w-full">
              {allEvents &&
                allEvents.repeatingEvents &&
                allEvents.repeatingEvents.length > 0 && (
                  <Typography
                    component="span"
                    variant="button"
                    style={{ color: "#ABABAB" }}
                  >
                    Active Repeating Events
                  </Typography>
                )}
              <Grid container spacing={2} justifyContent="center">
                {allEvents &&
                  allEvents.repeatingEvents &&
                  allEvents.repeatingEvents.length > 0 &&
                  allEvents.repeatingEvents.map((item, key) => (
                    <TabEventCard
                      key={key}
                      item={item}
                      classes={classes}
                      isAuthUser={isAuthUser}
                    />
                  ))}
              </Grid>
            </div>
            <div className="w-full">
              {(!allEvents ||
                !allEvents.weeklyEvents ||
                !allEvents.weeklyEvents.length) &&
                (!allEvents ||
                  !allEvents.repeatingEvents ||
                  !allEvents.repeatingEvents.length) &&
                renderNoAnyEventsToDisplay()}
            </div>
          </div>
        )}
      </TabPanel>
      <TabPanel value={value} index={2} loading={isRetrievingEvent}>
        {isRetrievingEvent ? (
          <div>Loading your cancelled events...</div>
        ) : (
          <div className="w-full flex flex-col">
            <div className="w-full">
              {allEvents &&
                allEvents.cancelledEvents &&
                allEvents.cancelledEvents.length > 0 && (
                  <Typography
                    component="span"
                    variant="button"
                    style={{ color: "#ABABAB" }}
                  >
                    Cancelled Events
                  </Typography>
                )}
              <Grid container spacing={2} justifyContent="center">
                {allEvents &&
                  allEvents.cancelledEvents &&
                  allEvents.cancelledEvents.length > 0 &&
                  allEvents.cancelledEvents.map((item, index) => (
                    <TabEventCard
                      key={index}
                      item={item}
                      classes={classes}
                      isAuthUser={isAuthUser}
                    />
                  ))}
              </Grid>
            </div>
            <div className="w-full">
              {(!allEvents ||
                !allEvents.cancelledEvents ||
                !allEvents.cancelledEvents.length) &&
                renderNoAnyEventsToDisplay()}
            </div>
          </div>
        )}
      </TabPanel>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isRetrievingEvent: state.events.isRetrievingEvent,
    allEvents: state.events.allEvents,
    userData: state.auth.userData,
    userType: state.auth.userType,
  };
}

export default connect(mapStateToProps)(AllEventsTabs);

// function EventCard(props) {
//   const { children, item, classes } = props;
//   return (
//     <div>
//       <div className={classes.singleEvent}>
//         <Link to={`/event/${item.busuid}/${item.eventId}`}>
//           <Card className={classes.cardRoot}>
//             <CardMedia
//               className={classes.media}
//               image={
//                 item.images.image1 ||
//                 "https://firebasestorage.googleapis.com/v0/b/happening-82070.appspot.com/o/WebAppFiles%2Fundraw_festivities_tvvj.svg?alt=media&token=f799537d-f039-415e-a5ce-d347a4464bbb"
//               }
//               title={item["Event Name"]}
//             />
//             <div className={classes.details}>
//               <CardActionArea>
//                 <CardContent className={classes.content}>
//                   <Typography variant="subtitle2" color="textSecondary">
//                     {item.repeats
//                       ? convertTimeOfDayToDateObj(
//                       item["start time"]
//                       ).toLocaleTimeString() +
//                       " - " +
//                       convertTimeOfDayToDateObj(
//                         item["end time"]
//                       ).toLocaleTimeString()
//                       : // if event is not repeating, generate time from epoch string
//                       (item && item["Start time"]
//                         ? epochToDate(item["Start time"].seconds)
//                         : "Loading ...") +
//                       " - " +
//                       (item && item["End time"]
//                         ? epochToDate(item["End time"].seconds)
//                         : "Loading ...")}
//                   </Typography>
//                   <Typography component="h6" variant="h6">
//                     {item["Event Name"]}
//                   </Typography>
//                   <div className={classes.metrics}>
//                     <Typography component="p" variant="button">
//                       <People />: {item.goingnumber} <Bookmark />: -{" "}
//                       <Visibility />
//                       {item.uniqueSeen ? item.uniqueSeen.length : ""} <Mouse />: -{" "}
//                     </Typography>
//                   </div>
//                 </CardContent>
//               </CardActionArea>
//             </div>
//             {children}
//           </Card>
//         </Link>
//       </div>
//     </div>
//   );
// }

// {/* This code below should technically never render as of 2021-03-28, leaving in here as startup tends to be indecisive with features. */}
// {allEvents &&
// allEvents.weeklyEvents &&
// allEvents.weeklyEvents.length > 0 ? (
//   <div>
//     <Typography component="span" variant="subtitle2">
//       Weekly Events
//     </Typography>
//     {allEvents.weeklyEvents.map((item, index) => (
//       <EventCard
//         key={index}
//         item={item}
//         classes={classes}
//       ></EventCard>
//     ))}{" "}
//     <hr />
//   </div>
// ) : (
//   <div></div>
// )}
//
// {allEvents &&
// allEvents.repeatingEvents &&
// allEvents.repeatingEvents.length > 0 ? (
//   allEvents.repeatingEvents.length > 0 ? (
//     <div>
//       <Typography component="span" variant="button">
//         Active Repeating Events
//       </Typography>
//       <br /> <hr /> <br />
//       {allEvents.repeatingEvents.map((item, key) => (
//         <EventCard
//           key={key}
//           item={item}
//           classes={classes}
//         ></EventCard>
//       ))}
//     </div>
//   ) : (
//     <div></div>
//   )
// ) : (
//   ""
// )}

// {allEvents &&
// allEvents.cancelledEvents &&
// allEvents.cancelledEvents.length > 0
//   ? allEvents.cancelledEvents.map((item, index) => (
//     <EventCard
//       key={index}
//       item={item}
//       classes={classes}
//     ></EventCard>
//   ))
//   : "No events to display"}
