import React, { Component, useEffect } from "react";
import { connect } from "react-redux";

import { Redirect, Link, withRouter } from "react-router-dom";
import {
  loginUser,
  loginWithFacebook,
  loginWithGoogle,
  assignUserType,
  loadUserOrBusinessData,
} from "../../redux/actions";
import { withStyles } from "@material-ui/styles";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Grid } from "@material-ui/core";
import { Helmet } from "react-helmet";

const styles = () => ({
  "@global": {
    body: {
      backgroundColor: "#fff",
    },
  },
  headTitle: {
    fontSize: "1.75rem",
    color: "#FFFFFF",
  },
  encase: {
    display: "flex",
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#f50057",
  },
  form: {
    marginTop: 1,
  },
  errorText: {
    color: "red",
    marginBottom: 5,
    textAlign: "center",
  },
  submit: {
    margin: "10px 0",
    padding: "8px 0",
    borderRadius: "8px",
    "&:focus": {
      outline: "none",
    },
  },
  signInWithGoogle: {
    // display: "inherit",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "8px 0",
    background: "white",
    color: "#444",
    fontFamily: "Roboto",
    fontWeight: "bold",
    borderRadius: "8px",
    border: "thin solid #888",
    boxShadow: "1px 1px 1px grey",
    whiteSpace: "nowrap",
    margin: "10px 0",
    "&:focus": {
      outline: "none",
    },
  },
  signInWithFacebook: {
    // display: "inherit",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: "9px 0",
    background: "#1877F2",
    color: "white",
    fontFamily: "Roboto",
    fontWeight: "600",
    textTransform: "none",
    borderRadius: "5px",
    whiteSpace: "nowrap",
    margin: "10px 0",
    "&:focus": {
      outline: "none",
    },
  },
  customInput: {
    background: "#292C31",
    borderColor: "#292C31",
    borderRadius: "8px",
    "& .MuiOutlinedInput-input": {
      padding: 0,
    },
    "& .MuiOutlinedInput-input:-webkit-autofill": {
      WebkitBoxShadow: "0 0 0 1000px #292C31 inset",
      WebkitTextFillColor: "#ABABAB",
      paddingLeft: "10px",
    },
    "& .makeStyles-customInput-64 .MuiOutlinedInput-input": {
      padding: 0,
      fontSize: "12px",
      height: "40px",
    },
    "& .MuiInputBase-input": {
      height: "40px",
      paddingLeft: "10px",
      color: "#ABABAB",
      fontSize: "12px",
    },
    "& .MuiInputLabel-formControl": {
      top: "-10px",
      fontSize: "12px",
      color: "#ABABAB",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "8px",
    },
    "& .MuiInputLabel-outlined": {
      transform: "translate(14px, 24px) scale(1)",
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(14px, 5px) scale(0.75)",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      // borderColor: "#ABABAB",
      borderWidth: 0,
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
      padding: 0,
      paddingLeft: "10px",
    },
    '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"] .MuiAutocomplete-input':
      {
        padding: 0,
      },
    "& .MuiSvgIcon-root": {
      color: "#ABABAB",
    },
    "& .PrivateNotchedOutline-root-34": {
      borderWidth: 0,
    },
    "& .MuiSelect-nativeInput": {
      opacity: 1,
      top: 0,
      borderRadius: "8px",
      background: "#292C31",
      color: "#ABABAB",
      fontSize: "12px",
      paddingLeft: "10px",
    },
  },
});

class UserLogin extends Component {
  state = { email: "", password: "", showPassword: false };

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { email, password } = this.state;

    dispatch(loginUser(email, password));
    //If no errors do the rest
    // dispatch(assignUserType("client"));
    // dispatch(generateUserData("client", {}));
    dispatch(loadUserOrBusinessData());
  };

  handleGoogleSignIn = () => {
    const { dispatch } = this.props;
    dispatch(loginWithGoogle());
    dispatch(assignUserType("client"));
    // dispatch(loadUserOrBusinessData());
    // dispatch(generateUserData("client", {}));
  };

  handleFacebookSignIn = () => {
    const { dispatch } = this.props;
    dispatch(loginWithFacebook());
    dispatch(assignUserType("client"));
    // dispatch(loadUserOrBusinessData());

    // dispatch(generateUserData("client", {}));
  };

  render() {
    const { classes, loginError, isAuthenticated } = this.props;
    const { loginErrorObject } = this.props;
    const { showPassword } = this.state;
    const { from } = this.props.location.state || {
      from: { pathname: "/dashboard" },
    };

    const handleClickShowPassword = () => {
      this.setState({
        showPassword: !showPassword,
      });
    };
    const handleMouseDownPassword = () => {
      this.setState({
        showPassword: !showPassword,
      });
    };
    const goToDash = (value) => {
      if (value) {
        this.props.history.push({ pathname: "/dashboard" });
      }
    };
    const AuthObserver = ({ value, didUpdate }) => {
      useEffect(() => {
        didUpdate(value);
      }, [value, didUpdate]);
      return null; // component does not render anything
    };
    if (isAuthenticated) {
      console.log(isAuthenticated, from);
      return <Redirect to={from} />;
    } else {
      console.log("Login component heree", isAuthenticated, from);
      return (
        // <Container component="main">
        <div
          className="shadow-lg"
          style={{
            background: "#383D43",
            borderRadius: "8px",
            padding: "16px",
            width: "100%",
          }}
        >
          <Helmet>
            <title>User Login : Campfiyr</title>
          </Helmet>
          <AuthObserver didUpdate={goToDash} value={isAuthenticated} />
          <div className={classes.encase}>
            <div className="relative flex justify-center items-center w-full mb-3">
              <Typography className={classes.headTitle}>Campfiyr</Typography>
            </div>
            {/*<Avatar className={classes.avatar}>*/}
            {/*  <LockOutlinedIcon />*/}
            {/*</Avatar>*/}
            <Typography className="text-white">Sign in</Typography>
            <form style={{ width: "100%" }}>
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.customInput}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={this.handleEmailChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.customInput}
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    id="password"
                    type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                    onChange={this.handlePasswordChange}
                    InputProps={{
                      // <-- This is where the toggle button is added.
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </form>
            {loginError && (
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <Typography component="p" className={classes.errorText}>
                    {loginErrorObject?.message}
                  </Typography>
                </Grid>
              </Grid>
            )}
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={this.handleSubmit}
                >
                  Sign In
                </Button>
              </Grid>
            </Grid>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  className={classes.signInWithGoogle}
                  startIcon={
                    <Avatar
                      src={
                        "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                      }
                      style={{ width: "1.2rem", height: "auto" }}
                    />
                  }
                  onClick={this.handleGoogleSignIn}
                >
                  Sign In With Google
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.signInWithFacebook}
                  startIcon={
                    <Avatar
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/logos/f_logo_RGB-White_58.png"
                      }
                      style={{ width: "1.2rem", height: "auto" }}
                    />
                  }
                  onClick={this.handleFacebookSignIn}
                >
                  Continue with Facebook
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              justifyContent="center"
              style={{ marginTop: "20px" }}
            >
              <Grid item xs={12}>
                <Typography className="text-center">
                  <span className="text-white mr-2">New to Campfiyr?</span>
                  <Link to="/signup" style={{ color: "#b4a2ff" }}>
                    Sign up here
                  </Link>
                </Typography>
              </Grid>
            </Grid>
          </div>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    loginErrorObject: state.auth.loginErrorObject,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default withRouter(
  withStyles(styles)(connect(mapStateToProps)(UserLogin))
);
