import { Collapse } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import { Link as Scroll } from "react-scroll";

// import ModalCard from "./ModalCard";
// import BusinessSignUp from "./auth/businessSignUp/BusinessSignUp";
// import UserLogin from "./auth/UserLogin";
// import UserSignUp from "./auth/userSignUp/UserSignUp";
// import { Link } from "react-router-dom";
// import { Typography } from "@material-ui/core";
import LandingNavBar from "../Components/LandingNavBar";

// import { Style } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontFamily: "Nunito",
    fontWeight: "900",
  },

  icon: {
    color: "#fff",
    fontSize: "2rem",
  },
  container: {
    textAlign: "center",
  },
  catchPhrase: {
    color: "#fff",
    fontSize: "4.5rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "8vw",
    },
  },

  btn: {
    FontColor: "#b4a2ff",
    backgroundColor: "#fff",
    fontFamily: "Nunito",
    fontWeight: "700",
    margin: "px",
    borderRadius: 25,
  },
  goDown: {
    fontSize: "4rem",
    color: "#b4a2ff",
  },
  btnHolder: {
    display: "flex",
    justifyContent: "space-around",
  },
  dialog: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "900px",
    },
  },
  dashBtn: {
    FontColor: "#b4a2ff",
    backgroundColor: "#fff",
    fontFamily: "Nunito",
    fontWeight: "700",
    margin: "2px",
    borderRadius: 25,
    [theme.breakpoints.down("xs")]: {
      fontSize: "2.5vw",
    },
  },
}));

export default function Header(props) {
  const classes = useStyles();
  const [checked, setChecked] = useState(false);
  useEffect(() => {
    setChecked(true);
  }, []);
  return (
    <div className={classes.root} id="header">
      <LandingNavBar />

      <Collapse
        in={checked}
        {...(checked ? { timeout: 1000 } : {})}
        collapsedHeight={50}
      >
        {/*<div className={classes.container}>*/}
        {/*  <h1 className={classes.catchPhrase}>*/}
        {/*    <span className={classes.catchPhaseShrink}>Reconnecting</span>*/}
        {/*    <br />*/}
        {/*    <span className={classes.titleColor}>Locals</span>*/}
        {/*  </h1>*/}
        {/* <div className={classes.btnHolder}> */}
        {/*<Grid*/}
        {/*  container*/}
        {/*  spacing={1}*/}
        {/*  direction="row"*/}
        {/*  justifyContent="center"*/}
        {/*  alignItems="center"*/}
        {/*>*/}
        {/*<Grid item xs={3}>*/}
        {/*  <ModalCard*/}
        {/*    obj={*/}
        {/*      <UserLogin*/}
        {/*        location={{*/}
        {/*          pathname: "/login",*/}
        {/*          search: "",*/}
        {/*          hash: "",*/}
        {/*          state: undefined,*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    }*/}
        {/*    text="Login"*/}
        {/*  />*/}
        {/*</Grid>*/}
        {/*<Grid item xs={4}>*/}
        {/*  <ModalCard*/}
        {/*    obj={*/}
        {/*      <UserSignUp*/}
        {/*        location={{*/}
        {/*          pathname: "/signup",*/}
        {/*          search: "",*/}
        {/*          hash: "",*/}
        {/*          state: undefined,*/}
        {/*        }}*/}
        {/*      />*/}
        {/*    }*/}
        {/*    text="Sign Up"*/}
        {/*  />*/}
        {/*</Grid>*/}
        {/*<Grid item xs={7} className={classes.dialog}>*/}
        {/*  <ModalCard text="Businesss? Sign Up" obj={<BusinessSignUp />} />*/}
        {/*</Grid>*/}
        {/*</Grid>*/}

        {/* </div> */}
        {/*<Scroll to="aboutHappenin" smooth={true}>*/}
        {/*  <IconButton>*/}
        {/*    <ExpandMoreIcons className={classes.goDown} />*/}
        {/*  </IconButton>*/}
        {/*</Scroll>*/}
        {/*</div>*/}
      </Collapse>
    </div>
  );
}
