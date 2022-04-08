import { Container, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core";
import HorizontalEventCard from "../reusable/HorizontalEventCard";
import {
  getSpecificEvent,
  get_AllUserEventsInRange,
} from "../../redux/actions";
import { EVENTNAME } from "../../util/keywords";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "3rem",
  },
  container: {
    padding: "0",
    // opacity: "0.1",
  },
}));

function ActiveEvents(props) {
  const classes = useStyles();
  const { userLocationEvents, isUserABusiness, userData } = props;
  const { uid, dispatch } = props;
  const [currActiveEvents, setCurrActiveEvents] = useState([]);
  // Runs on mount
  useEffect(() => {
    // console.log(
    //   "Component mounted, user is a business? ",
    //   isUserABusiness,
    //   uid
    // );

    if (isUserABusiness) {
      console.log("THIS STATEMENT IS A TEST");
      //TODO:  NEED TO CHANGE THIS/ add a falllback TO A LOCATION SERVICE TO TAKE BRWSER LOCATION OR IP ADDRESS OR POSTAL CODE
      //TODO: https://medium.com/trabe/rendering-different-react-components-depending-on-the-users-geographic-location-99d321ed0959
      navigator.geolocation.getCurrentPosition((position) => {
        var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;
        console.log("Latitude is :", latitude);
        console.log("Longitude is :", longitude);
        dispatch(
          get_AllUserEventsInRange({
            latitude,
            longitude,
            range: 2000000,
            page: 1,
            limit: 20,
            business_id: uid, // adding this field gets onluy active events in range for this user
          })
        );
      });
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
      userLocationEvents.forEach((eventItem, index) => {
        if (currActiveEvents[index] && !currActiveEvents[index][EVENTNAME]) {
          console.log("Entered unpopulated event", eventItem, index);
          //Get each event info
          (async () => {
            await getSpecificEvent(
              eventItem.business_id,
              eventItem.event_id
            ).then((data) => {
              /* Since Array.map() creates a new array based on whatever the inner function 
                returns, we update and rewrite curractive events with that */
              setCurrActiveEvents(
                currActiveEvents.map((item, j) => {
                  if (j === index) {
                    return { ...item, ...data };
                  } else {
                    return item;
                  }
                })
              );
              console.log(
                "This statement prints after setCurrActiveEvents fires"
              );
            });
          })();
        }
      });
    }
  }, [userLocationEvents, currActiveEvents]);

  return (
    <div>
      <Typography variant="button" component="span">
        Active Events
      </Typography>
      <Container className={classes.container}>
        {currActiveEvents && currActiveEvents.length > 0 ? (
          currActiveEvents.map((item) => (
            <div>
              <HorizontalEventCard
                item={item}
                classes={classes}
              ></HorizontalEventCard>
            </div>
          ))
        ) : (
          <div>
            Looks like{" "}
            {userData.displayname
              ? userData.displayname
              : userData["business name"]
              ? userData["business name"]
              : "this user"}{" "}
            has nothing happenin{" "}
          </div>
        )}
      </Container>
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
