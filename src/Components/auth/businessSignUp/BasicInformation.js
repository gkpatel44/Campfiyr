import React, { useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";

// MUI things
// import MenuItem from "@material-ui/core/MenuItem";
import { Avatar, FormControl, Grid, TextField } from "@material-ui/core";
import { ReactComponent as CircleIcon } from "../assets/circle.svg";

import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import PlacesAutoComplete from "../../reusable/PlacesAutoComplete";
import MuiPhoneNumber from "material-ui-phone-number";
import { Person } from "@material-ui/icons";
import { Redirect } from "react-router";
import { firebaseAnalytics } from "../../../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1.5rem",
    background: "#383D43",
    color: "#ffffff",
  },
  select: {
    "& .MuiSelect-icon": {
      color: "#ABABAB",
      '& .MuiAutocomplete-inputRoot[class*="MuiOutlinedInput-root"]': {
        padding: 0,
      },
    },
  },
  title: {
    fontSize: "0.6rem",
    marginTop: "0.188rem",
  },
  headTitle: {
    fontSize: "1.75rem",
  },
  button: {
    width: "100%",
    background: "#6661F2",
    borderRadius: "8px",
  },
  imagePreview: {
    width: "4rem",
    height: "4rem",
    // border: "5px solid #fff",
    borderRadius: "50%",
    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.12)",
    backgroundColor: "#292C31",
  },
  pencil: {
    borderRadius: "50%",
  },
  rightSpace: {
    marginRight: "1rem",
  },
  avatar: {
    // marginRight: "2rem",
    width: "100%",
    height: "100%",
  },
  phoneNumber: {
    // marginTop: 5,
  },
  businessName: {
    marginTop: "2rem",
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
// const today = new Date();
const phoneRegExp =
  /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/;

const validationSchema = yup.object({
  email: yup
    .string()
    .email("That email address doesn't look right")
    .required("Email is required, how else would we reach you?"),
  phoneNumber: yup.string().matches(phoneRegExp, "Phone number is not valid"),
  businessName: yup
    .string()
    .required("Required!")
    .max(60, "Must be 60 characters or less"),
  address: yup.string().required("Required!"),
  city: yup.string().required("Required!"),
  province: yup.string().required("Required!"),
  country: yup.string().required("Required!"),
});

function BasicInformation(props) {
  useEffect(() => {
    firebaseAnalytics.logEvent("business_signup", {
      step: 1,
      name: "basic_information",
    });
  }, []);
  const classes = useStyles();
  const { isAuthenticated, backtrackTo } = props;
  const { from } = props.location.state || { from: { pathname: "/" } };
  const {
    handleUpdateState,
    // handlePhone
  } = props;
  const { values, handleAddress, handleLocation, handleImageChange } = props;

  const formik = useFormik({
    initialValues: {
      businessName: values.businessName,
      email: values.email,
      phoneNumber: values.phoneNumber || "",
      address: values.address || "",
      city: values.city || "Toronto",
      province: values.province || "Ontario",
      country: values.country || "Canada",
    },
    validationSchema: validationSchema,
    onSubmit: (formValues) => {
      //   values = { ...values, ...formValues };
      handleUpdateState(formValues);
      // alert(JSON.stringify(formValues, null, 2));
      proceed();
    },
  });
  const proceed = (e) => {
    props.nextStep();
  };

  return isAuthenticated ? (
    <Redirect to={from} />
  ) : (
    <div className={`${classes.root}`}>
      <div className="relative flex justify-center items-center w-full">
        <div>
          <Typography className={classes.headTitle}>Campfiyr</Typography>
        </div>
      </div>
      <div className="w-full flex justify-center items-center mt-14">
        <div
          className="w-6 h-6 flex justify-center items-center cursor-pointer"
          style={{ color: "#FFC107" }}
          onClick={() => backtrackTo(1)}
        >
          <CircleIcon />
        </div>
        <div
          className="w-full flex justify-center items-center border-t-2"
          style={{ borderColor: "#ABABAB" }}
        />
        <div
          className="w-6 h-6 flex justify-center items-center cursor-pointer"
          style={{ color: "#ABABAB" }}
          onClick={() => backtrackTo(2)}
        >
          <CircleIcon />
        </div>
        <div
          className="w-full flex justify-center items-center border-t-2"
          style={{ borderColor: "#ABABAB" }}
        />
        <div
          className="w-6 h-6 flex justify-center items-center cursor-pointer"
          style={{ color: "#ABABAB" }}
          onClick={() => backtrackTo(3)}
        >
          <CircleIcon />
        </div>
        <div
          className="w-full flex justify-center items-center border-t-2"
          style={{ borderColor: "#ABABAB" }}
        />
        <div
          className="w-6 h-6 flex justify-center items-center cursor-pointer"
          style={{ color: "#ABABAB" }}
          onClick={() => backtrackTo(4)}
        >
          <CircleIcon />
        </div>
      </div>
      <Typography className={classes.busInfo}>Business Information</Typography>
      <form onSubmit={formik.handleSubmit} className={classes.formControl}>
        <div className="flex justify-start items-center mb-6">
          <Avatar
            src={values.image ? URL.createObjectURL(values.image) : ""}
            className={classes.imagePreview}
          >
            <div className="w-10 h-10 flex justify-center items-center">
              <Person className={classes.avatar} />
            </div>
            {/*<div className="w-16 h-16">*/}
            {/*  <img alt="userIcon" src={userIcon} className="w-full" />*/}
            {/*</div>*/}
          </Avatar>
          <div className="relative">
            <span className="text-xs ml-5">Upload Business Logo</span>
            <input
              className="absolute top-0 right-0 bottom-0 left-0 opacity-0"
              id="imageChooser"
              accept="image/*"
              type="file"
              onChange={handleImageChange}
              // hidden
            />
          </div>
        </div>

        <Grid container spacing={2} justifyContent="center">
          <Grid item lg={6} sm={6} xs={12} md={6}>
            <TextField
              style={{ width: "100%" }}
              className={classes.customInput}
              name="businessName"
              variant="outlined"
              label="Business Name"
              value={formik.values.businessName}
              onChange={formik.handleChange}
              error={
                formik.touched.businessName &&
                Boolean(formik.errors.businessName)
              }
              helperText={
                formik.touched.businessName && formik.errors.businessName
              }
              key="businessNameInput"
            />
          </Grid>
          <Grid item lg={6} sm={6} xs={12} md={6}>
            <TextField
              style={{ width: "100%" }}
              className={classes.customInput}
              name="email"
              variant="outlined"
              label="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              key={"businessEmailInput"}
            />
          </Grid>
        </Grid>
        <br />
        {/* Google maps location component */}
        <Grid container spacing={2} justifyContent="center">
          <Grid item lg={6} sm={6} xs={12} md={6}>
            <FormControl required style={{ width: "100%" }}>
              <MuiPhoneNumber
                className={classes.customInput}
                name="phone"
                label="Phone Number"
                defaultCountry={"ca"}
                variant="outlined"
                required
                // onOpen={formik.handleBlur} doesn't work :/
                value={formik.values.phoneNumber}
                onChange={(number, phoneNumberObject) => {
                  // handlePhone

                  if (number?.length > 3) {
                    formik.setFieldValue("phoneNumber", number);
                  } else {
                    formik.setFieldValue("phoneNumber", "");
                  }
                }}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                key={"businessPhonenum"}
              />
              <div style={{ color: "red" }}>
                {formik.touched.phoneNumber && formik.errors.phoneNumber}
              </div>
            </FormControl>
          </Grid>
          <Grid item lg={6} sm={6} xs={12} md={6}>
            <FormControl
              style={{ width: "100%" }}
              className={classes.customInput}
              variant="outlined"
              required
            >
              {/* to add formik https://github.com/stackworx/formik-material-ui/issues/126 */}
              <PlacesAutoComplete
                values={values}
                handleAddress={handleAddress}
                handleLocation={handleLocation}
                styleProps={{
                  width: "100%",
                  minWidth: "210px",
                }}
                formik={formik}
                fieldName={"address"}
                prevInput={`Address: ${values.address}`}
                key={"businessAddress"}
              />
            </FormControl>
          </Grid>
        </Grid>
        <br />

        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={12} sm={4}>
            <div className="focus:outline-none">
              <Button
                color="primary"
                className={`${classes.button} focus:outline-none`}
                style={{ padding: "8px 16px" }}
                variant="contained"
                fullWidth
                type="submit"
              >
                Continue
              </Button>
            </div>
          </Grid>
        </Grid>
        {/*<Button*/}
        {/*  color="secondary"*/}
        {/*  className={classes.button}*/}
        {/*  onClick={() => {*/}
        {/*    console.log(formik.errors);*/}
        {/*    console.log(formik.values.phoneNumber);*/}
        {/*    console.log(formik.touched);*/}
        {/*  }}*/}
        {/*  variant="contained"*/}
        {/*>*/}
        {/*  Debug{" "}*/}
        {/*</Button>*/}
      </form>
    </div>
  );
}

BasicInformation.propTypes = {
  nextStep: PropTypes.func.isRequired,
  handleUpdateState: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleAddress: PropTypes.func.isRequired,
  handleLocation: PropTypes.func.isRequired,
  handlePhone: PropTypes.func.isRequired,
  handleImageChange: PropTypes.func.isRequired,
  values: PropTypes.object.isRequired,
};

export default BasicInformation;
