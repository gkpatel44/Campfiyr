import React from "react";
// import { fade, makeStyles } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
// import InputBase from "@material-ui/core/InputBase";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
// import MenuIcon from "@material-ui/icons/Menu";
// import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Avatar, Hidden } from "@material-ui/core";
import { connect } from "react-redux";
import { ExitToApp } from "@material-ui/icons";
import { logoutUser } from "../redux/actions";
// import CloudCircles from "../Styles/CloudCircles";
import { Link, useHistory } from "react-router-dom";
import SearchBounce from "./SearchBounce";
import SearchBar from "../pages/Search/components/SearchBar";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    width: "100%",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    // fontFamily: "Nunito",
    fontWeight: "900",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "5vw",
      display: "block",
    },
  },
  link: {
    fontWeight: "700",
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  gradientNav: {
    // background: "linear-gradient(45deg, #b4a2ff 30%, #8374c2 90%)",
    background: "#292C31",
    borderBottom: "1px solid #383D43",
    padding: "10px 0",
  },
  search: {
    position: "relative",
    // borderRadius: theme.shape.borderRadius,
    // backgroundColor: fade(theme.palette.common.white, 0.15),
    // "&:hover": {
    //   backgroundColor: fade(theme.palette.common.white, 0.25),
    // }, "Search_BAD already has these embedded "
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function PrimaryNavBar(props) {
  const history = useHistory();

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const { userData, dispatch, isAuthenticated } = props;

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    console.log("handle menu open fired");
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    console.log("handle Menu close fired");
    handleMobileMenuClose();
  };
  const handleGoToProfile = () => {
    setAnchorEl(null);
    history.push("/profilepage");
    handleMobileMenuClose();
  };

  const handleGoToSettings = () => {
    setAnchorEl(null);
    history.push("/settings");
    handleMobileMenuClose();
  };

  const handleUserLogOut = () => {
    setAnchorEl(null);
    dispatch(logoutUser());
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleGoToProfile} to="/profilepage ">
        <Link to="/profilepage"> Profile </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={handleGoToSettings}>Settings</MenuItem>
      <MenuItem onClick={handleUserLogOut}>
        <ExitToApp /> Log Out
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      {isAuthenticated ? (
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <Avatar
              alt={userData?.displayName || userData.displayname}
              src={userData?.photoURL || userData?.imageDownloadURL}
            >
              {" "}
              <AccountCircle />
            </Avatar>
          </IconButton>
          <p>Profile</p>
        </MenuItem>
      ) : (
        <div>
          <Typography variant="body1" noWrap>
            <Link to="/login">Login</Link>
          </Typography>
        </div>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        color="secondary" //does nothing cause classes are applied
        className={classes.gradientNav}
      >
        {/*<CloudCircles />*/}
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography className={classes.title} variant="h5">
            <Link to={isAuthenticated ? "/dashboard" : "/"}>Campfiyr</Link>
          </Typography>
          <div className={classes.search}>
            {/* <div className={classes.searchIcon}>
              <SearchIcon />
            </div> */}
            {/* <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            /> */}
            <Hidden smUp>
              <SearchBounce />
            </Hidden>
            <Hidden xsDown>
              {/* eslint-disable-next-line react/jsx-pascal-case */}
              <SearchBar />
            </Hidden>
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="primary">
                <MailIcon style={{ color: "#ABABAB" }} />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="primary">
                <NotificationsIcon style={{ color: "#ABABAB" }} />
              </Badge>
            </IconButton> */}
            {isAuthenticated ? (
              <IconButton
                className="focus:outline-none"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <Avatar
                  alt={userData?.displayName}
                  src={userData?.photoURL || userData?.imageDownloadURL}
                >
                  {" "}
                  <AccountCircle />
                </Avatar>{" "}
              </IconButton>
            ) : (
              <div>
                <Typography variant="body1" noWrap>
                  <Link to="/login">Login</Link>
                </Typography>
              </div>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              className="focus:outline-none"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    userData: state.auth.userData,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(PrimaryNavBar);
