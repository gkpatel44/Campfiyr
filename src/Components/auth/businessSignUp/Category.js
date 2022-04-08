import React, { useEffect, useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import { ReactComponent as CircleIcon } from "../assets/circle.svg";

// MUI things
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import {
  firebaseAnalytics,
  getBusinessCategories,
} from "../../../firebase/firebase";
import Autocomplete from "@material-ui/lab/Autocomplete";
//Helpers
import { sortObj } from "../../../util/util";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "1.5rem",
    background: "#383D43",
    color: "#ffffff",
  },
  formControl: {
    minWidth: 120,
    marginTop: "5px",
  },
  button: {
    width: "100%",
    background: "#6661F2",
    color: "#FFFFFF",
    borderRadius: "8px",
  },
  title: {
    fontSize: "0.6rem",
    // marginTop: "0.188rem",
  },
  headTitle: {
    fontSize: "2rem",
  },
  info: {
    fontWeight: 300,
    color: "#FFFFFF",
    "& .MuiTypography-body1": {
      fontSize: "0.875rem",
    },
    fontSize: "14px",
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

function SubCategories(props) {
  const { names, options, labels, placeholders } = props;
  const { sub1Name, sub2Name, sub3Name } = names;
  const { sub1Options, sub2Options, sub3Options } = options;
  const { sub1Label, sub2Label, sub3Label } = labels;
  const { sub1Placeholder, sub2Placeholder, sub3Placeholder } = placeholders;
  const { formik, handleCategory } = props;
  const SUB_CAT_1 = 2;
  const SUB_CAT_2 = 3;
  const SUB_CAT_3 = 4;
  const classes = useStyles();
  return (
    <div className="mt-4 mb-3">
      <Grid container spacing={2} jystify="center">
        <Grid item xs={12} sm={4}>
          <Autocomplete
            freeSolo
            options={sub1Options}
            // getOptionLabel={(option) => option.id}
            onChange={(event, value) => {
              formik.setFieldValue(sub1Name, value);
              handleCategory(SUB_CAT_1, value);
            }}
            onInputChange={(event, value) => {
              formik.setFieldValue(sub1Name, value);
              handleCategory(SUB_CAT_1, value);
            }}
            onOpen={formik.handleBlur}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.customInput}
                variant="outlined"
                label={sub1Label}
                placeholder={sub1Placeholder}
                error={
                  formik.touched[`${sub1Name}`] &&
                  Boolean(formik.errors[`${sub1Name}`])
                }
                helperText={
                  formik.touched[`${sub1Name}`] && formik.errors[`${sub1Name}`]
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            freeSolo
            options={sub2Options}
            // getOptionLabel={(option) => option.id}
            onChange={(event, value) => {
              formik.setFieldValue(sub2Name, value);
              // create an array with the category and selected sub category
              handleCategory(SUB_CAT_2, value);
            }}
            onOpen={formik.handleBlur}
            onInputChange={(event, value) => {
              formik.setFieldValue(sub2Name, value);
              handleCategory(SUB_CAT_2, value);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.customInput}
                variant="outlined"
                label={sub2Label}
                placeholder={sub2Placeholder}
                error={
                  formik.touched[`${sub2Name}`] &&
                  Boolean(formik.errors[`${sub2Name}`])
                }
                helperText={
                  formik.touched[`${sub2Name}`] && formik.errors[`${sub2Name}`]
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Autocomplete
            freeSolo
            options={sub3Options}
            // getOptionLabel={(option) => option.id}
            onChange={(event, value) => {
              formik.setFieldValue(sub3Name, value);
              handleCategory(SUB_CAT_3, value);
            }}
            onInputChange={(event, value) => {
              formik.setFieldValue(sub3Name, value);
              handleCategory(SUB_CAT_3, value);
            }}
            onOpen={formik.handleBlur}
            renderInput={(params) => (
              <TextField
                {...params}
                className={classes.customInput}
                variant="outlined"
                label={sub3Label}
                placeholder={sub3Placeholder}
                error={
                  formik.touched[`${sub3Name}`] &&
                  Boolean(formik.errors[`${sub3Name}`])
                }
                helperText={
                  formik.touched[`${sub3Name}`] && formik.errors[`${sub3Name}`]
                }
              />
            )}
          />
        </Grid>
      </Grid>
    </div>
  );
}

SubCategories.propTypes = {
  names: PropTypes.object.isRequired,
  options: PropTypes.object.isRequired,
  labels: PropTypes.object.isRequired,
  placeholders: PropTypes.object.isRequired,
  formik: PropTypes.object.isRequired,
  handleCategory: PropTypes.func.isRequired,
  other: PropTypes.bool,
};

const validationSchema = yup.object({
  main_category: yup.string().required("Main Category is required"),
  sub_category1: yup.string().required("This field cannot be left empty"),
  sub_category2: yup.string().required("Please type or select an option"),
  sub_category3: yup.string().required("Please type or select an option"),
});
function Category(props) {
  const [categories, setCategories] = useState([]);
  const [userSuggestions, setUserSuggestions] = useState([]);
  const classes = useStyles();
  const { values, handleCategory, backtrackTo } = props;
  const MAIN_CAT = 1;

  // const { handleUpdateState } = props;
  // runs on mount
  useEffect(() => {
    (async () => {
      await getCats();
    })();
    firebaseAnalytics.logEvent("business_signup", {
      step: 2,
      name: "categories",
    });
  }, []);
  // dynamically pulls categories from Firestore storage
  const getCats = async () => {
    const chips = [];
    try {
      const cats = (await getBusinessCategories()) || [];
      setCategories(cats);
      // TODO: Dispatch "set categories"  in here
      cats.forEach((element, i) => {
        chips.push({ key: i, label: element.id });
      });
      // this.setState({ chipData: chips });
    } catch (error) {
      console.error(error.message);
    }
    return await getBusinessCategories();
  };

  const proceed = (e) => {
    props.nextStep();
  };
  const goBack = (e) => {
    props.prevStep();
  };
  const formik = useFormik({
    initialValues: {
      main_category: values.main_category[0] || "",
      sub_category1: values.sub_category1[0] || "",
      sub_category2: values.sub_category2[0] || "",
      sub_category3: values.sub_category3[0] || "",
    },
    validationSchema: validationSchema,
    onSubmit: (formValues) => {
      // We don't want to send back the form values this way because we have other
      // functions handling it already (They handle reshaping data to fit firebase schema)
      // handleUpdateState(formValues);

      // alert(JSON.stringify(formValues, null, 2));
      proceed();
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
          </Typography>
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
          style={{ color: "#FFC107" }}
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
      <div>
        <Typography
          className={`w-full flex justify-center items-center font-bold mb-10`}
        >
          Categories
        </Typography>
        <Typography className={classes.info}>
          Here are some of our most popular categories!
        </Typography>
        {/*<Typography variant="body2">Select the one fits you best!</Typography>*/}
      </div>
      {/* Get and display firebase categories */}
      <form onSubmit={formik.handleSubmit} className={classes.formControl}>
        {/* credits to  https://stackoverflow.com/a/62193475/6100818 for formik autocomplete solution */}
        <Autocomplete
          id="select-main-cat"
          options={categories}
          getOptionLabel={(category) => category.id}
          onChange={(event, value) => {
            console.log(Object.keys(sortObj(value.data)));
            console.log(value);
            if (value) {
              formik.setFieldValue("main_category", value.id);
              setUserSuggestions(Object.keys(sortObj(value.data)));

              let index = categories.findIndex((elem) => {
                return elem.id === value.id;
              });
              handleCategory(0, index); // store display state ( dynamically decide what to show next)
              handleCategory(MAIN_CAT, value.id); // 1 is for main category, 2  sub_category1, 3 sub_category2, 4 sub_category3
            }
          }}
          onOpen={formik.handleBlur}
          // defaultValue={["hello"]}
          renderInput={(params) => (
            <TextField
              {...params}
              className={classes.customInput}
              variant="outlined"
              label={`My business falls under ${values.main_category}`}
              placeholder="Categories"
              error={
                formik.touched["main_category"] &&
                Boolean(formik.errors["main_category"])
              }
              helperText={
                formik.touched["main_category"] &&
                formik.errors["main_category"]
              }
            />
          )}
        />
        {/*      ======================================= */}
        {/*      ======================================= */}
        {/*      ======================================= */}
        {/*      ======================================= */}
        {(() => {
          switch (values.categoryState) {
            case -1:
              return <div className="mt-3">Select a category to begin</div>;

            default:
              return (
                <div>
                  <SubCategories
                    names={{
                      sub1Name: "sub_category1",
                      sub2Name: "sub_category2",
                      sub3Name: "sub_category3",
                    }}
                    options={{
                      sub1Options: userSuggestions,
                      sub2Options: userSuggestions,
                      sub3Options: userSuggestions,
                    }}
                    labels={{
                      sub1Label: `Sub Category 1: ${values.sub_category1}`,
                      sub2Label: `Sub Category 2: ${values.sub_category2}`,
                      sub3Label: `Sub Category 3: ${values.sub_category3}`,
                    }}
                    placeholders={{
                      sub1Placeholder: "Select or type a category",
                      sub2Placeholder: "Select or type a category",
                      sub3Placeholder: "Select or type a category",
                    }}
                    formik={formik}
                    handleCategory={handleCategory}
                  />
                </div>
              );
          }
        })()}
        {/*<Button onClick={goBack} variant="contained" className={classes.button}>*/}
        {/*  Back*/}
        {/*</Button>*/}
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={12} sm={4} lg={4} md={4}>
            <Button
              className={`${classes.button} focus:outline-none`}
              style={{ padding: "8px 16px" }}
              variant="contained"
              type="submit"
              color="primary"
            >
              Continue
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

Category.propTypes = {
  nextStep: PropTypes.func.isRequired,
  handleUpdateState: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,

  values: PropTypes.object.isRequired,
};

export default Category;
