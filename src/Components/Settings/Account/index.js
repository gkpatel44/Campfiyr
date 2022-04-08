import React from "react";

import { makeStyles } from "@material-ui/core";

import EditProfile from "./Components/EditProfile";
import DeactivateAccount from "./Components/DeactivateAccount";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export default function Index() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <EditProfile />
      <DeactivateAccount />
    </div>
  );
}
