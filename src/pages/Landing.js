import { Button, CssBaseline, IconButton } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import PropTypes from "prop-types";
import AboutHappenin from "../Components/AboutHappenin";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { CardContent } from "@material-ui/core";
import bgMask1 from "./assets/bg-mask1.png";
import {
  BusinessCenter,
  Assessment,
  PeopleAlt,
  Facebook,
  Telegram,
  Instagram,
  Twitter,
} from "@material-ui/icons";
import BusinessSignUp from "../Components/auth/businessSignUp/BusinessSignUp";
import ModalCard from "../Components/ModalCard";
import UserSignUp from "../Components/auth/userSignUp/UserSignUp";
import LandingNavBar from "../Components/LandingNavBar";
import { ReactComponent as GooglePlayBadge } from "./assets/google-play-badge.svg";
import { ReactComponent as AppStoreBadge } from "./assets/app-store-badge.svg";
import { Link } from "react-router-dom";
import { APP_STORE_URL, PLAY_STORE_URL } from "../constants/AppConstants";
import { firebaseAnalytics } from "../firebase/firebase";

const styles = (theme) => ({
  root: {
    maxHeight: "100vh",
    width: "100%",
    overflow: "auto",
    // backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/bg2_0.jpg"})`,
    backgroundImage: `url(${bgMask1})`,
    background: "#22183C",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: "0 16px 16px",
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
    "&::-webkit-scrollbar": {
      width: 0,
      height: 0,
    },
  },
  featuresCard: {
    maxWidth: "45em",
    color: "#fff",
    background: "rgba(0,0,0,0.5)",
  },
  button: {
    background: "#7950F3",
    borderRadius: "8px",
    padding: "8px 16px",
    marginBottom: "10px",
  },
  button2: {
    background: "#FFFFFF",
    borderRadius: "8px",
    padding: "8px 16px",
    color: "#7950F3",
    "& :hover": {
      color: "#FFFFFF",
    },
  },
  title: {
    fontFamily: "Nunito",
    fontWeight: "bold",
    fontSize: "2rem",
    color: "#fff",
    marginBottom: "15px",
  },
  desc: {
    fontFamily: "Nunito",
    fontSize: "1.1rem",
    color: "#fff",
  },
});
class Landing extends Component {
  componentDidMount() {
    firebaseAnalytics.logEvent("page_Landing");
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <LandingNavBar />
        <div
          className="w-full mt-20 text-white"
          style={{ padding: "16px", maxWidth: "1200px" }}
        >
          {/*<div*/}
          {/*  className="absolute top-0 right-0 bottom-0 left-0 bg-cover flex flex-col justify-center items-center"*/}
          {/*>*/}
          {/*  <img alt="landingMask1" src={landingMask1} className="transform rotate-90 opacity-25" />*/}
          {/*</div>*/}
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} className="w-full">
              <div style={{ width: "100%", height: "100%", padding: "16px" }}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <div
                      style={{ width: "100%", height: "100%", padding: "16px" }}
                      className="flex flex-col justify-center items-start"
                    >
                      <div className="text-3xl font-bold xs:whitespace-wrap sm:whitespace-nowrap mb-3">
                        Reconnecting Locals
                      </div>
                      {/*<div*/}
                      {/*  className="text-xs mb-8"*/}
                      {/*  style={{ color: "#B69FFC" }}*/}
                      {/*>*/}
                      {/*  Connecting locals to local business*/}
                      {/*</div>*/}
                      <a
                        href={APP_STORE_URL}
                        target="_blank"
                        rel="noreferrer nofollow"
                      >
                        <Button
                          variant="contained"
                          color="primary"
                          className={`${classes.button} focus:outline-none`}
                        >
                          Download the App
                        </Button>
                      </a>
                      <Link to="/dashboard">
                        <Button
                          variant="contained"
                          color="primary"
                          className={`${classes.button} focus:outline-none`}
                        >
                          Dashboard
                        </Button>
                      </Link>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {/*<div style={{ width: "100%", padding: "16px" }}>*/}
                    {/*  <img alt="happenin1" src={happenin1} className="w-full" />*/}
                    {/*</div>*/}
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} className="w-full">
              <div style={{ width: "100%", height: "100%", padding: "16px" }}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item xs={4} sm={3}>
                    <div
                      className="w-full flex flex-col justify-center items-center"
                      style={{ padding: "16px" }}
                    >
                      <IconButton
                        className="focus:outline-none"
                        style={{ background: "rgba(0,0,0,0.3)" }}
                      >
                        <BusinessCenter
                          style={{ color: "#7950F3" }}
                          className="xs:w-10 xs:h-10 sm:w-28 sm:h-28"
                        />
                      </IconButton>
                      <div className="xs:mt-2 sm:mt-3 text-xs text-center font-bold">
                        Strong Business
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={4} sm={3}>
                    <div
                      className="w-full flex flex-col justify-center items-center"
                      style={{ padding: "16px" }}
                    >
                      <IconButton
                        className="focus:outline-none"
                        style={{ background: "rgba(0,0,0,0.3)" }}
                      >
                        <Assessment
                          style={{ color: "#7950F3" }}
                          className="xs:w-10 xs:h-10 sm:w-28 sm:h-28"
                        />
                      </IconButton>
                      <div className="xs:mt-2 sm:mt-3 text-xs text-center font-bold">
                        Strong Economy
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={4} sm={3}>
                    <div
                      className="w-full flex flex-col justify-center items-center"
                      style={{ padding: "16px" }}
                    >
                      <IconButton
                        className="focus:outline-none"
                        style={{ background: "rgba(0,0,0,0.3)" }}
                      >
                        <PeopleAlt
                          style={{ color: "#7950F3" }}
                          className="xs:w-10 xs:h-10 sm:w-28 sm:h-28"
                        />
                      </IconButton>
                      <div className="xs:mt-2 sm:mt-3 text-xs text-center font-bold">
                        Strong Community
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} className="w-full">
              <div style={{ width: "100%", height: "100%", padding: "16px" }}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid
                    item
                    xs={12}
                    sm={4}
                    justifyContent="center"
                    alignItems="center"
                  >
                    <div
                      style={{ width: "100%", height: "100%", padding: "16px" }}
                      className="flex flex-col justify-center items-start"
                    >
                      <div className="text-3xl font-bold whitespace-wrap mb-3">
                        Find out how <br />
                        can do your part and <br /># Supportlocal
                      </div>
                      <div className="text-xs" style={{ color: "#B69FFC" }}>
                        Download the app to see <br />
                        what's happening around you
                      </div>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        padding: "16px",
                        background: "#FFFFFF",
                        borderRadius: "8px",
                      }}
                      className="flex flex-col justify-between items-start"
                    >
                      <div
                        style={{ color: "#282D3B" }}
                        className="text-2xl font-bold xs:mb-5 sm:mb-10"
                      >
                        User
                      </div>
                      <div
                        style={{ color: "#ABABAB" }}
                        className="xs:mb-5 sm:mb-10"
                      >
                        Whether it's date night, family activities or local
                        restaurant specials - we've got you covered.
                      </div>
                      {/*<Button*/}
                      {/*  variant="contained"*/}
                      {/*  color="primary"*/}
                      {/*  onClick={() => console.log('Sign up Now')}*/}
                      {/*  className={`${classes.button} focus:outline-none`}*/}
                      {/*>*/}
                      {/*  Sign up Now*/}
                      {/*</Button>*/}
                      <ModalCard
                        obj={<UserSignUp />}
                        text="Sign Up"
                        btnStyle={classes.button}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        padding: "16px",
                        background: "#7950F3",
                        borderRadius: "8px",
                      }}
                      className="flex flex-col justify-between items-start"
                    >
                      <div
                        style={{ color: "#282D3B" }}
                        className="text-2xl font-bold xs:mb-5 sm:mb-10"
                      >
                        Business
                      </div>
                      <div
                        style={{ color: "#FFFFFF" }}
                        className="xs:mb-5 sm:mb-10"
                      >
                        Connect with pre-engaged local users all at a price that
                        fits your budget.
                      </div>
                      {/*<Button*/}
                      {/*  variant="contained"*/}
                      {/*  color="primary"*/}
                      {/*  onClick={() => console.log('Sign up Now')}*/}
                      {/*  className={`${classes.button2} focus:outline-none`}*/}
                      {/*>*/}
                      {/*  Sign up Now*/}
                      {/*  */}
                      {/*</Button>*/}
                      <ModalCard
                        text="Business? Sign Up"
                        obj={<BusinessSignUp />}
                        btnStyle={classes.button2}
                        key={"BusinessSignupModal"}
                      />
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
          <CssBaseline />
          <AboutHappenin />
          <Grid container spacing={2} justifyContent="space-between">
            <Grid item xs={12} sm={4}>
              <div
                style={{ padding: "16px", borderRadius: "8px" }}
                className="w-full h-full flex flex-col justify-center items-center"
              >
                <div className="text-3xl font-bold">Our Features</div>
              </div>
            </Grid>
            <Grid item xs={12} sm={8}>
              <div
                style={{ padding: "16px" }}
                className="w-full h-full flex justify-center items-start"
              >
                <CardContent
                  style={{
                    padding: "16px",
                    background: "rgba(0,0,0,0.5)",
                    borderRadius: "8px",
                  }}
                >
                  <Typography variant="h5" className={classes.title}>
                    {" "}
                    Campfiyr hub
                  </Typography>
                  <Typography paragraph className={classes.desc}>
                    Campfiyr provides organic interactions between locals and
                    businesses. Users coming onto this app can swipe through
                    these virtual storefronts and discover hidden gem businesses
                    <b> within 30 km from them</b>.
                  </Typography>
                  <Typography paragraph className={classes.desc}>
                    Users can search for businesses depending on what they’re
                    looking for by categories such as food, shopping, and
                    nightlife based on <b> proximity </b>.
                  </Typography>
                  <Typography paragraph className={classes.desc}>
                    Events and ads can be sent to friends using the
                    <b> in-app messaging system </b> so businesses and hangouts
                    can be discovered and planned.
                    <b> Artificial intelligence </b> is utilized to analyze the
                    preference of users and provide
                    <b> customized experiences </b> accordingly.
                  </Typography>
                </CardContent>
              </div>
            </Grid>
            <Grid item xs={12} sm={8}>
              <div
                style={{ padding: "16px" }}
                className="w-full h-full flex flex-col justify-center items-center"
              >
                <CardContent
                  style={{
                    padding: "16px",
                    background: "rgba(0,0,0,0.5)",
                    borderRadius: "8px",
                  }}
                >
                  <Typography variant="h5" className={classes.title}>
                    {" "}
                    Dashboard Central
                  </Typography>
                  <Typography paragraph className={classes.desc}>
                    The dashboard page provides a way to
                    <b> discover unique talents </b>
                    and promotes the <b>sharing of local experiences</b> to
                    create harmony and unity among locals.
                  </Typography>
                </CardContent>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12}>
              <div
                style={{ width: "100%", padding: "16px" }}
                className="w-full flex justify-center items-center text-3xl font-bold"
              >
                Download the App for Free
              </div>
            </Grid>
            <Grid item xs={12}>
              <div
                style={{ width: "100%", padding: "16px" }}
                className="w-full flex justify-center items-center"
              >
                <div className="mx-2 cursor-pointer">
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    <GooglePlayBadge />
                  </a>
                </div>
                <div className="mx-2 cursor-pointer">
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    <AppStoreBadge />
                  </a>
                </div>
              </div>
            </Grid>
          </Grid>
          <div
            style={{
              width: "100%",
              padding: "16px",
              background: "rgba(0, 0, 0, 0.7)",
              marginTop: "20px",
            }}
          >
            <Grid container spacing={2} justifyContent="space-between">
              <Grid
                item
                xs={12}
                sm={6}
                style={{ borderBottom: "1px solid #ABABAB" }}
              >
                <div
                  style={{ width: "100%", padding: "16px" }}
                  className="flex xs-justify-start sm:justify-start items-center flex-wrap"
                >
                  <div className="xs:w-full sm:w-1/2 flex flex-col justify-center xs:items-center sm:items-start xs:mb-5 sm:mb-0">
                    <div
                      className="flex text-center"
                      style={{
                        color: "#b4a2ff",
                        fontFamily: "Nunito",
                        fontSize: "2em",
                        fontWeight: 900,
                      }}
                    >
                      Campfiyr
                    </div>
                  </div>
                  <div className="xs:w-full sm:w-1/2 flex sm:justify-start xs:justify-center items-center">
                    <div className="mx-2 flex text-center text-xs tracking-widest whitespace-nowrap cursor-pointer">
                      OUR STORY
                    </div>
                    <div className="mx-2 flex text-center text-xs whitespace-nowrap cursor-pointer">
                      GET IN TOUCH
                    </div>
                  </div>
                </div>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                style={{ borderBottom: "1px solid #ABABAB" }}
              >
                <div
                  style={{ width: "100%", height: "100%", padding: "16px" }}
                  className="flex xs-justify-center sm:justify-end items-center flex-wrap"
                >
                  <div className="text-xs mx-5 xs:w-full sm:w-auto xs:text-center">
                    Follow us on
                  </div>
                  <div className="flex justify-center items-center xs:w-full sm:w-auto">
                    <Facebook
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#7950F3",
                        margin: "5px",
                        cursor: "pointer",
                      }}
                    />
                    <Telegram
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#7950F3",
                        margin: "5px",
                        cursor: "pointer",
                      }}
                    />
                    <Instagram
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#7950F3",
                        margin: "5px",
                        cursor: "pointer",
                      }}
                    />
                    <Twitter
                      style={{
                        width: "20px",
                        height: "20px",
                        color: "#7950F3",
                        margin: "5px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </div>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  padding: "32px 16px 16px",
                  color: "#ABABAB",
                }}
                className="flex justify-center items-center flex-wrap text-center"
              >
                Copyright 2020 Campfiyr - All Right Reserved.
              </div>
            </Grid>
          </div>
        </div>
        {/*<CssBaseline />*/}
        {/*<Header />*/}
        {/*<AboutHappenin />*/}
        {/*<div style={{ marginLeft: "7em" }}>*/}
        {/*  <Typography variant="h4">Our Features</Typography>*/}
        {/*  <Grid container spacing={3}>*/}
        {/*    <Grid item>*/}
        {/*      <Card className={classes.featuresCard}>*/}
        {/*        <CardContent>*/}
        {/*          <Typography variant="h5"> Campfiyr hub</Typography>*/}
        {/*          <Typography paragraph>*/}
        {/*            Campfiyr provides organic interactions between locals and*/}
        {/*            businesses. Users coming onto this app can swipe through*/}
        {/*            these virtual storefronts and discover hidden gem businesses*/}
        {/*            <b>within 30 km from them</b>.*/}
        {/*          </Typography>*/}
        {/*          <Typography paragraph>*/}
        {/*            Users can search for businesses depending on what they’re*/}
        {/*            looking for by categories such as food, shopping, and*/}
        {/*            nightlife based on <b>proximity</b>.*/}
        {/*          </Typography>*/}
        {/*          <Typography paragraph>*/}
        {/*            Events and ads can be sent to friends using the*/}
        {/*            <b>in-app messaging system</b> so businesses and hangouts*/}
        {/*            can be discovered and planned.*/}
        {/*            <b>Artificial intelligence</b> is utilized to analyze the*/}
        {/*            preference of users and provide*/}
        {/*            <b>customized experiences</b> accordingly.*/}
        {/*          </Typography>*/}
        {/*        </CardContent>*/}
        {/*      </Card>*/}
        {/*    </Grid>*/}
        {/*    <Grid item>*/}
        {/*      <Card className={classes.featuresCard}>*/}
        {/*        <CardContent>*/}
        {/*          <Typography variant="h5"> Dashboard Central</Typography>*/}
        {/*          <Typography paragraph>*/}
        {/*            The dashboard page provides a way to*/}
        {/*            <b>discover unique talents</b>*/}
        {/*            and promotes the <b>sharing of local experiences</b> to*/}
        {/*            create harmony and unity among locals.*/}
        {/*          </Typography>*/}
        {/*        </CardContent>*/}
        {/*      </Card>*/}
        {/*    </Grid>*/}
        {/*    <Grid item></Grid>*/}
        {/*  </Grid>*/}
        {/*</div>*/}
      </div>
    );
  }
}

Landing.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Landing);
