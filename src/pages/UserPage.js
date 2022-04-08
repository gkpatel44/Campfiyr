import { Grid, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import NavBar from "../Components/NavBar";
import { clearUser, pullUserOrBusinessData } from "../redux/actions/user";
import { connect } from "react-redux";
import UserProfileCard from "../Components/userProfilePage/UserProfileCard";
import { Redirect } from "react-router-dom";
import ActiveEvents from "../Components/userProfilePage/ActiveEvents";
import { Helmet } from "react-helmet";
import { BUSINESSNAME } from "../util/keywords";
import { cleanUserLocationEvent } from "../redux/actions";
import { firebaseAnalytics } from "../firebase/firebase";

const styles = (theme) => ({
  // main: {
  //   flexGrow: 1,
  //   margin: "2rem",
  // },
});
class UserPage extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const uid = this.props.match.params.uid;

    dispatch(pullUserOrBusinessData(uid));
    firebaseAnalytics.logEvent("page_User", {
      user_id: uid,
      page_title:
        this.props.userData.displayname || this.props.userData[BUSINESSNAME],
    });
    //TODO:, create hook for getting location because code is being repeated everywhere
    //TODO: https://medium.com/trabe/rendering-different-react-components-depending-on-the-users-geographic-location-99d321ed0959

    // navigator.geolocation.getCurrentPosition((position) => {
    //   var longitude = position.coords.longitude;
    //   var latitude = position.coords.latitude;
    //   console.log("Latitude is :", position.coords.latitude);
    //   console.log("Longitude is :", position.coords.longitude);
    // dispatch(
    //   get_AllEventsInRange({
    //     latitude,
    //     longitude,
    //     range: 2000000,
    //     page: 1,
    //     limit: 20,
    //     business_id: uid, // adding this field gets onluy active events in range for this user
    //   })
    // );
    // });

    /* I hate that i have to do this, but this slight computation 
       will slow down the app  (only slightly) but i'd prefer to avoid it 
    */

    // console.log("Single event page mounted ");
    // dispatch(
    //   pullSpecificEvent(
    //     this.props.match.params.uid,
    //     this.props.match.params.eventId
    //   )
    // );
    dispatch(cleanUserLocationEvent());
  }

  render() {
    const { match } = this.props;
    const { userData, isUserABusiness, authUserData, isRetrievingUserData } =
      this.props;
    const { dispatch } = this.props;

    if (
      !isRetrievingUserData &&
      authUserData &&
      userData.uid &&
      authUserData.uid === userData.uid
    ) {
      dispatch(clearUser());
    }
    return (
      <div style={{ background: "#292C31", minHeight: "100vh" }}>
        {authUserData && userData.uid && authUserData.uid === userData.uid ? (
          <Redirect to={`/profilepage`} />
        ) : (
          <div></div>
        )}
        <Helmet>
          <title>
            {userData ? (
              userData.displayname || userData[BUSINESSNAME]
            ) : (
              <p>Loading</p>
            )}
          </title>
        </Helmet>
        <NavBar />
        {/* TODO: need to make sure user is logged in before able to add as friend */}
        {/* <ProfileCard /> */}
        <div className="w-full md:px-20 xs:p-1 md:py-20 xs:py-10 flex justify-center items-center">
          <div style={{ width: "100%", color: "#FFFFFF" }}>
            <Grid
              container
              // item
              spacing={2}
              // direction="column"
              justifyContent="center"
            >
              {/*<Grid item xs>*/}
              {/*  <>*/}
              {/* {isUserABusiness ? (
                  <div>
                    {" "}
                    Followers:{" "}
                    {userData.followersList ? (
                      userData.followersList.map((item) => (
                        <li key={item.useruid}>{item.useruid} </li>
                      ))
                    ) : (
                      <span></span>
                    )}
                  </div>
                ) : (
                  <div>
                    Friends:{" "}
                    {Object.entries(
                      userData.friends ? userData.friends : {}
                    ).map(([key, value]) => {
                      return <li key={key}>{key}</li>;
                    })}
                  </div>
                )} */}{" "}
              {/*  </>*/}
              {/*</Grid>*/}
              <Grid item xs={12} md={8}>
                <UserProfileCard />
              </Grid>
              <Grid item xs={12}>
                {isUserABusiness && (
                  <ActiveEvents uid={match.params.uid} key={Date.now()} />
                )}
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    authUserData: state.auth.userData,
    userData: state.user.userData,
    locationEvents: state.events.locationEvents, // for pulling active events specific to this user
    isUserABusiness: state.user.isUserABusiness,
    isRetrievingUserData: state.user.isRetrievingUserData,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(UserPage));
