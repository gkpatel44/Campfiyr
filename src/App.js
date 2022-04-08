/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@material-ui/core";
import React, { useCallback, useEffect, useState } from "react";
import { Fragment } from "react";
import { withSnackbar } from "notistack"; // maybe replace this s( somehow ) with material uis snackbar

// import { Router } from "@reach/router";
// import SignIn from "./Components/SignIn";
// import SignUp from "./Components/SignUp";
import Routes from "./Components/Routes";
import * as serviceWorker from "./serviceWorker";
import { connect } from "react-redux";
import { newAppVersionAvailable } from "./redux/actions";
// import UserProvider from "./providers/UserProvider";
// import ProfilePage from "./Components/ProfilePage";
// import { UserContext } from "./providers/UserProvider";

function App(props) {
  const [waitingWorker, setWaitingWorker] = useState(null);
  const { updateAvalable } = props;
  const [newVersionAvailable, setNewVersionAvailable] =
    useState(updateAvalable);
  const { enqueueSnackbar } = props;
  const { dispatch } = props;

  // https://dev.to/daniellycosta/showing-new-version-available-notification-on-create-react-app-pwas-3jc9
  const onServiceWorkerUpdate = useCallback((registration) => {
    setWaitingWorker(registration && registration.waiting);
    setNewVersionAvailable(true);
    dispatch(newAppVersionAvailable(true));
    console.log("onServiceWorkerUpdate Triggered!!!!");
  }, []);

  const updateServiceWorker = () => {
    waitingWorker && waitingWorker.postMessage({ type: "SKIP_WAITING" });
    console.log("waitingWorker: ", waitingWorker);
    setNewVersionAvailable(false);
    dispatch(newAppVersionAvailable(false));
    // dispatch(newAppVersionInstalled());
    console.log("Refreshing application to latest version");
    console.log("SKIP WAITING TRIGGERED");
    // window.location.href = "./";
    window.location.reload();
  };

  const refreshAction = useCallback((key) => {
    //render the snackbar button
    return (
      <Fragment>
        <Button
          className="snackbar-button"
          size="small"
          onClick={updateServiceWorker}
        >
          Start
        </Button>
      </Fragment>
    );
  }, []);

  useEffect(() => {
    console.log("newVersionAvailable:", newVersionAvailable);
    if (process.env.NODE_ENV === "production") {
      serviceWorker.register({ onUpdate: onServiceWorkerUpdate });
      console.log("on update has been registered");
    }
    if (newVersionAvailable) {
      //show snackbar with refresh button
      console.log("New version of application available!");
      enqueueSnackbar(
        "A new version is available, close all Campfiyr tabs to update",
        {
          persist: true,
          variant: "success",
          action: refreshAction(),
        }
      );
    }
  }, [
    newVersionAvailable,
    refreshAction,
    onServiceWorkerUpdate,
    enqueueSnackbar,
  ]);
  return (
    // <UserProvider>
    <Routes />
    // </UserProvider>
  );
}

function mapStateToProps(state) {
  return {
    updateAvalable: state.appInterface.updateAvalable,
  };
}

export default connect(mapStateToProps)(withSnackbar(App));
