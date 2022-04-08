import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
// import {
//   loginWithFacebook,
//   loginWithGoogle,
//   assignUserType,
//   generateUserData,
// } from "../../redux/actions";
import { makeStyles } from "@material-ui/core/styles";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { Info, Person } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
import moment from "moment";
import { ReactComponent as CircleIcon } from "../assets/circle.svg";
import imageCompression from "browser-image-compression";
// import { parse, isDate } from "date-fns";

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: "#fff",
    },
  },
  encase: {
    // marginTop: 100,
    display: "flex",
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  // avatar: {
  //   marginLeft: "auto",
  //   marginRight: "auto",
  //   backgroundColor: "#f50057",
  // },
  form: {
    marginTop: 1,
  },
  errorText: {
    color: "#f50057",
    marginBottom: 5,
    textAlign: "center",
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
  button: {
    margin: 15,
  },
  headTitle: {
    fontSize: "1.75rem",
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
  imagePreview: {
    width: "4rem",
    height: "4rem",
    // border: "5px solid #fff",
    borderRadius: "50%",
    boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.12)",
    backgroundColor: "#292C31",
  },
  avatar: {
    // marginRight: "2rem",
    width: "100%",
    height: "100%",
  },
  busInfo: {
    marginTop: "0.1rem",
    marginBottom: "0.5rem",
    textAlign: "center",
    fontSize: "0.8rem",
  },
}));
// const today = new Date();
const validationSchema = yup.object({
  firstname: yup.string().required("Did you forget your first name?"),
  lastname: yup.string().required("Did you forget your last name?"),
  displayname: yup
    .string()
    .max(15, "Make it short and sweet!")
    .required("We need to know what to call you"),
  email: yup
    .string()
    .email("That email address doesn't look right")
    .required("Email is required, how else would we reach you?"),
  birthdate: yup
    .string()
    .test(
      "is-before-today",
      "Are you a time traveller? Your birthdate can't be in the future!",
      function (value) {
        console.log(value);
        return value && value !== "" ? moment(value).isBefore(moment()) : true;
      }
    ),
});

// const handleGoogleSignIn = () => {
//   const { dispatch } = this.props;
//   dispatch(loginWithGoogle());
//   dispatch(assignUserType("client"));
//   dispatch(generateUserData("client", {}));
// };

// const handleFacebookSignIn = () => {
//   const { dispatch } = this.props;
//   dispatch(loginWithFacebook());
//   dispatch(assignUserType("client"));
//   dispatch(generateUserData("client", {}));
// };

function BasicInformation(props) {
  const { isAuthenticated } = props;
  const { from } = props.location.state || { from: { pathname: "/" } };
  const { handleUpdateState, values, backtrackTo,handleImageChange } = props;  
  const [imagePreview,setImagePreview] = useState();
  const classes = useStyles();
  const formik = useFormik({
    initialValues: {
      firstname: values?.firstname,
      lastname: values?.lastname,
      displayname: values?.displayname,
      email: values?.email,
      birthdate: values?.birthdate,
      imageDownloadURL :values?.imageDownloadURL
    },
    validationSchema: validationSchema,
    onSubmit: (formValues) => {
      //   values = { ...values, ...formValues };
      handleUpdateState(formValues);
      proceed();
    },
  });

  const proceed = (e) => {
    // e.preventDefault();
    props.nextStep();
  };

  /********************************for image upload********************************/
  const handleUploadedImageChange = async (e) => {
    if (e.target.files[0]) {
      const image = e.target.files[0];

      console.log(image);
      console.log("originalFile instanceof Blob", image instanceof Blob); // true
      console.log(`originalFile size ${image.size / 1024 / 1024} MB`);

      const options = {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 400,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(image, options);

        console.log(
          "compressedFile instanceof Blob",
          compressedFile instanceof Blob
        ); // true

        console.log(
          `compressedFile size ${(compressedFile.size / 1024 / 1024) * 1000
          } KB`
        ); // smaller than maxSizeMB
        setImagePreview(URL.createObjectURL(e.target.files[0]));     
        handleImageChange(compressedFile);
      }
      catch (error) {
        console.log("Error during image compression: ", error);
      }
    }
  };
  /************************************************************************************/


  return isAuthenticated ? (
    <Redirect to={from} />
  ) : (
    <Container
      style={{
        maxWidth: "660px",
        background: "#383D43",
        borderRadius: "8px",
        color: "#FFFFFF",
        padding: "24px",
      }}
    >
      <div className="relative flex justify-center items-center w-full">
        {/*<div className="absolute left-0 flex cursor-pointer justify-center items-center">*/}
        {/*  <span className="flex justify-center items-center mr-2 text-xl">&#8592;</span>*/}
        {/*  <Typography className={classes.title}>*/}
        {/*    Business Sign up*/}
        {/*  </Typography>{" "}*/}
        {/*</div>*/}
        <div>
          <Typography className={classes.headTitle}>Campfiyr</Typography>
        </div>
      </div>
      <div className="w-full flex justify-center items-center mt-2">
        <div
          className="flex justify-center items-center cursor-pointer"
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
          className="flex justify-center items-center cursor-pointer"
          style={{ color: "#ABABAB" }}
          onClick={() => backtrackTo(2)}
        >
          <CircleIcon />
        </div>
      </div>
      <Typography className={classes.busInfo}>Basic Information</Typography>
      <div>
        {/*<Avatar className={classes.avatar}>*/}
        {/*  <LockOutlinedIcon />*/}
        {/*</Avatar>*/}
        {/*<Typography component="h1" variant="h5">*/}
        {/*  Sign Up*/}
        {/*</Typography>*/}
        <form onSubmit={formik.handleSubmit} className="w-full">
          <Grid
            container
            spacing={2}
            justifyContent="center"
            style={{ width: "100%" }}
          >

            <Grid item xs={12} sm={6}>
              <div className="flex justify-start items-center my-6 xs:my-3">
                <Avatar
                  src={imagePreview ? imagePreview : ""}
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
                  <span className="text-xs ml-5">Upload Avatar</span>
                  <input
                    className="absolute top-0 right-0 bottom-0 left-0 opacity-0"
                    id="imageChooser"
                    accept="image/*"
                    type="file"
                    onChange={handleUploadedImageChange}
                  // hidden
                  />
                </div>
              </div>
            </Grid>
            <Grid item sm={6} className="xs:hidden sm:block" />
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.customInput}
                variant="outlined"
                fullWidth
                // margin="normal"
                // value={values.firstname}
                id="firstname"
                label="First Name"
                name="firstname"
                // onChange={handleChange("firstname")}
                value={formik.values.firstname}
                onChange={formik.handleChange}
                error={
                  formik.touched.firstname && Boolean(formik.errors.firstname)
                }
                helperText={formik.touched.firstname && formik.errors.firstname}
              />
            </Grid>
            {/*<Grid item xs={1}>*/}
            {/* just my lazy way of creating responsive space */}
            {/*</Grid>*/}
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.customInput}
                variant="outlined"
                fullWidth
                value={formik.values.lastname}
                // margin="normal"
                id="lastname"
                label="Last Name"
                name="lastname"
                onChange={formik.handleChange}
                error={
                  formik.touched.lastname && Boolean(formik.errors.lastname)
                }
                helperText={formik.touched.lastname && formik.errors.lastname}
                lastname
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.customInput}
                variant="outlined"
                // margin="normal"
                fullWidth
                id="displayname"
                label="Display Name"
                name="displayname"
                value={formik.values.displayname}
                onChange={formik.handleChange}
                error={
                  formik.touched.displayname &&
                  Boolean(formik.errors.displayname)
                }
                helperText={
                  formik.touched.displayname && formik.errors.displayname
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.customInput}
                fullWidth
                id="email"
                name="email"
                label="Email Address"
                variant="outlined"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                className={classes.customInput}
                id="date"
                label="Date of Birth"
                type="date"
                // margin="normal"
                fullWidth
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={formik.values.birthdate}
                onChange={(event) => {
                  formik.setFieldValue(`birthdate`, event.target.value);
                }}
                error={
                  formik.touched.birthdate && Boolean(formik.errors.birthdate)
                }
                helperText={formik.touched.birthdate && formik.errors.birthdate}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              className="flex justify-center items-center xs:hidden sm:block"
            >
              <div className="w-full flex justify-end items-center">
                <Tooltip
                  title={
                    "We will never share your data. This is just to ensure you're seeing events relevant to you!"
                  }
                >
                  <Info
                    style={{ color: "#6661F2", width: "24px", height: "24px" }}
                  />
                </Tooltip>
              </div>
            </Grid>
            <Grid item sm={6} className="xs:hidden sm:block" />
            <Grid item xs={12} sm={6}>
              <Button
                color="primary"
                style={{ background: "#6661F2", borderRadius: "8px" }}
                // className={classes.button}
                className="focus:outline-none"
                variant="contained"
                fullWidth
                type="submit"
              >
                Continue
              </Button>
            </Grid>
            <Grid
              item
              xs={12}
              sm={8}
              className="flex justify-center items-center"
            >
              <Typography>
                Already have an account
                <Link
                  to="/login"
                  style={{ color: "#b4a2ff", marginLeft: "10px" }}
                >
                  Sign in here
                </Link>
              </Typography>
            </Grid>
          </Grid>
          {/* <Typography variant="body2">
            This will not be shown publicly. But we need it for ...
          </Typography> */}
          {/* <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          /> */}
          {/*<Button*/}
          {/*  color="secondary"*/}
          {/*  className={classes.button}*/}
          {/*  variant="contained"*/}
          {/*  fullWidth*/}
          {/*  type="submit"*/}
          {/*>*/}
          {/*  Continue*/}
          {/*</Button>*/}
          {/* <Button
            color="secondary"
            className={classes.button}
            onClick={() => {
              console.log(formik.errors);
              console.log(formik.values);
              console.log(formik.touched);
            }}
            variant="contained"
          >
            Debug{" "}
          </Button> */}
        </form>
        {/* <Button
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
            </Button> */}
      </div>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    signUpError: state.auth.signUpError,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps)(BasicInformation);
