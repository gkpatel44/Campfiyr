import React, { useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import PropTypes from "prop-types";

// MUI things
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";

import Button from "@material-ui/core/Button";
import { Grid, makeStyles } from "@material-ui/core";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useState } from "react";
import PromoCodeManager from "../../reusable/PromoCodeManager";
import { ReactComponent as CircleIcon } from "../assets/circle.svg";
import { ReactComponent as PhoneIcon } from "../assets/phone.svg";
import { ReactComponent as EmailIcon } from "../assets/email.svg";
import { ReactComponent as LocationIcon } from "../assets/location.svg";
import { firebaseAnalytics } from "../../../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1.5rem",
    background: "#383D43",
    color: "#ffffff",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    display: "flex",
  },
  title: {
    fontSize: "0.6rem",
    marginTop: "0.188rem",
  },
  headTitle: {
    fontSize: "1.75rem",
  },
  button: {
    background: "#6661F2",
    borderRadius: "8px",
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  makeItBold: {
    fontWeight: 700,
  },
  media: {
    height: 75,
  },
  paperEdge: {
    borderRadius: 5,
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
  useEffect(() => {
    firebaseAnalytics.logEvent("business_signup", {
      step: 4,
      name: "confirm",
    });
  }, []);
  const classes = useStyles();
  const { handleChange, values, handleExpiryDate, backtrackTo } = props;
  const { handleUpdateState } = props;
  const { createBusinessAccountUserPassHandler } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const proceed = (e) => {
    props.nextStep();
  };
  const goBack = (e) => {
    props.prevStep();
  };

  const handlePasswordShow = () => {
    setShowPassword(!showPassword);
  };
  const handleConfirmPasswordShow = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  const formik = useFormik({
    initialValues: {
      //pain -.-
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
      createBusinessAccountUserPassHandler(values.email, formValues.password);
    },
  });

  return (
    <div className={classes.root}>
      <div className="relative flex justify-center items-center w-full">
        <div
          onClick={goBack}
          className="absolute left-0 flex cursor-pointer justify-center items-center"
        >
          <span className="flex justify-center items-center mr-2 pb-2 text-3xl">
            &#8592;
          </span>
          <Typography className={`${classes.title} xs:hidden sm:block`}>
            Business Sign up
          </Typography>{" "}
        </div>
        <div>
          <Typography className={classes.headTitle}>Campfiyr</Typography>
        </div>
      </div>
      <div className="w-full flex justify-center items-center mt-14">
        <div
          className="w-6 h-6 flex justify-center items-center cursor-pointer"
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
          className="w-6 h-6 flex justify-center items-center cursor-pointer"
          style={{ color: "#6661F2" }}
          onClick={() => backtrackTo(2)}
        >
          <CircleIcon />
        </div>
        <div
          className="w-full flex justify-center items-center border-t-2"
          style={{ borderColor: "#6661F2" }}
        />
        <div
          className="w-6 h-6 flex justify-center items-center cursor-pointer"
          style={{ color: "#6661F2" }}
          onClick={() => backtrackTo(3)}
        >
          <CircleIcon />
        </div>
        <div
          className="w-full flex justify-center items-center border-t-2"
          style={{ borderColor: "#6661F2" }}
        />
        <div
          className="w-6 h-6 flex justify-center items-center cursor-pointer"
          style={{ color: "#FFC107" }}
          onClick={() => backtrackTo(4)}
        >
          <CircleIcon />
        </div>
      </div>
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
                  <h4 className="text-2xl">{values.businessName}</h4>
                  <div
                    className="flex justify-center items-center mb-3"
                    style={{ color: "#ABABAB" }}
                  >
                    <div className="mx-1">
                      <Typography style={{ fontSize: "10px" }}>
                        {values.main_category[0]}
                      </Typography>
                    </div>
                    <div className="mx-1">
                      <Typography style={{ fontSize: "10px" }}>
                        {values.sub_category1[0]}
                      </Typography>
                    </div>
                    <div className="mx-1">
                      <Typography style={{ fontSize: "10px" }}>
                        {values.sub_category2[0]}
                      </Typography>
                    </div>
                    <div className="mx-1">
                      <Typography style={{ fontSize: "10px" }}>
                        {values.sub_category3[0]}
                      </Typography>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="flex justify-center items-center flex-wrap">
                    <div className="flex justify-center items-center mx-3">
                      <div className="w-3 h-3 text-blue-600">
                        <PhoneIcon />
                      </div>
                      <div className="ml-2">
                        <Typography style={{ fontSize: "12px" }}>
                          {values.phoneNumber}
                        </Typography>
                      </div>
                    </div>
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
                  </div>
                  <div className="flex justify-center items-center mx-3 mt-1">
                    <div className="w-3 h-3 text-blue-600">
                      <LocationIcon />
                    </div>
                    <div className="ml-2">
                      <Typography style={{ fontSize: "12px" }}>
                        {values.city}, {values.province}, {values.country}
                      </Typography>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container justifyContent="center" spacing={2}>
              <Grid item xs={12} sm={6}>
                <Grid container direction="column" spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      name="password"
                      fullWidth
                      label="Password"
                      variant="outlined"
                      // className={classes.textField}
                      className={classes.customInput}
                      type={showPassword ? "text" : "password"} // <-- This is where the magic happens
                      // onChange={handleChange("password")}
                      onChange={formik.handleChange}
                      value={formik.values.password}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                      InputProps={{
                        // <-- This is where the toggle button is added.
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handlePasswordShow}
                              onMouseDown={handlePasswordShow}
                            >
                              {showPassword ? (
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
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Confrim Password"
                      variant="outlined"
                      name="confirmPassword"
                      className={classes.customInput}
                      type={showConfirmPassword ? "text" : "password"} // <-- This is where the magic happens
                      // onChange={handleChange("password")}
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
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid container direction="column" spacing={2}>
                  <Grid item xs={12}>
                    <div>
                      <PromoCodeManager
                        incomingCode={values.promoCode}
                        handleChange={handleChange}
                        handleExpiryDate={handleExpiryDate}
                      />
                    </div>
                  </Grid>
                  <Grid item xs={12}>
                    <div className="w-full flex justify-end items-center">
                      <Button
                        style={{ padding: "8px 16px", width: "50%" }}
                        color="primary"
                        className={`${classes.button} focus:outline-none`}
                        variant="contained"
                        type="submit"
                      >
                        Final Step
                      </Button>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

Confirm.propTypes = {
  nextStep: PropTypes.func.isRequired,
  handleUpdateState: PropTypes.func.isRequired,
  handleTime: PropTypes.func.isRequired,

  values: PropTypes.object.isRequired,
};

export default Confirm;
