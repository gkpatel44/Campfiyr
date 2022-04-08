/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import CakeIcon from "@material-ui/icons/Cake";

import { makeStyles } from "@material-ui/core";
import { ReactComponent as CircleIcon } from "../assets/circle.svg";
import Avatar from "@material-ui/core/Avatar";
import { ReactComponent as EmailIcon } from "../assets/email.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1.5rem",
    background: "#383D43",
    color: "#ffffff",
  },
  encase: {
    // marginTop: 100,
    display: "flex",
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  errorText: {
    color: "#f50057",
    marginBottom: 5,
    textAlign: "center",
  },
  boldBoy: {
    fontWeight: 700,
  },
  title: {
    fontSize: "0.6rem",
    marginTop: "0.188rem",
  },
  headTitle: {
    fontSize: "1.75rem",
  },
  busInfo: {
    marginTop: "0.1rem",
    marginBottom: "0.5rem",
    textAlign: "center",
    fontSize: "0.8rem",
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
      paddingRight: "10px",
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
    "& ::-webkit-calendar-picker-indicator": {
      filter: "invert(70%)",
    },
  },
}));

const validationSchema = yup.object({
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  confirmPassword: yup
    .string()
    .required("Please re-enter your matching password")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
function Confirm(props) {
  const classes = useStyles();
  const { handleUpdateState, values, backtrackTo } = props;
  const { createUserAccountUserPassHandler } = props;
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordShow = () => {
    setShowPassword(!showPassword);
  };
  const handleConfirmPasswordShow = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const proceed = (e) => {
    props.nextStep();
  };
  const goBack = (e) => {
    props.prevStep();
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: (formValues) => {
      // We don't want to send back the form values this way because we have other
      // functions handling it already (They handle reshaping data to fit firebase schema)
      handleUpdateState(formValues);

      // alert(JSON.stringify(formValues, null, 2));
      proceed();
      createUserAccountUserPassHandler(values.email, formValues.password);
    },
  });

  return (
    <div className={classes.root}>
      {/* <div> */}
      <div className="relative flex justify-center items-center w-full">
        <div
          onClick={goBack}
          className="absolute left-0 flex cursor-pointer justify-center items-center"
        >
          <span className="flex justify-center items-center mr-2 pb-2 text-3xl">
            &#8592;
          </span>
          <Typography className={`${classes.title} xs:hidden sm:block`}>
            Basic Information
          </Typography>{" "}
        </div>
        <div>
          <Typography className={classes.headTitle}>Campfiyr</Typography>
        </div>
      </div>
      <div className="w-full flex justify-center items-center mt-14">
        <div
          className="flex justify-center items-center cursor-pointer"
          style={{ color: "#6661F2" }}
          onClick={() => backtrackTo(1)}
        >
          <CircleIcon />
        </div>
        <div
          className="w-full flex justify-center items-center border-t-2"
          style={{ borderColor: "#6661F2" }}
        />
        <div
          className="flex justify-center items-center cursor-pointer"
          style={{ color: "#FFC107" }}
          onClick={() => backtrackTo(2)}
        >
          <CircleIcon />
        </div>
      </div>
      <Typography className={classes.busInfo}>
        Now for the finishing touches
      </Typography>
      <Grid container spacing={2} justifyContent="center" direction="column">
        <Grid item xs={12}>
          <div className="w-full flex justify-center items-center">
            <div className="w-full relative mt-12 p-5 flex flex-col justify-center items-center">
              <div
                className="absolute top-0 right-0 bottom-0 left-0 rounded-lg"
                style={{ background: "#ABABAB", opacity: 0.1 }}
              />
              <div
                className="absolute w-full flex justify-center items-center"
                style={{ top: "-35px" }}
              >
                <div
                  className="flex justify-center items-center"
                  style={{ width: "70px", height: "70px" }}
                >
                  <Avatar
                    style={{ width: "100%", height: "100%" }}
                    src={values.image ? URL.createObjectURL(values.image) : ""}
                  >
                    H
                  </Avatar>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center mt-5">
                <div className="flex flex-col justify-center items-center">
                  <h4 className="text-2xl">
                    {/*<span className={classes.boldBoy}>Name:</span> {values.firstname}{" "}*/}
                    {values.firstname} {values.lastname}
                  </h4>
                </div>
              </div>
              <div className="flex justify-center items-center mt-3">
                <div className="flex justify-center items-center mx-3">
                  <div className="w-3 h-3 text-blue-600">
                    <EmailIcon />
                  </div>
                  <div className="ml-2">
                    <Typography style={{ fontSize: "12px" }}>
                      {values.email}
                    </Typography>
                  </div>
                </div>
                {values.birthdate && (
                  <div className="flex justify-center items-center mx-3">
                    <div
                      className="w-3 h-3 text-blue-600"
                      style={{ marginBottom: "15px" }}
                    >
                      <CakeIcon style={{ width: "1rem", height: "1rem" }} />
                    </div>
                    <div className="ml-2">
                      <Typography style={{ fontSize: "12px" }}>
                        {values.birthdate}
                      </Typography>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6}>
                <TextField
                  className={classes.customInput}
                  variant="outlined"
                  // margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  id="password"
                  type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handlePasswordShow}
                          onMouseDown={handlePasswordShow}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confrim Password"
                  variant="outlined"
                  name="confirmPassword"
                  className={classes.customInput}
                  type={showConfirmPassword ? "text" : "password"} // <-- This is where the magic happens
                  onChange={formik.handleChange}
                  value={formik.values.confirmPassword}
                  error={
                    formik.touched.confirmPassword &&
                    Boolean(formik.errors.confirmPassword)
                  }
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                  InputProps={{
                    // <-- This is where the toggle button is added.
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleConfirmPasswordShow}
                          onMouseDown={handleConfirmPasswordShow}
                        >
                          {showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item sm={6} className="xs:hidden sm:block" />
              <Grid item xs={12} sm={6}>
                <Button
                  className="focus:outline-none w-full"
                  style={{ background: "#6661F2", borderRadius: "8px" }}
                  color="primary"
                  variant="contained"
                  type="submit"
                >
                  Sign up
                </Button>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
      {/*<Typography component="span" variant="h5">*/}
      {/*  Now for the finishing touches*/}
      {/*</Typography>*/}

      {/*<Typography component="span" variant="body2">*/}
      {/*  <span className={classes.boldBoy}>Email:</span> {values.email}*/}
      {/*</Typography>*/}

      {/*<Typography component="span" variant="body2">*/}
      {/*  <span className={classes.boldBoy}>Birthdate:</span> {values.birthdate}*/}
      {/*</Typography>*/}

      {/* <Typography component="span" variant="body2">
        <span className={classes.boldBoy}>Main Interests:</span>{" "}
        {values.rank_prefer}
      </Typography>
      <Typography component="span" variant="body2">
        <span className={classes.boldBoy}>On Weekends:</span>{" "}
        {values.rank_weekend}
      </Typography>
      <Typography component="span" variant="body2">
        <span className={classes.boldBoy}>For a quick Bite:</span>{" "}
        {values.rank_quick_bite}
      </Typography>
      <Typography component="span" variant="body2">
        <span className={classes.boldBoy}>Eating out:</span>{" "}
        {values.rank_eat_out}
      </Typography> */}
      {/* </div> */}
      {/*<form onSubmit={formik.handleSubmit}>*/}
      {/*  <TextField*/}
      {/*    variant="outlined"*/}
      {/*    margin="normal"*/}
      {/*    fullWidth*/}
      {/*    name="password"*/}
      {/*    label="Password"*/}
      {/*    id="password"*/}
      {/*    type={showPassword ? "text" : "password"} // <-- This is where the magic happens*/}
      {/*    onChange={formik.handleChange}*/}
      {/*    value={formik.values.password}*/}
      {/*    error={formik.touched.password && Boolean(formik.errors.password)}*/}
      {/*    helperText={formik.touched.password && formik.errors.password}*/}
      {/*    InputProps={{*/}
      {/*      // <-- This is where the toggle button is added.*/}
      {/*      endAdornment: (*/}
      {/*        <InputAdornment position="end">*/}
      {/*          <IconButton*/}
      {/*            aria-label="toggle password visibility"*/}
      {/*            onClick={handlePasswordShow}*/}
      {/*            onMouseDown={handlePasswordShow}*/}
      {/*          >*/}
      {/*            {showPassword ? <Visibility /> : <VisibilityOff />}*/}
      {/*          </IconButton>*/}
      {/*        </InputAdornment>*/}
      {/*      ),*/}
      {/*    }}*/}
      {/*  />*/}
      {/*  <TextField*/}
      {/*    fullWidth*/}
      {/*    label="Confrim Password"*/}
      {/*    variant="outlined"*/}
      {/*    name="confirmPassword"*/}
      {/*    className={classes.textField}*/}
      {/*    type={showConfirmPassword ? "text" : "password"} // <-- This is where the magic happens*/}
      {/*    onChange={formik.handleChange}*/}
      {/*    value={formik.values.confirmPassword}*/}
      {/*    error={*/}
      {/*      formik.touched.confirmPassword &&*/}
      {/*      Boolean(formik.errors.confirmPassword)*/}
      {/*    }*/}
      {/*    helperText={*/}
      {/*      formik.touched.confirmPassword && formik.errors.confirmPassword*/}
      {/*    }*/}
      {/*    InputProps={{*/}
      {/*      // <-- This is where the toggle button is added.*/}
      {/*      endAdornment: (*/}
      {/*        <InputAdornment position="end">*/}
      {/*          <IconButton*/}
      {/*            aria-label="toggle password visibility"*/}
      {/*            onClick={handleConfirmPasswordShow}*/}
      {/*            onMouseDown={handleConfirmPasswordShow}*/}
      {/*          >*/}
      {/*            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}*/}
      {/*          </IconButton>*/}
      {/*        </InputAdornment>*/}
      {/*      ),*/}
      {/*    }}*/}
      {/*  />*/}
      {/*  <Grid container>*/}
      {/*    <Grid item xs>*/}
      {/*      <Button*/}
      {/*        onClick={goBack}*/}
      {/*        variant="contained"*/}
      {/*        className={classes.button}*/}
      {/*      >*/}
      {/*        Back*/}
      {/*      </Button>*/}
      {/*    </Grid>*/}

      {/*    <Grid item xs={7}>*/}
      {/*      <Button*/}
      {/*        color="primary"*/}
      {/*        className={classes.submit}*/}
      {/*        variant="contained"*/}
      {/*        type="submit"*/}
      {/*      >*/}
      {/*        Sign up*/}
      {/*      </Button>*/}
      {/*    </Grid>*/}
      {/*  </Grid>*/}
      {/*</form>*/}
    </div>
  );
}

Confirm.propTypes = {
  values: PropTypes.object.isRequired,
};

export default Confirm;
