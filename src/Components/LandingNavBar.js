import React, { useState } from "react";
import {
  makeStyles,
  Toolbar,
  Button,
  Typography,
  AppBar,
  IconButton,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { Link } from "react-router-dom";
import UserLogin from "./auth/UserLogin";
import ModalCard from "./ModalCard";
import { connect } from "react-redux";
import UserSignUp from "./auth/userSignUp/UserSignUp";
import BusinessSignUp from "./auth/businessSignUp/BusinessSignUp";
import Dialog from "@material-ui/core/Dialog";
import { firebaseAnalytics } from "../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // height: "100vh",
    fontFamily: "Nunito",
    fontWeight: "900",
    width: "100%",
  },
  appbar: {
    // background: "none",
    background: "rgba(0, 0, 0, 0.5)",
  },
  appBarTitle: {
    flexGrow: "1",
    fontSize: "2em",
  },
  appBarWrapper: {
    width: "90%",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },

  titleColor: {
    color: "#b4a2ff",
  },
  dashBtn: {
    FontColor: "#b4a2ff",
    backgroundColor: "#7950F3",
    fontFamily: "Nunito",
    fontWeight: "700",
    margin: "2px 10px",
    borderRadius: "8px",
  },
  links: {
    flexGrow: 1,
    margin: "5px 20px",
  },
  linkText: {
    fontWeight: 700,
    margin: "5px 10px",
  },
  menuList: {
    "& .MuiMenu-list": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      background: "#282D3B",
      color: "#FFFFFF",
    },
    "& .MuiMenu-paper": {
      border: "3px solid #282D3B",
    },
  },
  authBtnGroup: {
    display: "none",
    "@media screen and (min-width: 768px)": {
      display: "flex",
    },
  },
  menuIcon: {
    display: "none",
    "@media screen and (max-width: 767px)": {
      display: "flex",
    },
  },
  tabsGroup: {
    display: "none",
    "@media screen and (min-width: 768px)": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
  dialogCustomised: {
    "& .MuiDialog-paperWidthSm": {
      maxWidth: "900px",
      width: "600px",
      borderRadius: "5px",
      background: "#383D43",
    },
    "& .MuiDialog-paper": {
      margin: "10px",
      borderRadius: "5px",
    },
    "& .MuiDialog-paperScrollPaper": {
      maxHeight: "100%",
    },
  },
}));

function LandingNavBar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [dialogContent, setDialogContent] = useState(null);
  const { isAuthenticated } = props;
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setDialogContent(null);
  };

  const handleClickOpen = (event) => {
    event.preventDefault();
    setOpen(true);
    let title = event.currentTarget.value;
    if (title === "business") {
      setDialogContent("business");
    } else if (title === "login") {
      setDialogContent("login");
    } else {
      setDialogContent("user");
    }
  };

  const handleDialogClose = () => {
    setOpen(false);
    setDialogContent(null);
  };

  return (
    <div className={classes.root}>
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar className={classes.appBarWrapper}>
          <div className="flex justify-start items-center flex-wrap">
            <h1 className={classes.appBarTitle}>
              <Link to="/">
                <span className={classes.titleColor}>Campfiyr</span>
              </Link>
            </h1>
            <div className={classes.tabsGroup}>
              <Link to="/about" className={classes.links}>
                <Typography variant="body2" className={classes.linkText}>
                  About
                </Typography>
              </Link>
              {/*<Link to="/blog" className={classes.links}>*/}
              {/*  <Typography*/}
              {/*    variant="body2"*/}
              {/*    className={classes.linkText}*/}
              {/*  >{`Blogs & Updates`}</Typography>*/}
              {/*</Link>*/}

              {/*<Link to="/contact" className={classes.links}>*/}
              {/*  <Typography variant="body2" className={classes.linkText}>*/}
              {/*    Contact*/}
              {/*  </Typography>{" "}*/}
              {/*</Link>*/}
            </div>
          </div>
          <div
            className={`${classes.authBtnGroup} justify-center items-center`}
          >
            {isAuthenticated && (
              <Link
                to="/dashboard"
                onClick={() => {
                  firebaseAnalytics.logEvent("view_dashboard", {
                    from: "landing",
                  });
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className={`${classes.dashBtn} focus:outline-none`}
                >
                  Dashboard
                </Button>
              </Link>
            )}
            {!isAuthenticated && (
              <>
                <ModalCard
                  obj={
                    <UserLogin
                      location={{
                        pathname: "/login",
                        search: "",
                        hash: "",
                        state: undefined,
                      }}
                    />
                  }
                  text="Login"
                  btnStyle={classes.dashBtn}
                />

                <ModalCard
                  obj={<UserSignUp />}
                  text="Sign Up"
                  btnStyle={classes.dashBtn}
                />
                <ModalCard
                  text="Business? Sign Up"
                  obj={<BusinessSignUp />}
                  btnStyle={classes.dashBtn}
                />
              </>
            )}
          </div>
          <div className={classes.menuIcon} onClick={handleMenuOpen}>
            <IconButton
              className="focus:outline-none"
              style={{ background: "rgba(128, 128, 128, 0.2)" }}
            >
              <MenuIcon style={{ color: "#7950F3" }} />
            </IconButton>
          </div>
          <Menu
            className={classes.menuList}
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleMenuClose}
          >
            {/*<MenuItem onClick={handleMenuClose}>*/}
            {/*  <Button*/}
            {/*    variant="contained"*/}
            {/*    color="primary"*/}
            {/*    className={`${classes.dashBtn} focus:outline-none`}*/}
            {/*  >*/}
            {/*    <Link to="/dashboard">Dashboard</Link>*/}
            {/*  </Button>*/}
            {/*</MenuItem>*/}
            <MenuItem>
              <Link to="/about" className={classes.links}>
                <Typography variant="body2" className={classes.linkText}>
                  About
                </Typography>
              </Link>
            </MenuItem>
            {/*<MenuItem>*/}
            {/*  <Link to="/blog" className={classes.links}>*/}
            {/*    <Typography*/}
            {/*      variant="body2"*/}
            {/*      className={classes.linkText}*/}
            {/*    >{`Blogs & Updates`}</Typography>*/}
            {/*  </Link>*/}
            {/*</MenuItem>*/}
            {/*<MenuItem>*/}
            {/*  <Link to="/contact" className={classes.links}>*/}
            {/*    <Typography variant="body2" className={classes.linkText}>*/}
            {/*      Contact*/}
            {/*    </Typography>{" "}*/}
            {/*  </Link>*/}
            {/*</MenuItem>*/}
            {!isAuthenticated && (
              <>
                <MenuItem>
                  <Button
                    variant="contained"
                    color="primary"
                    value="login"
                    className={classes.dashBtn}
                    onClick={handleClickOpen}
                  >
                    Login{" "}
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    variant="contained"
                    color="primary"
                    value="user"
                    className={classes.dashBtn}
                    onClick={handleClickOpen}
                  >
                    Sign Up{" "}
                  </Button>
                </MenuItem>
                <MenuItem>
                  <Button
                    variant="contained"
                    color="primary"
                    value="business"
                    onClick={handleClickOpen}
                    className={classes.dashBtn}
                  >
                    Business? Sign Up{" "}
                  </Button>
                </MenuItem>{" "}
              </>
            )}
          </Menu>
          <Dialog
            className={classes.dialogCustomised}
            onClose={handleDialogClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            {dialogContent && dialogContent === "business" && (
              <BusinessSignUp />
            )}
            {dialogContent && dialogContent === "user" && <UserSignUp />}
            {dialogContent && dialogContent === "login" && (
              <UserLogin
                location={{
                  pathname: "/login",
                  search: "",
                  hash: "",
                  state: undefined,
                }}
              />
            )}
          </Dialog>
        </Toolbar>
      </AppBar>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(LandingNavBar);
