import React, { useState } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Dialog } from "@material-ui/core";
import Confirmation from "../../../reusable/Confirmation";
import { BUSINESSNAME } from "../../../../util/keywords";
import { connect } from "react-redux";
import { TextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { NukeUser, verifyPassword } from "../../../../redux/actions";
import { InputAdornment } from "@material-ui/core";
import { IconButton } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  deactivateAccount: {
    color: "red",
    borderColor: "red",
    "&:focus": {
      outline: "none",
    },
  },
  modal: {
    "& .MuiPaper-root": {
      borderRadius: "8px",
      backgroundColor: "#292C31",
    },
  },
  textField: {
    "& .MuiFormHelperText-root": {
      color: "#FFFFFF",
    },
    "& .MuiSvgIcon-root": {
      color: "#FFFFFF",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ABABAB",
    },
    "& .MuiInputBase-input": {
      color: "#ABABAB",
    },
  },
}));

const WithPassword = React.memo((props) => {
  const classes = useStyles();
  const [internalPassword, setInternalPassword] = useState("");

  const { setPass, error } = props;
  //   const {errorObj } = props;
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full text-center">
      <Typography variant="overline">
        To continue with this action, please enter your password.
      </Typography>
      <TextField
        className={classes.textField}
        variant="outlined"
        margin="normal"
        fullWidth
        name="password"
        id="password"
        onChange={(e) => {
          setInternalPassword(e.target.value);
          setPass(e.target.value);
        }}
        value={internalPassword}
        type={showPassword ? "text" : "password"} // <-- This is where the magic happens
        InputProps={{
          // <-- This is where the toggle button is added.
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleClickShowPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        error={error}
        // helperText={errorObj.message}
        helperText={"Incorrect password, please try again."}
      />
    </div>
  );
});

function DeactivateAccount(props) {
  const [deactivateAccountDialogState, setDeactivateAccountDialogState] =
    useState(false);
  const {
    userData,
    verifyingCredError,
    verifyingCredErrorObject,
    credVerified,
  } = props;
  const { dispatch } = props;

  const name = userData?.displayname || userData[BUSINESSNAME];
  const classes = useStyles();
  const [password, setPassword] = useState("initialState");

  const handlePassSubmit = () => {
    dispatch(verifyPassword(password));
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={() => {
          setDeactivateAccountDialogState(true);
        }}
        className={classes.deactivateAccount}
      >
        Deactivate your account
      </Button>
      <Dialog
        className={classes.modal}
        open={deactivateAccountDialogState}
        onClose={() => {
          setDeactivateAccountDialogState(false);
        }}
      >
        <Confirmation
          title={`Deactivate your account?`}
          body={`${name}, are you sure you deactivate your acccount? This action is irrevesible.`}
          confirmAction={() => {
            //   dispatch the nuke endpoint
            handlePassSubmit();
          }}
          cancelAction={() => {
            setDeactivateAccountDialogState(false);
          }} // If they deccide against cancelling event
          cancelText={"Nevermind"}
          confirmText={"Yeah, cancel it."}
          loading={null}
          success={credVerified}
          error={null}
          successAction={() => {
            // after nuke is done, lead them back to some  "Sorry to see you go" page
          }}
          withPassword={true}
          WithPassword={
            <WithPassword
              setPass={setPassword}
              error={verifyingCredError}
              errorObj={verifyingCredErrorObject}
            />
          }
          withPasswordVerified={credVerified}
          withPasswordAction={() => {
            dispatch(NukeUser());
          }}
          //   WithPassword={
          //     <div>
          //       <TextField />
          //     </div>
          //   }
        />
      </Dialog>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    userData: state.auth.userData,
    userType: state.auth.userType,
    isVerifyingCred: state.auth.isVerifyingCred,
    verifyingCredError: state.auth.verifyingCredError,
    verifyingCredErrorObject: state.auth.verifyingCredErrorObject,
    credVerified: state.auth.credVerified,
  };
}

export default connect(mapStateToProps)(DeactivateAccount);
