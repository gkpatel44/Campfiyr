// import { Container, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles, Grid } from "@material-ui/core";
// import HorizontalEventCard from "../reusable/HorizontalEventCard";
import {
  cleanUserLocationEvent,
  getSpecificEvent,
  get_AllUserEventsInRange,
} from "../../redux/actions";
import { EVENTNAME } from "../../util/keywords";
import TabEventCard from "../authUserProfilePage/TabEventCard";
import { renderNoAnyEventsToDisplay } from "../authUserProfilePage/AllEventsTabs";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "3rem",
  },
  container: {
    padding: "0",
    // opacity: "0.1",
  },
  carousel: {
    "& button:focus": {
      outline: "none",
    },
  },
  media: {
    // width: "10rem",
    // height: "10rem",
    minHeight: "300px",
    minWidth: "200px",
    borderRadius: "8px",
  },
}));

function ActiveEvents(props) {
  const classes = useStyles();
  const { userLocationEvents, isUserABusiness, userData } = props;
  const { authUserData } = props;
  const { uid, dispatch } = props;
  const [currActiveEvents, setCurrActiveEvents] = useState([]);
  // Runs on mount
  useEffect(() => {
    // console.log(
    //   "Component mounted, user is a business? ",
    //   isUserABusiness,
    //   uid
    // );
    dispatch(cleanUserLocationEvent());

    if (isUserABusiness) {
      console.log("THIS STATEMENT IS A TEST");
      //TODO:  NEED TO CHANGE THIS/ add a falllback TO A LOCATION SERVICE TO TAKE BRWSER LOCATION OR IP ADDRESS OR POSTAL CODE
      //TODO: https://medium.com/trabe/rendering-different-react-components-depending-on-the-users-geographic-location-99d321ed0959
      // navigator.geolocation.getCurrentPosition((position) => {
      //   var longitude = position.coords.longitude;
      //   var latitude = position.coords.latitude;
      //   console.log("Latitude is :", latitude);
      // console.log("Longitude is :", longitude);
      dispatch(
        get_AllUserEventsInRange({
          latitude: 0.0,
          longitude: 0.0,
          range: 2000000000,
          page: 1,
          limit: 20,
          business_id: uid, // adding this field gets onluy active events in range for this user
        })
      );
      // });
    } else {
      //Check if auth user and user being viewed are friends
      // and if so, pull the userbeing viewed events
    }
  }, [isUserABusiness, uid, dispatch]);

  useEffect(() => {
    if (userLocationEvents && !(userLocationEvents.length === 0)) {
      if (currActiveEvents.length === 0) {
        setCurrActiveEvents([...userLocationEvents]);
      }
      let tempArray = [];
      userLocationEvents.forEach((eventItem, index) => {
        if (currActiveEvents[index] && !currActiveEvents[index][EVENTNAME]) {
          console.log("Entered unpopulated event", eventItem, index);
          //Get each event info
          (async () => {
            await getSpecificEvent(
              eventItem.business_id,
              eventItem.event_id
            ).then((data) => {
              tempArray.push({ ...eventItem, ...data });
              setCurrActiveEvents([...tempArray]);
              /* Since Array.map() creates a new array based on whatever the inner function 
                returns, we update and rewrite curractive events with that */
              // setCurrActiveEvents(
              //   currActiveEvents.map((item, j) => {
              //     if (eventItem.business_id === uid) {
              //       if (j === index) {
              //         return { ...item, ...data };
              //       } else {
              //         return item;
              //       }
              //     }
              //   })
              // );
              // console.log(
              //   "This statement prints after setCurrActiveEvents fires"
              // );
            });
          })();
        }
      });
    }
  }, [userLocationEvents, currActiveEvents]);

  const renderColumnCards = (startIndex, isAuthUser) => {
    const filteredEvents =
      currActiveEvents &&
      currActiveEvents.length > 0 &&
      currActiveEvents.reduce((acc, cur, idx) => {
        if (startIndex === (idx + 3) % 3) {
          return [...acc, idx];
        }
        return acc;
      }, []);

    return (
      filteredEvents &&
      filteredEvents.length > 0 &&
      filteredEvents.map((item, idx) => {
        return (
          <TabEventCard
            key={idx}
            item={currActiveEvents[item]}
            classes={classes}
            isAuthUser={isAuthUser}
          />
        );
      })
    );
  };
  const isAuthUser = authUserData?.uid === userData?.uid;
  return (
    <div style={{ width: "100%", padding: "16px" }}>
      <div
        className="text-white text-xl font-archivoBlack pb-2"
        style={{
          borderColor: "#383D43",
          borderWidth: "0 0 1px 0",
          marginBottom: "16px",
        }}
      >
        Active Events
      </div>
      <Grid container spacing={2} justifyContent="center" direction="row">
        {currActiveEvents && currActiveEvents.length === 0 && (
          <div>
            <div className="text-center text-base">
              Looks like{" "}
              {userData.displayname
                ? userData.displayname
                : userData["business name"]
                ? userData["business name"]
                : "this user"}{" "}
              has nothing happenin{" "}
            </div>
            {renderNoAnyEventsToDisplay()}
          </div>
        )}
        {currActiveEvents &&
          currActiveEvents.length > 0 &&
          renderColumnCards(0, isAuthUser)}
        {currActiveEvents &&
          currActiveEvents.length > 0 &&
          renderColumnCards(1, isAuthUser)}
        {currActiveEvents &&
          currActiveEvents.length > 0 &&
          renderColumnCards(2, isAuthUser)}
      </Grid>

      {/*<Container className={classes.container} style={{ marginTop: "100px" }}>*/}
      {/*  {currActiveEvents && currActiveEvents.length > 0 ? (*/}
      {/*    currActiveEvents.map((item, idx) => {*/}
      {/*      return (*/}
      {/*        <div key={idx}>*/}
      {/*          <HorizontalEventCard item={item} classes={classes}/>*/}
      {/*        </div>*/}
      {/*    )})*/}
      {/*  ) : (*/}
      {/*    <div>*/}
      {/*      Looks like{" "}*/}
      {/*      {userData.displayname*/}
      {/*        ? userData.displayname*/}
      {/*        : userData["business name"]*/}
      {/*        ? userData["business name"]*/}
      {/*        : "this user"}{" "}*/}
      {/*      has nothing happenin{" "}*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*</Container>*/}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isRetrievingEvents: state.events.isRetrievingEvents,
    // currUserEvents: state.events.currUserEvents, //Deprecated
    isRetrievingUserLocationEvents: state.events.isRetrievingUserLocationEvents,
    errorRetrievingUserLocationEvents:
      state.events.errorRetrievingUserLocationEvents,
    userLocationEvents: state.events.userLocationEvents,
    authUserData: state.auth.userData,
    userData: state.user.userData,
    isUserABusiness: state.user.isUserABusiness,
  };
}

ActiveEvents.propTypes = {
  children: PropTypes.node,
  uid: PropTypes.any.isRequired,
};

export default connect(mapStateToProps)(ActiveEvents);
