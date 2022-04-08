import React, { Component } from "react";
import { connect } from "react-redux";

import { Redirect, Link } from "react-router-dom";
import {
  loginUser,
  assignUserType,
  generateUserData,
} from "../../redux/actions";
import { withStyles } from "@material-ui/styles";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import { Helmet } from "react-helmet";

const styles = () => ({
  "@global": {
    body: {
      backgroundColor: "#fff",
    },
  },
  paper: {
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
    color: "#f50057",
    marginBottom: 5,
    textAlign: "center",
  },
  submit: {
    marginBottom: 5,
  },
  signInWithGoogle: {
    display: "inherit",
    background: "white",
    color: "#444",
    fontFamily: "Roboto",
    fontWeight: "bold",
    borderRadius: "5px",
    border: "thin solid #888",
    boxShadow: "1px 1px 1px grey",
    whiteSpace: "nowrap",
    marginBottom: 5,
  },
  signInWithFacebook: {
    display: "inherit",
    background: "#1877F2",
    color: "white",
    fontFamily: "Roboto",
    fontWeight: "600",
    textTransform: "none",
    borderRadius: "5px",
    whiteSpace: "nowrap",
    marginBottom: 10,
  },
});

class BusinessLogin extends Component {
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
    dispatch(assignUserType("business"));
    dispatch(generateUserData("business", {}));
  };

  render() {
    const { classes, loginError, isAuthenticated } = this.props;
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

    if (isAuthenticated) {
      return <Redirect to={from} />;
    } else {
      return (
        <Container component="main" maxWidth="xs">
          <Helmet>
            <title>Business Login : Campfiyr</title>
          </Helmet>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Business Sign in
            </Typography>
            <form style={{ width: "100%" }}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={this.handleEmailChange}
              />
              <TextField
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
            </form>
            {loginError && (
              <Typography component="p" className={classes.errorText}>
                Incorrect email or password.
              </Typography>
            )}
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
            <Typography component="p">
              New to Campfiyr?{" "}
              <Link to="/businessSignup" style={{ color: "#b4a2ff" }}>
                Create your business account here
              </Link>
            </Typography>
          </Paper>
        </Container>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(BusinessLogin));
