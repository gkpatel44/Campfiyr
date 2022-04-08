import React, { Component } from "react";
import NavBar from "../Components/NavBar";
import { Grid, Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
// import Avatar from "@material-ui/core/Avatar";
// import AllNearbyEvents from "../Components/dashboard/AllNearbyEvents";
import { connect } from "react-redux";
import {
  get_AllEventsInRange,
  getSpecificEvent,
  setDashboardLocation,
  getProductCategoryForUser,
} from "../redux/actions";
import VerticalEventCard from "../Components/reusable/VerticalEventCard";
import { Helmet } from "react-helmet";
import EventSkeleton from "../Components/reusable/EventSkeleton";
import { Waypoint } from "react-waypoint";
import { EVENTNAME, EVENT_ID } from "../util/keywords";
import LocationManager from "../Components/dashboard/LocationManager";
import { getUserOrBusinessData } from "../redux/actions/user";
import EventFilters from "../Components/dashboard/EventFilters";
import RenderVerticalEventCards from "../Components/RenderVerticalEventCards";
import { firebaseAnalytics } from "../firebase/firebase";
// import auth from "../redux/reducers/auth";
import { isEmptyString } from "../util/util";
import { Box, makeStyles, Tab, Tabs, IconButton } from "@material-ui/core";
import PropTypes from 'prop-types';
import ProductTab from "../Components/dashboard/ProductTab";
import Container from '@material-ui/core/Container';



const styles = (theme) => ({

  tab: {
    '& .MuiBox-root': {
      padding: '5px',
    },
  },
  root: {
    padding: "2em",
    background: "#292C31",
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    // alignItems: "center"
  },
  stories: {
    display: "flex",
    "& > *": {
      margin: "5px",
    },
  },
  paper: {
    padding: 2,
    // margin: "2em",
    textAlign: "center",
    // backgroundColor: "gray",
    // color: "white",
  },
  large: {
    width: 75,
    height: 75,
  },
  leftSpace: {
    marginLeft: "1.5rem",
  },
  eventCards: {
    // marginTop: 15,
    // marginBottom: 30,
    // paddingBottom: 25,
    height: "100%",
  },
  noEventCard: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    // minHeight: "500px",
    maxWidth: "300px",
    width: "auto",
    height: "auto",
  },

  subNavbar: {
    color: "#FFFFFF",
    background: " #383D43",
    borderRadius: "8px"
  },
  default_tabStyle: {
    color: '#FFFFFF',
    fontSize: "18px",
    fontFamily: 'Roboto',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: '18px',
    lineHeight: '21px',
    color: '#FFFFFF',
    opacity: '0.3'
    // backgroundColor: 'blue',
  },

  active_tabStyle: {
    fontSize: "18px",
    color: '#7950F3',
    // backgroundColor: 'red',
  }
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      style={{ padding: "0px" }}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


class Dashboard extends Component {





  state = {
    /*
      locationBasedEvents :  is for local state and is mutated durign the life span of the dashboard.
      loactionEvents: is from the global redux state and is not altered by the dashboard.
    */
    locationBasedEvents: [], //
    location: this.props.dashboardLocation || {},
    category: "",
    categoryAsArray: [],
    range: 8000,
    limit: 20,
    value: 0
  };
  componentDidMount() {
    // eslint-disable-next-line no-unused-vars
    const { dispatch } = this.props;
    //TODO:  NEED TO CHANGE THIS/ add a falllback TO A LOCATION SERVICE TO TAKE BRWSER LOCATION OR IP ADDRESS OR POSTAL CODE
    //TODO: https://medium.com/trabe/rendering-different-react-components-depending-on-the-users-geographic-location-99d321ed0959
    // https://docs.ipdata.co/use-cases/html5-geolocation-with-ipdata-fallback
    // https://blog.logrocket.com/detect-location-and-local-timezone-of-users-in-javascript-3d9523c011b9/

    dispatch(getProductCategoryForUser());

    // Location permission is included as part of location manager component no need to duplicate on dashboard
    if (this.state.location.lat && this.state.location.lng) {
      this.refreshCards();
    }
    firebaseAnalytics.logEvent("page_Dashboard", {
      user_signed_in: !isEmptyString(this.props.authData.uid),
    });
  }

  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
  };
  /**
   * Forcing local state to match with global application state
   * Will be rewritten soon
   */
  matchStateWithRedux = () => {
    if (
      this.state.locationBasedEvents.length === 0 ||
      this.state.locationBasedEvents === null ||
      this.state.locationBasedEvents[0].id !== this.props.locationEvents[0].id
    ) {
      //console.log("This state code should only be executed once "); // should only happen one time
      this.setState({
        locationBasedEvents: this.props.locationEvents,
      });
    }
  };

  /** Triggered by 'Waypoint' when a user scrolls into an unpopulated event
   *  Will be rewritten soon
   * @param {Object} eventItem
   * @param {Number} index
   */
  populateEvent = async (eventItem, index) => {
    this.matchStateWithRedux();
    // if the current event does not have an event name i.e it has not been pulled down already
    // In case if the data is not present in PHP, the card will be populaed partially, in such scenario hide
    // the card, check for userData in such case
    if (
      this.state.locationBasedEvents[index] &&
      !this.state.locationBasedEvents[index][EVENTNAME] &&
      !this.state.locationBasedEvents[index].userData
    ) {
      await getSpecificEvent(eventItem.business_id, eventItem.event_id).then(
        (data) => {
          this.setState((state) => {
            const locationBasedEvents = state.locationBasedEvents.map(
              (item, j) => {
                if (j === index) {
                  return { ...item, ...data };
                } else {
                  return item;
                }
              }
            );

            return {
              locationBasedEvents,
            };
          });
        }
      );

      await getUserOrBusinessData(eventItem.business_id).then((data) => {
        this.setState((state) => {
          const locationBasedEvents = state.locationBasedEvents.map(
            (item, j) => {
              if (j === index) {
                return { ...item, userData: { ...data } };
              } else {
                return item;
              }
            }
          );

          return {
            locationBasedEvents,
          };
        });
      });
    }
    // if distance changed but was not update/does not match, update the value
    if (
      this.state.locationBasedEvents[index] &&
      this.props.locationEvents[index] &&
      this.state.locationBasedEvents[index].distance !==
      this.props.locationEvents[index].distance
    ) {
      this.state.locationBasedEvents[index].distance =
        this.props.locationEvents[index].distance;
      this.setState((state) => {
        const locationBasedEvents = state.locationBasedEvents.map((item, j) => {
          if (j === index) {
            return { ...item, ...this.props.locationEvents[index] };
          } else {
            return item;
          }
        });

        return {
          locationBasedEvents,
        };
      });
    }
  };
  /** Helper function passed down to 'LocationManager' Component for
   *  extracting location data in parent (this) component
   *
   * @param {Object} position
   */
  handleLocationUpdate = (position) => {
    const { dispatch } = this.props;
    dispatch(setDashboardLocation(position));
    this.setState(
      {
        location: position,
      },
      this.refreshCards
    );
  };

  triggerOverlay = (bool) => {
    this.setState({
      overlay: bool,
    });
  };

  refreshPage = () => {
    window.location.reload();
  };
  updateCategory = (name, bool) => {
    if (bool) {
      this.setState((state) => {
        const list = [...new Set(state.categoryAsArray.concat(name))]; // add new item and remove duplicates

        var asText = list?.toString();
        // list.map((item, index) => {
        //   asText.concat(`${(index ? ", " : "") + item}`);
        //   return ``;
        // });
        return {
          category: asText,
          categoryAsArray: list,
        };
      }, this.refreshCards); // callback, refresh cards
    } else {
      this.setState((state) => {
        const list = state.categoryAsArray.filter((item, j) => item !== name);
        var asText = list?.toString();
        return {
          category: asText,
          categoryAsArray: list,
        };
      }, this.refreshCards);
    }
  };

  updateRange = (val) => {
    var inKM = val * 1000;
    this.setState({ range: inKM }, this.refreshCards);
  };

  updateLimitCount = (num) => {
    this.setState({ limit: num }, this.refreshCards); // callback, refreshcards once state has been updated
  };

  refreshCards = () => {
    const { dispatch } = this.props;
    const { location, range, category, limit } = this.state;
    this.setState({ locationBasedEvents: [] }); // clear old items
    dispatch(
      get_AllEventsInRange({
        latitude: location.lat,
        longitude: location.lng,
        range,
        category,
        page: 1,
        limit,
      })
    );
    firebaseAnalytics.logEvent("dashboard_update", {
      location,
      range,
      category,
    });
  };

  render() {
    const { classes } = this.props;
    const {
      locationEvents,
      isRetrievingLocationEvents,
      errorRetrievingLocationEvents,
    } = this.props;
    const { locationBasedEvents } = this.state;

    return (
      <div>
        <Helmet>
          <title>Dashboard | Campfiyr</title>
        </Helmet>

        <NavBar />

        <div className={classes.root}>
          <Container maxWidth="lg">

            <div>
              {/* Grid row container of 3 items */}
              <Box sx={{ color: "#383D43" }}  >
                <Box sx={{ borderBottom: 1, borderColor: 'divider', background: '#383D43', borderRadius: "8px", margin: "0px -1px 0px 5px" }}>
                  <Tabs
                    variant="fullWidth"
                    aria-label="basic tabs example"
                    value={this.state.value}
                    onChange={this.handleChange}
                    TabIndicatorProps={{ style: { background: "#7950F3" } }}
                    className={classes.subNavbar}
                    nkBarStyle={{ background: 'red' }}

                  >
                    <Tab label="Events" {...a11yProps(0)} className={this.state.value === 0 ? classes.active_tabStyle : classes.default_tabStyle} />
                    <Tab label="Products" {...a11yProps(1)} className={this.state.value === 1 ? classes.active_tabStyle : classes.default_tabStyle} />
                    {/* <Tab label="Products" {...a11yProps(2)} /> */}

                  </Tabs>
                </Box>

                {/****************tabpanel:1****************************/}
                <TabPanel value={this.state.value} index={0} className={classes.tab}>
                  <Grid
                    // container
                    justifyContent="center"
                    // spacing={2}
                    style={{ /*maxWidth: "950px" , */ padding: "0px" }}
                  >

                    {/* Nested second crid container for creating each colum in the available row */}
                    {/*<Grid container spacing={2} >*/}
                    {/*<Grid item lg={4} xs={12} sm={12} md={4}>*/}
                    {/*<Grid item>*/}
                    {/*<div>*/}
                    {/* <Button onClick={this.ipLookup}>iplookup</Button> */}
                    {/*/!***/}
                    {/*   * Location Manager component bundles the 'PlacesAutoComplete.js' and a google map window.*/}
                    {/*   * It updates the visual map based on inputs to the autocomplete text feild AND is able to return*/}
                    {/*   * the latitude and Logitude of whatever location was selected in the textfield.*/}
                    {/*   *!/*/}
                    {/*  <LocationManager*/}
                    {/*    handleLocationUpdate={this.handleLocationUpdate}*/}
                    {/*  />*/}
                    {/*</Grid>*/}
                    {/*<Grid item lg={4} xs={12} sm={12} md={8}>*/}

                    <Grid item xs={12}>
                      <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} sm={9}>
                          <EventFilters
                            updateCategory={this.updateCategory}
                            updateRange={this.updateRange}
                            updateLimitCount={this.updateLimitCount}
                          />
                        </Grid>
                        <Grid item xs={12} sm={3}>
                          <LocationManager
                            handleLocationUpdate={this.handleLocationUpdate}
                          />
                        </Grid>
                      </Grid>

                    </Grid>

                    {isRetrievingLocationEvents ? (
                      <EventSkeleton />
                    ) : errorRetrievingLocationEvents ? (
                      <Grid item>
                        <img
                          alt="Error Encountered"
                          src="https://firebasestorage.googleapis.com/v0/b/happening-82070.appspot.com/o/WebAppFiles%2FPlaceHolderImages%2Fundraw_feeling_blue_4b7q.svg?alt=media&token=18c6b6e7-a7db-4cb4-903e-532874d9a998"
                        />
                        <Typography variant="h3">
                          Error encountered! Refresh the page to try again
                        </Typography>
                        <Button onClick={this.refreshPage}>Refresh page</Button>
                      </Grid>
                    ) : // change this to a sad face placeholder that says to refresh page or something
                      locationEvents ? (
                        locationEvents.length === 0 ? (
                          // <Paper className={classes.noEventCard}>
                          <Grid item>
                            <img
                              className={classes.noEventCard}
                              src={
                                process.env.PUBLIC_URL +
                                "/assets/placeholderVectors/nothingToShow.png"
                              }
                              alt="No events happening around you"
                            />
                          </Grid>
                        ) : locationEvents && locationEvents.length > 0 ? ( // check redux state to see if there are events
                          <>
                            {/*<Grid item className="w-full">*/}
                            {/*  <Waypoint*/}
                            {/*    key={`event-${0}`}*/}
                            {/*    onEnter={() => {*/}
                            {/*      this.populateEvent(locationEvents[0], 0);*/}
                            {/*    }}*/}
                            {/*  >*/}
                            {/**
                       Waypoint is a slightly sensitive component.
                       It is used for keeping track of whether or not a user has scrolled down to an event card or not
                       On load, all event cards are skeletons (the number of displayed skeletons is determined by a seperate query to our backend DB) .
                       When a user Enters a Waypoint for a card, the event data is then pulled from firebase and the skeleton disappears.
                       The idea behind this was to 'conserve' user data by not preloading all the events.
                       */}
                            {/*<div*/}
                            {/*  key={0}*/}
                            {/*  // className={classes.eventCards}*/}
                            {/*>*/}
                            {/*  {locationBasedEvents[0] &&*/}
                            {/*  locationBasedEvents[0][EVENTNAME] ? (*/}
                            {/*    // Vertical Event card is in Components/reusable .*/}
                            {/*    // It displayes events passed down to the component through prop "item"*/}
                            {/*    <VerticalEventCard*/}
                            {/*      key={0}*/}
                            {/*      item={locationBasedEvents[0]}*/}
                            {/*    />*/}
                            {/*  ) : (*/}
                            {/*    <EventSkeleton />*/}
                            {/*  )}*/}
                            {/*</div>*/}
                            {/*  </Waypoint>*/}
                            {/*</Grid>*/}
                            <Grid item className="">
                              <RenderVerticalEventCards
                                startIndex={0}
                                locationEvents={locationEvents}
                                populateEvent={this.populateEvent}
                                locationBasedEvents={locationBasedEvents}
                              />
                            </Grid>
                            <Grid item className="">
                              <RenderVerticalEventCards
                                startIndex={1}
                                locationEvents={locationEvents}
                                populateEvent={this.populateEvent}
                                locationBasedEvents={locationBasedEvents}
                              />
                            </Grid>
                            <Grid item className="">
                              <RenderVerticalEventCards
                                startIndex={2}
                                locationEvents={locationEvents}
                                populateEvent={this.populateEvent}
                                locationBasedEvents={locationBasedEvents}
                              />
                            </Grid>
                            <Grid item className="xs:hidden c_sm:block c_lg:hidden">
                              <Waypoint
                                key={`event-${0}`}
                                onEnter={() => {
                                  this.populateEvent(locationEvents[0], 0);
                                }}
                              >
                                {/**
                       Waypoint is a slightly sensitive component.
                       It is used for keeping track of whether or not a user has scrolled down to an event card or not
                       On load, all event cards are skeletons (the number of displayed skeletons is determined by a seperate query to our backend DB) .
                       When a user Enters a Waypoint for a card, the event data is then pulled from firebase and the skeleton disappears.
                       The idea behind this was to 'conserve' user data by not preloading all the events.
                       */}
                                <div
                                  key={0}
                                // className={classes.eventCards}
                                >
                                  {locationBasedEvents[0] &&
                                    locationBasedEvents[0][EVENT_ID] ? (
                                    // Vertical Event card is in Components/reusable .
                                    // It displayes events passed down to the component through prop "item"
                                    <VerticalEventCard
                                      key={0}
                                      item={locationBasedEvents[0]}
                                    />
                                  ) : (
                                    <EventSkeleton />
                                  )}
                                </div>
                              </Waypoint>
                            </Grid>
                          </>
                        ) : (
                          <EventSkeleton /> //{/**Placeholder whiel events 'lazy load' */}
                        )
                      ) : (
                        "Something went wrong, please try again" //Bad error message, but it will do for now
                      )}
                  </Grid>
                </TabPanel>

                {/****************tabpanel:2****************************/}

                <TabPanel value={this.state.value} index={1} className={classes.tab}>
                  <Grid
                    container
                    justifyContent="center"
                    spacing={2}
                  // style={{ maxWidth: "950px" }}
                  >

                    <Grid item xs={12}>
                      <Grid spacing={2} justifyContent="center">
                        <Grid item xs={12} sm={8} md={12} >
                          <ProductTab />
                          {/* <ProductTabNew/> */}
                        </Grid>
                      </Grid>
                    </Grid>


                  </Grid>
                </TabPanel>






              </Box>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}






function mapStateToProps(state) {
  return {
    userData: state.user.userData,
    authData: state.auth.user,
    locationEvents: state.events.locationEvents,
    isRetrievingLocationEvents: state.events.isRetrievingLocationEvents,
    errorRetrievingLocationEvents: state.events.errorRetrievingLocationEvents,
    dashboardLocation: state.dashboard.location,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Dashboard));
