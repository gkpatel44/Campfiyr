import { Grid, makeStyles } from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet";

import LandingNavBar from "../Components/LandingNavBar";
import bgMask1 from "./assets/bg-mask1.png";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    fontFamily: "Nunito",
    fontWeight: "900",
    padding: "20px",
    background: "#22183C",
    backgroundImage: `url(${bgMask1})`,
    backgroundSize: "cover",
    overflow: "auto",
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
    "&::-webkit-scrollbar": {
      width: 0,
      height: 0,
    },
  },

  appbar: {
    background: "none",
  },
  appBarTitle: {
    flexGrow: "1",
    fontSize: "2em",
  },
  appBarWrapper: {
    width: "80%",
    margin: "0 auto",
  },

  titleColor: {
    color: "#b4a2ff",
  },
  dashBtn: {
    FontColor: "#b4a2ff",
    backgroundColor: "#fff",
    fontFamily: "Nunito",
    fontWeight: "700",
    margin: "2px",
    borderRadius: 25,
  },
  dialog: {
    "& .MuiDialog-paperWidthSm": {
      width: "660px",
      background: "#383D43",
      borderRadius: "8px",
    },
    "& .MuiBackdrop-root": {
      background: "transparent",
    },
  },
}));

export default function Login({ children }) {
  const classes = useStyles();
  return (
    <div
      className={classes.root}
      // style={{
      //   backgroundImage: `url(${process.env.PUBLIC_URL + "/assets/bg2_0.jpg"})`,
      // }}
    >
      <Helmet>
        <title>Login - Campfiyr</title>
      </Helmet>
      {/* <NavBar /> */}
      <LandingNavBar />

      {/*<div style={{ maxWidth: "900px" }}>*/}
      {/*  <UserLogin*/}
      {/*    location={{*/}
      {/*      pathname: "/login",*/}
      {/*      search: "",*/}
      {/*      hash: "",*/}
      {/*      state: undefined,*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</div>*/}
      {/*<Dialog open={true} className={classes.dialog}>*/}
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={7} lg={5}>
          {/*<UserLogin*/}
          {/*  location={{*/}
          {/*    pathname: "/login",*/}
          {/*    search: "",*/}
          {/*    hash: "",*/}
          {/*    state: undefined,*/}
          {/*  }}*/}
          {/*/>*/}
          {children}
        </Grid>
      </Grid>
      {/*</Dialog>*/}
    </div>
  );
}
