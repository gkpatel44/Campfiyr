import React from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import PropTypes from "prop-types";

// MUI things
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";

import moment from "moment";
import { Button, Grid } from "@material-ui/core";
import { convertTo12Hour } from "../../../util/util";
import { convertTo24Hour } from "../../../util/util";
import { ReactComponent as CircleIcon } from "../assets/circle.svg";
import { firebaseAnalytics } from "../../../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1.5rem",
    background: "#383D43",
    color: "#ffffff",
  },
  formControl: {
    // margin: theme.spacing(1),
    // minWidth: 200,
    display: "flex",
    "& .MuiFormControlLabel-labelPlacementStart": {
      margin: 0,
      width: "100%",
      color: "#E65E52",
      "& .MuiTypography-body1": {
        fontSize: "0.5rem",
      },
    },
    "& .MuiSwitch-track": {
      background: "#383D43",
      width: "90%",
      height: "100%",
      opacity: 1,
    },
    "& .MuiSwitch-switchBase": {
      // color: "#C8C6C6",
      top: "-1px",
      "& .MuiSwitch-thumb": {
        width: "15px",
        height: "15px",
      },
    },
    "& .MuiSwitch-root": {
      height: "32px",
    },
    "& .MuiFormLabel-root": {
      color: "#C8C6C6",
      fontSize: "0.7rem",
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#C8C6C6",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#C8C6C6",
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
    background: "#6661F2",
    color: "#FFFFFF",
    borderRadius: "8px",
  },
  textField: {
    // marginLeft: theme.spacing(1),
    // marginRight: theme.spacing(5),
    // marginBottom: theme.spacing(1),
  },
  busInfo: {
    marginTop: "0.1rem",
    marginBottom: "0.5rem",
    textAlign: "center",
    fontSize: "0.8rem",
  },
  gridItemCard: {
    background: "#292C31",
    borderRadius: "10px",
    padding: "10px",
  },
  gridItem: {
    width: "100%",
    // "& .MuiGrid-spacing-xs-1": {
    //   alignItems: "center"
    // },
  },
  dayName: {
    fontSize: "0.75rem",
    paddingBottom: "4px",
  },
  textFieldTime: {
    width: "100%",
    "& .MuiOutlinedInput-input": {
      padding: "5px 10px",
      fontSize: "12px",
      color: "#ABABAB",
    },
    "& .MuiInputLabel-outlined.MuiInputLabel-shrink": {
      transform: "translate(14px, -4px) scale(0.75)",
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      margin: 0,
    },
    "& .PrivateNotchedOutline-root-34": {
      borderWidth: 0,
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      // borderColor: "#ABABAB",
      borderWidth: 0,
    },
    background: "#383D43",
    borderRadius: "10px",
  },
}));

const momentValidation = (endTime, startTime) => {
  return startTime !== "closed" // if it is not closed, validate
    ? moment(endTime, "HH:mm").isSameOrAfter(moment(startTime, "HH:mm"))
    : true;
};
const checkExisting = (values, where) => {
  if (values && values.operatingHours) {
    return values.operatingHours["Operating Hours"][`${where}`];
  } else {
    return undefined;
  }
};
const checkExistingBool = (values, where) => {
  if (values && values.operatingHours) {
    return values.operatingHours["Operating Hours"][`${where}`] === "closed";
  } else {
    return undefined;
  }
};

const validationSchema = yup.object({
  MondayClosed: yup.bool(),
  TuesdayClosed: yup.bool(),
  WednesdayClosed: yup.bool(),
  ThursdayClosed: yup.bool(),
  FridayClosed: yup.bool(),
  SaturdayClosed: yup.bool(),
  SundayClosed: yup.bool(),
  MondayStart: yup.string().required("Opening time cannot be empty"),
  MondayEnd: yup
    .string()
    .required("Closing time cannot be empty")
    .test(
      "is-greater",
      "Closing time cannot be before start",
      function (value) {
        const { MondayStart } = this.parent;
        return momentValidation(value, MondayStart);
      }
    ),
  TuesdayStart: yup.string().required("Opening time cannot be empty"),
  TuesdayEnd: yup
    .string()
    .required("Closing time cannot be empty")
    .test(
      "is-greater",
      "Closing time cannot be before start",
      function (value) {
        const { TuesdayStart } = this.parent;
        return momentValidation(value, TuesdayStart);
      }
    ),
  WednesdayStart: yup.string().required("Opening time cannot be empty"),
  WednesdayEnd: yup
    .string()
    .required("Closing time cannot be empty")
    .test(
      "is-greater",
      "Closing time cannot be before start",
      function (value) {
        const { WednesdayStart } = this.parent;
        return momentValidation(value, WednesdayStart);
      }
    ),
  ThursdayStart: yup.string().required("Opening time cannot be empty"),
  ThursdayEnd: yup
    .string()
    .required("Closing time cannot be empty")
    .test(
      "is-greater",
      "Closing time cannot be before start",
      function (value) {
        const { ThursdayStart } = this.parent;
        return momentValidation(value, ThursdayStart);
      }
    ),
  FridayStart: yup.string().required("Opening time cannot be empty"),
  FridayEnd: yup
    .string()
    .required("Closing time cannot be empty")
    .test(
      "is-greater",
      "Closing time cannot be before start",
      function (value) {
        const { FridayStart } = this.parent;
        return momentValidation(value, FridayStart);
      }
    ),
  SaturdayStart: yup.string().required("Opening time cannot be empty"),
  SaturdayEnd: yup
    .string()
    .required("Closing time cannot be empty")
    .test(
      "is-greater",
      "Closing time cannot be before start",
      function (value) {
        const { SaturdayStart } = this.parent;
        return momentValidation(value, SaturdayStart);
      }
    ),
  SundayStart: yup.string().required("Opening time cannot be empty"),
  SundayEnd: yup
    .string()
    .required("Closing time cannot be empty")
    .test(
      "is-greater",
      "Closing time cannot be before start",
      function (value) {
        const { SundayStart } = this.parent;
        return momentValidation(value, SundayStart);
      }
    ),
});
function BusinessHours(props) {
  const classes = useStyles();
  const { values, backtrackTo } = props;
  const { handleTime } = props;

  const proceed = (e) => {
    props.nextStep();
  };
  const goBack = (e) => {
    props.prevStep();
  };
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const formik = useFormik({
    initialValues: {
      //pain -.-
      MondayClosed: checkExistingBool(values, "Monday Start") || false,
      TuesdayClosed: checkExistingBool(values, "Tuesday Start") || false,
      WednesdayClosed: checkExistingBool(values, "Wednesday Start") || false,
      ThursdayClosed: checkExistingBool(values, "Thursday Start") || false,
      FridayClosed: checkExistingBool(values, "Friday Start") || false,
      SaturdayClosed: checkExistingBool(values, "Saturday Start") || false,
      SundayClosed: checkExistingBool(values, "Sunday Start") || false,
      MondayStart: checkExisting(values, "Monday Start") || "",
      MondayEnd: checkExisting(values, "Monday End") || "",
      TuesdayStart: checkExisting(values, "Tuesday Start") || "",
      TuesdayEnd: checkExisting(values, "Tuesday End") || "",
      WednesdayStart: checkExisting(values, "Wednesday Start") || "",
      WednesdayEnd: checkExisting(values, "Wednesday End") || "",
      ThursdayStart: checkExisting(values, "Thursday Start") || "",
      ThursdayEnd: checkExisting(values, "Thursday End") || "",
      FridayStart: checkExisting(values, "Friday Start") || "",
      FridayEnd: checkExisting(values, "Friday End") || "",
      SaturdayStart: checkExisting(values, "Saturday Start") || "",
      SaturdayEnd: checkExisting(values, "Saturday End") || "",
      SundayStart: checkExisting(values, "Sunday Start") || "",
      SundayEnd: checkExisting(values, "Sunday End") || "",
    },
    validationSchema: validationSchema,
    onSubmit: (formValues) => {
      // We don't want to send back the form values this way because we have other
      // functions handling it already (They handle reshaping data to fit firebase schema)
      // handleUpdateState(formValues);

      // alert(JSON.stringify(formValues, null, 2));
      firebaseAnalytics.logEvent("business_signup", {
        step: 3,
        name: "business_hours",
        skipped: false,
      });
      proceed();
    },
  });

  return (
    <div className={classes.root}>
      <div>
        {/*<Typography variant="h4" className={classes.title}>*/}
        {/*  Select Business Hours*/}
        {/*</Typography>*/}
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
          <div className="absolute right-0">
            <Button
              style={{ color: "#fff" }}
              size="small"
              onClick={() => {
                handleTime("ItDoesntMatterThisCanBeAnythingTbh", "skipped");
                proceed();
                firebaseAnalytics.logEvent("business_signup", {
                  step: 3,
                  name: "business_hours",
                  skipped: true,
                });
              }}
            >
              Skip this step
            </Button>
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
            style={{ color: "#FFC107" }}
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
        <Typography className={classes.busInfo}>
          Select Business Hours
        </Typography>
        <form className={classes.container} onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} justifyContent="flex-start">
            {daysOfWeek.map((day, index) => (
              <Grid item key={index} xs={12} sm={6}>
                <FormControl className={classes.formControl}>
                  {/*<FormControl className={classes.formControl}>*/}
                  {/*<Typography>{day}</Typography>*/}
                  {/*<Grid container direction="row" justifyContent="space-between">*/}
                  <Grid
                    className={classes.gridItemCard}
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Grid className={classes.gridItem} item xs={12}>
                      <Grid
                        container
                        spacing={1}
                        justifyContent="space-between"
                      >
                        <Grid
                          item
                          xs={6}
                          className="flex justify-start items-center"
                        >
                          <Typography className={classes.dayName}>
                            {day}
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <FormControlLabel
                            value="end"
                            control={
                              <Switch
                                onChange={(event) => {
                                  if (event.target.checked === true) {
                                    formik.setFieldValue(
                                      `${day}Start`,
                                      "closed"
                                    );
                                    formik.setFieldValue(`${day}End`, "closed");
                                    formik.setFieldValue(
                                      `${day}Closed`,
                                      event.target.checked
                                    );

                                    handleTime(day + " Start", "closed");
                                    handleTime(day + " End", "closed");
                                  } else {
                                    formik.setFieldValue(`${day}Start`, "");
                                    formik.setFieldValue(`${day}End`, "");
                                    formik.setFieldValue(
                                      `${day}Closed`,
                                      event.target.checked
                                    );

                                    handleTime(day + " Start", "");
                                    handleTime(day + " End", "");
                                  }
                                }}
                                checked={formik.values[`${day}Closed`]}
                                color="primary"
                              />
                            }
                            label="Closed"
                            labelPlacement="start"
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                      <Grid
                        container
                        spacing={1}
                        justifyContent="space-between"
                      >
                        <Grid item xs={6}>
                          <TextField
                            id={`${day + "_start"}`}
                            label="Opening"
                            type="time"
                            variant="outlined"
                            // defaultValue="00:00"
                            // eslint-disable-next-line no-eval
                            // value={eval(day + "Start")}
                            value={
                              formik.values[`${day}Closed`] === true
                                ? ""
                                : convertTo24Hour(formik.values[`${day}Start`])
                            }
                            className={classes.textFieldTime}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{
                              step: 300, // 5 min
                            }}
                            onChange={(event) => {
                              formik.setFieldValue(
                                `${day}Start`,
                                event.target.value
                              );
                              console.log(event.target.value);
                              handleTime(
                                day + " Start",
                                convertTo12Hour(event.target.value)
                              ); //do not remove the space
                              // this.setState({
                              //   [day + "Start"]: event.target.value,
                              // });
                            }}
                            // eslint-disable-next-line no-eval
                            // disabled={eval(day + "Closed")}
                            disabled={formik.values[`${day}Closed`]}
                            error={
                              formik.touched[`${day}Start`] &&
                              Boolean(formik.errors[`${day}Start`])
                            }
                            helperText={
                              formik.touched[`${day}Start`] &&
                              formik.errors[`${day}Start`]
                            }
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            id={`${day + "_end"}`}
                            variant="outlined"
                            label="Closing"
                            type="time"
                            // eslint-disable-next-line no-eval
                            // value={eval(day + "End")}
                            value={
                              formik.values[`${day}Closed`] === true
                                ? ""
                                : convertTo24Hour(formik.values[`${day}End`])
                            }
                            // defaultValue="00:00"
                            className={classes.textFieldTime}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            inputProps={{ step: 300 }} // 5 min
                            // onOpen={formik.handleBlur}
                            onChange={(event) => {
                              formik.setFieldValue(
                                `${day}End`,
                                event.target.value
                              );
                              handleTime(
                                `${day} End`,
                                convertTo12Hour(event.target.value)
                              ); //do not remove the space
                            }}
                            // eslint-disable-next-line no-eval
                            // disabled={eval(day + "Closed")}
                            disabled={formik.values[`${day}Closed`]}
                            error={
                              formik.touched[`${day}End`] &&
                              Boolean(formik.errors[`${day}End`])
                            }
                            helperText={
                              formik.touched[`${day}End`] &&
                              formik.errors[`${day}End`]
                            }
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    {/*<Grid item xs={4}>*/}
                    {/*</Grid>*/}
                    {/* Checkbox for day */}
                    {/*<Grid item xs={4}>*/}
                    {/*<FormControlLabel*/}
                    {/*  value="end"*/}
                    {/*  control={*/}
                    {/*    <Checkbox*/}
                    {/*      onChange={(event) => {*/}
                    {/*        if (event.target.checked === true) {*/}
                    {/*          formik.setFieldValue(`${day}Start`, "closed");*/}
                    {/*          formik.setFieldValue(`${day}End`, "closed");*/}
                    {/*          formik.setFieldValue(*/}
                    {/*            `${day}Closed`,*/}
                    {/*            event.target.checked*/}
                    {/*          );*/}

                    {/*          handleTime(day + " Start", "closed");*/}
                    {/*          handleTime(day + " End", "closed");*/}
                    {/*        } else {*/}
                    {/*          formik.setFieldValue(`${day}Start`, "");*/}
                    {/*          formik.setFieldValue(`${day}End`, "");*/}
                    {/*          formik.setFieldValue(*/}
                    {/*            `${day}Closed`,*/}
                    {/*            event.target.checked*/}
                    {/*          );*/}

                    {/*          handleTime(day + " Start", "");*/}
                    {/*          handleTime(day + " End", "");*/}
                    {/*        }*/}
                    {/*      }}*/}
                    {/*      checked={formik.values[`${day}Closed`]}*/}
                    {/*      color="primary"*/}
                    {/*    />*/}
                    {/*  }*/}
                    {/*  label="Closed"*/}
                    {/*  labelPlacement="end"*/}
                    {/*/>*/}
                    {/*</Grid>*/}
                  </Grid>
                </FormControl>
              </Grid>
            ))}
            <Grid item xs={6}>
              <Grid container justifyContent="flex-end">
                <Grid item xs={12} sm={8}>
                  <Button
                    color="primary"
                    className={`${classes.button} focus:outline-none w-full`}
                    style={{ padding: "8px 16px" }}
                    variant="contained"
                    type="submit"
                  >
                    Continue
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/*<Button*/}
          {/*  onClick={goBack}*/}
          {/*  variant="contained"*/}
          {/*  className={classes.button}*/}
          {/*>*/}
          {/*  Back*/}
          {/*</Button>*/}

          {/* <Button*/}
          {/*  color="secondary"*/}
          {/*  className={classes.button}*/}
          {/*  onClick={() => {*/}
          {/*    console.log(formik.errors);*/}
          {/*    console.log(formik.values);*/}
          {/*  }}*/}
          {/*  variant="contained"*/}
          {/*>*/}
          {/*  Debug{" "}*/}
          {/*</Button> */}
        </form>
      </div>
    </div>
  );
}

BusinessHours.propTypes = {
  nextStep: PropTypes.func.isRequired,
  handleTime: PropTypes.func.isRequired,

  values: PropTypes.object.isRequired,
};

export default BusinessHours;
