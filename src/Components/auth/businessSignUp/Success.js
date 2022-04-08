import React from "react";
import PropTypes from "prop-types";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import LinearProgress from "@material-ui/core/LinearProgress";
import { makeStyles } from "@material-ui/core";

import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: { margin: "3rem" },
  button: {
    background: "#6661F2",
    borderRadius: "8px",
    marginTop: "15px",
  },
}));

function Success(props) {
  const { isLoggingIn, signupError, error } = props;
  const { signupErrorObject, isAuthenticated } = props;
  const { backtrackTo } = props;
  const classes = useStyles();
  const history = useHistory();

  const redirectToProfile = () => {
    history.push("/profilepage");
    setTimeout(() => {
      history.go(0);
    }, 3000);
  };

  return (
    <div className={classes.root}>
      {isLoggingIn ? (
        <>
          {isAuthenticated && redirectToProfile()}
          <LinearProgress color="secondary" />{" "}
        </>
      ) : signupError ? (
        <Grid container>
          <Grid
            item
            xs={12}
            className="flex flex-col justify-center items-center"
            style={{ color: "#ABABAB" }}
          >
            <Typography variant="h6">Uh-oh</Typography>
            <div style={{ color: "Red", marginBottom: 5 }}>
              <Typography>{error || signupErrorObject.message}</Typography>
            </div>
            <Typography variant="caption" display="block" gutterBottom>
              Don't worry, your data up to this point is still intact! Resolve
              your error and try again!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div className="w-full flex justify-end items-center">
              <Button
                onClick={() => {
                  backtrackTo(1);
                }}
                color="primary"
                variant="contained"
                className={`${classes.button} focus:outline-none`}
                style={{ padding: "8px 16px" }}
              >
                Let me try again
              </Button>
            </div>
          </Grid>
        </Grid>
      ) : isAuthenticated ? (
        <div>
          {/*<Redirect to="/profilepage" />*/}
          {redirectToProfile()}
          <Link to="/dashboard">Go to Dashboard!</Link>
        </div>
      ) : (
        <>
          {isAuthenticated && redirectToProfile()}
          <LinearProgress color="secondary" />
        </>
      )}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    signupError: state.auth.signupError,
    error: state.auth.error,
    signupErrorObject: state.auth.signupErrorObject,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

Success.propTypes = {
  backtrackTo: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(Success);
