import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Box, makeStyles, Tab, Tabs, IconButton } from "@material-ui/core";
import { Helmet } from "react-helmet";
import NavBar from "../Components/NavBar";
import AccountSettings from "../Components/Settings/Account";
// import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
// import {ExitToApp} from "@material-ui/icons";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function TabPanel(props) {
  const { children, value, index, name, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${name}`}
      aria-labelledby={`settings-tab-${name}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  name: PropTypes.any.isRequired,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(name) {
  return {
    id: `settings-tab-${name}`,
    "aria-controls": `settings-tabpanel-${name}`,
  };
}

const useStyles = makeStyles((theme) => ({
  wrapper: {
    background: "#292C31",
    minHeight: "100vh",
    "-ms-overflow-style": "none",
    "scrollbar-width": "none",
    "&::-webkit-scrollbar": {
      width: 0,
      height: 0,
    },
  },
  root: {
    // flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    background: "#383D43",
    borderRadius: "8px",
    color: "#FFFFFF",
    display: "flex",
    // height: 224,
    padding: "16px",
  },
  iconTabsMenu: {
    display: "none",
    "@media screen and (max-width: 640px)": {
      display: "block",
    },
    "&:focus": {
      outline: "none",
    },
    color: "#FFFFFF",
  },
  tabsMobile: {
    "& .MuiButtonBase-root": {
      "&:focus": {
        outline: "none",
      },
    },
    display: "none",
    "@media screen and (max-width: 640px)": {
      display: "block",
    },
  },
  tabs: {
    // borderRight: `1px solid ${theme.palette.divider}`,
    "& .MuiButtonBase-root": {
      "&:focus": {
        outline: "none",
      },
    },
    display: "none",
    "@media screen and (min-width: 641px)": {
      display: "block",
    },
    minWidth: "200px",
  },
  content: {
    padding: "20px",
    "@media screen and (max-width: 640px)": {
      padding: "8px",
    },
  },
}));

const nameToIndex = (tab) => {
  switch (tab) {
    case "account":
      return 0;
    case "security":
      return 1;
    case "privacy":
      return 2;
    case "notifications":
      return 3;
    case "subscription":
      return 4;

    default:
      return 0;
  }
};

const tabNames = {
  0: "account",
  1: "security",
  // 2: "privacy",
  // 3: "notifications",
  2: "subscription",
};

export default function Settings() {
  let query = useQuery();
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();

  const classes = useStyles();
  const [value, setValue] = React.useState(nameToIndex(query.get("tab")) || 0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClick = (tab) => {
    // history.push(`/settings?tab=${tab}`); this causes the app to stutter enough for me to hate it so either find anohther way to handle or scrap
  };

  const handleMobileMenuTabsOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuTabsClose = () => {
    setAnchorEl(null);
  };

  const handleMobileClick = (id) => {
    handleClick(id);
    handleMobileMenuTabsClose();
  };

  const renderMobileMenuTabs = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id="mobile-menu-tabs"
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={Boolean(anchorEl)}
      onClose={() => handleMobileMenuTabsClose()}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Settings tabs"
        className={classes.tabsMobile}
      >
        <Tab
          label="Account"
          {...a11yProps("account")}
          onClick={() => {
            handleMobileClick("account");
          }}
        />
        <Tab
          label="Login &amp; Security"
          {...a11yProps("security")}
          onClick={() => {
            handleMobileClick("security");
          }}
        />
        {/*<Tab*/}
        {/*  label="Privacy"*/}
        {/*  {...a11yProps("privacy")}*/}
        {/*  onClick={() => {*/}
        {/*    handleMobileClick("privacy");*/}
        {/*  }}*/}
        {/*/>*/}
        {/*<Tab*/}
        {/*  label="Notifications"*/}
        {/*  {...a11yProps("notifications")}*/}
        {/*  onClick={() => {*/}
        {/*    handleMobileClick("notifications");*/}
        {/*  }}*/}
        {/*/>*/}
        <Tab
          label="Subscription"
          {...a11yProps(4)}
          onClick={() => {
            handleMobileClick("subscription");
          }}
        />
      </Tabs>
    </Menu>
  );

  return (
    <div className={classes.wrapper}>
      <Helmet>
        <title>Settings | Campfiyr</title>
      </Helmet>
      <NavBar />

      <IconButton className={classes.iconTabsMenu}>
        <MenuIcon
          onClick={(e) => handleMobileMenuTabsOpen(e)}
          aria-controls="mobile-menu-tabs"
          aria-haspopup="true"
          edge="end"
        />
        <Typography style={{ marginLeft: "10px" }}>
          {tabNames[value].toUpperCase()}
        </Typography>
      </IconButton>

      <div className={classes.content}>
        <div className={classes.root}>
          {/*This will be the setting page*/}
          {/* For example http://localhost:3000/settings?tab=ok&extra=yuh */}
          <h1>{query.get("tab")}</h1>
          <h1>{query.get("extra")}</h1>
          {renderMobileMenuTabs}
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Settings tabs"
            className={classes.tabs}
          >
            <Tab
              label="Account"
              {...a11yProps("account")}
              onClick={() => {
                handleClick("account");
              }}
            />
            <Tab
              label="Login &amp; Security"
              {...a11yProps("security")}
              onClick={() => {
                handleClick("security");
              }}
            />
            {/*<Tab*/}
            {/*  label="Privacy"*/}
            {/*  {...a11yProps("privacy")}*/}
            {/*  onClick={() => {*/}
            {/*    handleClick("privacy");*/}
            {/*  }}*/}
            {/*/>*/}
            {/*<Tab*/}
            {/*  label="Notifications"*/}
            {/*  {...a11yProps("notifications")}*/}
            {/*  onClick={() => {*/}
            {/*    handleClick("notifications");*/}
            {/*  }}*/}
            {/*/>*/}
            <Tab
              label="Subscription"
              {...a11yProps(4)}
              onClick={() => {
                handleClick("subscription");
              }}
            />
            {/*<Tab label="Item Six" {...a11yProps(5)} />*/}
            {/*<Tab label="Item Seven" {...a11yProps(6)} />*/}
          </Tabs>
          <TabPanel
            value={value}
            name={"account"}
            index={0}
            className="w-full flex flex-col justify-center items-center"
          >
            General Account settings will live here
            <AccountSettings />
          </TabPanel>
          <TabPanel value={value} name={"security"} index={1}>
            Security settings will exist here
          </TabPanel>
          {/*<TabPanel value={value} name={"privacy"} index={2}>*/}
          {/*  privacy settings will exist here*/}
          {/*</TabPanel>*/}
          {/*<TabPanel value={value} name={"notifications"} index={3}>*/}
          {/*  Notification settings will exist here*/}
          {/*</TabPanel>*/}
          <TabPanel value={value} name={"subscription"} index={2}>
            Subscription settings exist here
          </TabPanel>
          {/*<TabPanel value={value} name={5} index={5}>*/}
          {/*  Item Six*/}
          {/*</TabPanel>*/}
          {/*<TabPanel value={value} name={6} index={6}>*/}
          {/*  Item Seven*/}
          {/*</TabPanel>*/}
        </div>
      </div>
    </div>
  );
}
