import React, { useEffect } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  modal: {
    padding: "16px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFFFFF",
    borderRadius: "8px",
    background: "#292C31",
    "& .MuiPaper-root": {
      borderRadius: "8px",
      backgroundColor: "#292C31",
    },
  },
  button: {
    "&:focus": {
      outline: "none",
    },
  },
}))

export default function Confirmation(props) {
  const { title, body, confirmAction, confirmText } = props;
  const { loading, success, error, successAction } = props;
  const { cancelAction, cancelText } = props;
  const classes = useStyles();
  const {
    withPassword,
    WithPassword,
    withPasswordVerified,
    withPasswordAction,
  } = props;
  // This is only relevant for when confirmation has async requirements
  useEffect(() => {
    console.log("Success and error: ", success, error);

    if (success && !error) {
      successAction();
    } else if (error) {
      console.error(error);
      // TODO: do something i
    }
    return () => {};
  }, [success, error, loading, successAction]);

  useEffect(() => {
    if (withPassword && withPasswordVerified) {
      // if password field was required and password is correct
      withPasswordAction();
    }
  }, [withPassword, withPasswordVerified, withPasswordAction]);
  return (
    <div>
      <Card className={classes.modal}>
        <CardContent>
          <Typography variant="h5" component="h2" className="text-center">
            {title}
          </Typography>
          <Typography variant="body2" component="p" className="text-center">
            {body}
            <br />
          </Typography>
          {withPassword && <>{WithPassword}</>}
        </CardContent>
        <CardActions>
          <Button
            className={classes.button}
            size="small"
            color="primary"
            pending={loading}
            onClick={cancelAction}
          >
            {cancelText ? cancelText : "Cancel"}
          </Button>
          <Button
            className={classes.button}
            size="small"
            color="primary"
            onClick={confirmAction}
            pending={loading}
            variant="contained"
          >
            {loading ? (
              <CircularProgress size={14} style={{ color: "white" }} />
            ) : confirmText ? (
              confirmText
            ) : (
              "Continue"
            )}
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

Confirmation.propTypes = {
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  confirmAction: PropTypes.func.isRequired,
  cancelAction: PropTypes.func.isRequired,
  cancelText: PropTypes.string.isRequired,
  confirmText: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  success: PropTypes.bool,
  error: PropTypes.bool,
  successAction: PropTypes.func,
  withPassword: PropTypes.bool,
  WithPassword: PropTypes.node,
  withPasswordVerified: PropTypes.node,
  withPasswordAction: PropTypes.func,
};
