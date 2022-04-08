import React, { Component } from "react";
import { connect } from "react-redux";
// import { Redirect } from "react-router-dom";
import {
  // loginUser,
  // loginWithFacebook,
  // loginWithGoogle,
  // assignUserType,
  // generateUserData,
  logoutUser,
  toggleAlert,
} from "../redux/actions";
import { sendEmailVerification } from "../redux/actions/auth";
import { withStyles } from "@material-ui/styles";

import Button from "@material-ui/core/Button";

import NavBar from "../Components/NavBar";
import { CircularProgress, Grid } from "@material-ui/core";
import ProfileCard from "../Components/authUserProfilePage/ProfileCard";
import CurrentEvent from "../Components/authUserProfilePage/CurrentEvent";
import AllEventsTabs from "../Components/authUserProfilePage/AllEventsTabs";
import { Helmet } from "react-helmet";
import { BUSINESSNAME } from "../util/keywords";
import { isEmptyString } from "../util/util";
import DoneIcon from "@material-ui/icons/Done";
import ErrorIcon from "@material-ui/icons/Error";

// import { ReactComponent as SmileIcon } from "./assets/smile.svg";
import { Alert, AlertTitle } from "@material-ui/lab";
import { firebaseAnalytics } from "../firebase/firebase";

const styles = () => ({
  "@global": {
    body: {
      backgroundColor: "#fff",
    },
  },
  root: {
    padding: "50px 10px",
    background: "#292C31",
    minHeight: "100vh",
  },
  paper: {
    marginTop: 100,
    display: "flex",
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#f50057",
  },
  form: {
    marginTop: 1,
  },
  errorText: {
    color: "#f50057",
    marginBottom: 5,
    textAlign: "center",
  },
});

class ProfilePage extends Component {
  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
    firebaseAnalytics.logEvent("logout");
  };

  render() {
    const { classes, userData, userObj, userType } = this.props;
    const { dispatch, uiAlerts, linkSent } = this.props;

    // console.log('userType:', userType);
    // console.log('userData:', userData);

    return (
      <div>
        <Helmet>
          <title>
            {userData ? (
              `${userData.displayname || userData[BUSINESSNAME]}`
            ) : (
              <p>Loading</p>
            )}
          </title>
        </Helmet>
        <NavBar />
        <div className={`${classes.root}`}>
          <div>
            {userObj && !userObj.emailVerified && uiAlerts?.emailVerified && (
              <Alert
                severity="warning"
                action={
                  <Button
                    color="inherit"
                    size="small"
                    onClick={() => {
                      dispatch(toggleAlert({ emailVerified: false }));
                    }}
                  >
                    Dismiss for now
                  </Button>
                }
              >
                <AlertTitle>Email Verification</AlertTitle>
                Looks like you haven't verified your email: {
                  userObj.email
                } yet.{" "}
                {linkSent?.waiting && (
                  <strong
                    onClick={() => {
                      dispatch(sendEmailVerification());
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    Resend Verification
                  </strong>
                )}
                {linkSent?.sending && <CircularProgress />}
                {linkSent?.sent && (
                  <div>
                    <DoneIcon /> <b>Sent! Head over to your inbox!</b>
                  </div>
                )}
                {linkSent?.error && (
                  <div>
                    <ErrorIcon /> <b>Something went wrong, try again.</b>
                  </div>
                )}
              </Alert>
            )}
            <br />
            {userData &&
              (isEmptyString(userData.bio) ||
                isEmptyString(userData.website)) &&
              uiAlerts?.incompleteProfile && (
                <Alert
                  severity="info"
                  action={
                    <Button
                      color="inherit"
                      size="small"
                      onClick={() => {
                        dispatch(toggleAlert({ incompleteProfile: false }));
                      }}
                    >
                      Dismiss for now
                    </Button>
                  }
                >
                  <AlertTitle>Complete your profile</AlertTitle>
                  You're almost there! Complete your profile by adding your
                  <strong>
                    {isEmptyString(userData.bio) && ` bio`}{" "}
                    {isEmptyString(userData.website) && ` website`}
                  </strong>
                </Alert>
              )}
          </div>
          <br />

          <Grid
            container
            // direction="row"
            alignItems="flex-end"
            spacing={2}
            justifyContent="center"
          >
            <Grid item xs={12} sm={8} md={6} lg={5} xl={4}>
              <ProfileCard />
              {/* <Paper className={classes.paper}>xs=3</Paper> */}
            </Grid>
            <Grid item xs={12} sm={8} md={4} lg={3} xl={2}>
              {userType && userType === "business" ? <CurrentEvent /> : <></>}
              {/* <Paper className={classes.paper}>xs=3</Paper> */}
            </Grid>
            <Grid item xs={12}>
              {userType === "business" ? <AllEventsTabs /> : <></>}
            </Grid>
            {/*<Grid item xs={12}>*/}
            {/*  <div className="flex justify-center items-center">*/}
            {/*    <SmileIcon />*/}
            {/*  </div>*/}
            {/*</Grid>*/}
          </Grid>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated,
    isLoggingOut: state.auth.isLoggingOut,
    userData: state.auth.userData,
    userObj: state.auth.user,
    userType: state.auth.userType,
    linkSent: state.auth.verificationLinkStatus,
    uiAlerts: state.appInterface.uiAlerts,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(ProfilePage));

// <Container component="main" maxWidth="xs">
//   <Paper className={classes.paper}>
//     <Avatar
//       className={classes.avatar}
//       src={userData?.photoURL || userData?.imageDownloadURL}
//     >
//       <Person />
//     </Avatar>
//     <Typography component="h1" variant="h5">
//       {userData ? (
//         userData.displayname || userData[BUSINESSNAME]
//       ) : (
//         <p>Loading</p>
//       )}
//     </Typography>
//     <Typography component="h5" variant="h5">
//       {userData ? userData.email : <p>Loading</p>}
//     </Typography>
//     <Button
//       type="button"
//       fullWidth
//       variant="contained"
//       color="primary"
//       className={classes.submit}
//       onClick={this.handleLogout}
//     >
//       Sign Out
//     </Button>
//   </Paper>
// </Container>
