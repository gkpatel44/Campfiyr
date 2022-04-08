/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import PropTypes from "prop-types";
import { Autocomplete } from "@material-ui/lab";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  encase: {
    // marginTop: 100,
    display: "flex",
    padding: 10,
    flexDirection: "column",
    alignItems: "center",
    width: theme.spacing(50),
  },
  inputField: {
    marginTop: 16,
    marginBottom: 8,
  },
}));

const validationSchema = yup.object({
  //  TODO: VALIDATION
  rank_prefer: yup.string().required("This field cannot be empty"),
  rank_weekend: yup.string().required("This field cannot be empty"),
  rank_quick_bite: yup.string().required("This field cannot be empty"),
  rank_eat_out: yup.string().required("This field cannot be empty"),
});
function UserInterests(props) {
  const classes = useStyles();
  const { values, handleRank } = props;
  // eslint-disable-next-line no-unused-vars
  const [userPick, setUserPick] = useState("");

  const proceed = (e) => {
    props.nextStep();
    console.log(userPick);
  };
  const goBack = (e) => {
    props.prevStep();
  };
  const getTitles = (data) => {
    return data.map((e) => e.title).join(", ");
  };
  const placeHolderStaticPreferences = [
    { title: "Board game cafe" },
    { title: "Manicures" },
  ];
  const placeHolderStaticWeekend = [
    { title: "Vintage Furniture sale" },
    { title: "Yoga in the park" },
  ];
  const placeHolderStaticQuickBite = [
    { title: "Take out" },
    { title: "Fast casual" },
  ];
  const placeHolderStaticEatOut = [{ title: "Pub" }, { title: "Fine Dinig" }];
  const formik = useFormik({
    initialValues: {
      //pain -.-
      rank_prefer: values.rank_prefer || "",
      rank_weekend: values.rank_weekend || "",
      rank_quick_bite: values.rank_quick_bite || "",
      rank_eat_out: values.rank_eat_out || "",
    },
    validationSchema: validationSchema,
    onSubmit: (formValues) => {
      // We don't want to send back the form values this way because we have other
      // functions handling it already (They handle reshaping data to fit firebase schema)
      // handleUpdateState(formValues);

      alert(JSON.stringify(formValues, null, 2));
      proceed();
    },
  });

  return (
    <div className={classes.encase}>
      <Typography component="h1" variant="h5">
        Tell us about your interests!
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Autocomplete
          id="select-main-interest"
          name="rank_prefer"
          className={classes.inputField}
          multiple
          filterSelectedOptions
          limitTags={2}
          options={placeHolderStaticPreferences}
          fullWidth
          onChange={(event, value) => {
            if (value) {
              console.log(value);
              formik.setFieldValue("rank_prefer", getTitles(value));
              handleRank("rank_prefer", getTitles(value));
              setUserPick(getTitles(value));
            }
          }}
          onInputChange={(event, value) => {
            formik.setFieldValue("rank_prefer", getTitles(value));
            handleRank("rank_prefer", getTitles(value));
            setUserPick(getTitles(value));
          }}
          onOpen={formik.handleBlur}
          getOptionLabel={(option) => option.title}
          getOptionSelected={(option, value) => option.title === value.title}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label={`I love ${values.rank_prefer}`}
              placeholder="Categories"
              error={
                formik.touched["rank_prefer"] &&
                Boolean(formik.errors["rank_prefer"])
              }
              helperText={
                formik.touched["rank_prefer"] && formik.errors["rank_prefer"]
              }
            />
          )}
        />
        <Autocomplete
          className={classes.inputField}
          id="tags-weekend-interests"
          name="rank_weekend"
          options={placeHolderStaticWeekend}
          multiple
          filterSelectedOptions
          limitTags={2}
          fullWidth
          onChange={(event, value) => {
            if (value) {
              formik.setFieldValue("rank_weekend", getTitles(value));
              handleRank("rank_weekend", getTitles(value));
              setUserPick(getTitles(value));
            }
          }}
          getOptionLabel={(option) => option.title}
          getOptionSelected={(option, value) => option.title === value.title}
          onOpen={formik.handleBlur}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label={`On Weekends ${values.rank_weekend}`}
              placeholder="Categories"
              error={
                formik.touched["rank_weekend"] &&
                Boolean(formik.errors["rank_weekend"])
              }
              helperText={
                formik.touched["rank_weekend"] && formik.errors["rank_weekend"]
              }
            />
          )}
        />
        <Autocomplete
          className={classes.inputField}
          id="tags-quick-bite"
          //   options={rank}
          options={placeHolderStaticQuickBite}
          name="rank_quick_bite"
          multiple
          filterSelectedOptions
          limitTags={2}
          fullWidth
          onChange={(event, value) => {
            if (value) {
              formik.setFieldValue("rank_quick_bite", getTitles(value));
              handleRank("rank_quick_bite", getTitles(value));
              setUserPick(getTitles(value));
            }
          }}
          getOptionLabel={(option) => option.title}
          getOptionSelected={(option, value) => option.title === value.title}
          onOpen={formik.handleBlur}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label={`For a quick bite ${values.rank_quick_bite}`}
              placeholder="Categories"
              error={
                formik.touched["rank_quick_bite"] &&
                Boolean(formik.errors["rank_quick_bite"])
              }
              helperText={
                formik.touched["rank_quick_bite"] &&
                formik.errors["rank_quick_bite"]
              }
            />
          )}
        />
        <Autocomplete
          className={classes.inputField}
          id="tags-eat-out"
          //   options={rank}
          name="rank_eat_out"
          options={placeHolderStaticEatOut}
          multiple
          filterSelectedOptions
          limitTags={2}
          fullWidth
          onChange={(event, value) => {
            if (value) {
              formik.setFieldValue("rank_eat_out", getTitles(value));
              handleRank("rank_eat_out", getTitles(value));
              setUserPick(getTitles(value));
            }
          }}
          onOpen={formik.handleBlur}
          getOptionLabel={(option) => option.title}
          getOptionSelected={(option, value) => option.title === value.title}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label={`Eating out  ${values.rank_eat_out}`}
              placeholder="Categories"
              error={
                formik.touched["rank_eat_out"] &&
                Boolean(formik.errors["rank_eat_out"])
              }
              helperText={
                formik.touched["rank_eat_out"] && formik.errors["rank_eat_out"]
              }
            />
          )}
        />
        <Grid container>
          <Grid item xs>
            <Button
              onClick={goBack}
              variant="contained"
              className={classes.button}
            >
              Back
            </Button>
          </Grid>

          <Grid item xs={7}>
            <Button
              color="secondary"
              className={classes.button}
              variant="contained"
              type="submit"
            >
              Continue
            </Button>
          </Grid>
        </Grid>
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
    </div>
  );
}

UserInterests.propTypes = {
  values: PropTypes.object.isRequired,
};

export default UserInterests;
