/* eslint-disable no-unused-vars */
const businessSignUpBasicInformation = {
  // import React, { Component, createRef } from "react";
  // import PropTypes from "prop-types";
  // import withStyles from "@material-ui/core/styles/withStyles";
  // // MUI things
  // import InputLabel from "@material-ui/core/InputLabel";
  // import MenuItem from "@material-ui/core/MenuItem";
  // import {
  //   Avatar,
  //   Badge,
  //   FormControl,
  //   Grid,
  //   IconButton,
  //   TextField,
  // } from "@material-ui/core";
  // import Paper from "@material-ui/core/Paper";
  // import Select from "@material-ui/core/Select";
  // import Typography from "@material-ui/core/Typography";
  // import Button from "@material-ui/core/Button";
  // import PlacesAutoComplete from "../../reusable/PlacesAutoComplete";
  // import MuiPhoneNumber from "material-ui-phone-number";
  // import { Create, Person } from "@material-ui/icons";
  // const styles = (theme) => ({
  //   root: {
  //     margin: "3rem",
  //   },
  //   select: {
  //     marginTop: theme.spacing(1),
  //     marginBottom: theme.spacing(1),
  //     minWidth: 120,
  //   },
  //   title: {
  //     fontWeight: "700",
  //   },
  //   button: {
  //     margin: 15,
  //   },
  //   imagePreview: {
  //     width: "8rem",
  //     height: "8rem",
  //     border: "5px solid #fff",
  //     borderRadius: "50%",
  //     boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.12)",
  //   },
  //   pencil: {
  //     borderRadius: "50%",
  //   },
  //   rightSpace: {
  //     marginRight: "1rem",
  //   },
  //   avatar: {
  //     marginRight: "2rem",
  //   },
  //   phoneNumber: {
  //     // marginTop: 5,
  //   },
  //   businessName: {
  //     marginTop: "2rem",
  //   },
  // });
  // export class BasicInformation extends Component {
  //   continue = (e) => {
  //     e.preventDefault();
  //     this.props.nextStep();
  //   };
  //   back = (e) => {
  //     e.preventDefault();
  //     this.props.prevStep();
  //   };
  //   constructor() {
  //     super();
  //     this.loaded = createRef();
  //   }
  //   render() {
  //     const { classes } = this.props;
  //     const {
  //       values,
  //       handleChange,
  //       handleAddress,
  //       handleLocation,
  //       handlePhone,
  //       handleImageChange,
  //     } = this.props;
  //     const cityArray = [
  //       "Toronto",
  //       "Ajax",
  //       "Aurora",
  //       "Brampton",
  //       "Brock",
  //       "Burlington",
  //       "Caledon",
  //       "Clarington",
  //       "East Gwilimbury",
  //       "Georgina",
  //       "Halton Hills",
  //       "King",
  //       "Markham",
  //       "Milton",
  //       "Mississauga",
  //       "Newmarket",
  //       "Oakville",
  //       "Oshawa",
  //       "Pickering",
  //       "Richmond Hill",
  //       "Scugog",
  //       "Uxbridge",
  //       "Vaughan",
  //       "Whitby",
  //       "Whitchurch-Stouffville",
  //     ];
  //     const citiesMenuItems = [];
  //     for (const [index, value] of cityArray.entries()) {
  //       citiesMenuItems.push(
  //         <MenuItem key={index} value={`${value}`}>
  //           {value}
  //         </MenuItem>
  //       );
  //     }
  //     return (
  //       <div className={classes.root} ref={this.loaded}>
  //         <div>
  //           <Typography variant="h4" className={classes.title}>
  //             Business Sign Up
  //           </Typography>{" "}
  //           <br /> <br />
  //         </div>
  //         <form className={classes.formControl}>
  //           <FormControl className={classes.avatar}>
  //             <Badge
  //               overlap="circle"
  //               anchorOrigin={{
  //                 vertical: "top",
  //                 horizontal: "right",
  //               }}
  //               badgeContent={
  //                 <label htmlFor="imageChooser">
  //                   <Paper
  //                     elevation={3}
  //                     style={{ zIndex: 1 }}
  //                     className={classes.pencil}
  //                   >
  //                     <IconButton component="span">
  //                       <Create />
  //                     </IconButton>
  //                   </Paper>
  //                 </label>
  //               }
  //             >
  //               <Avatar
  //                 src={values.image ? URL.createObjectURL(values.image) : ""}
  //                 className={classes.imagePreview}
  //               >
  //                 <Person />
  //               </Avatar>
  //             </Badge>
  //             <input
  //               id="imageChooser"
  //               accept="image/*"
  //               type="file"
  //               onChange={handleImageChange}
  //               hidden
  //             ></input>
  //           </FormControl>
  //           <FormControl className={classes.businessName} required>
  //             <label htmlFor="businessName"> Business Name</label>
  //             <TextField
  //               value={values.businessName}
  //               onChange={handleChange("businessName")}
  //               name="businessName"
  //               variant="outlined"
  //             />
  //           </FormControl>
  //           <br /> <br />
  //           <Grid container spacing={2} justifyContent="flex-start">
  //             <Grid item lg={5} xs={12} md={5}>
  //               <FormControl className={classes.formControl} variant="outlined">
  //                 <label htmlFor="email"> Email</label>
  //                 <TextField
  //                   value={values.email}
  //                   onChange={handleChange("email")}
  //                   name="email"
  //                   variant="outlined"
  //                 />
  //               </FormControl>
  //             </Grid>
  //             <Grid item lg={5} xs={12} md={5}>
  //               <FormControl required>
  //                 <label htmlFor="phone">Phone Number</label>
  //                 <MuiPhoneNumber
  //                   name="phone"
  //                   defaultCountry={"ca"}
  //                   value={values.phoneNumber}
  //                   onChange={handlePhone}
  //                   variant="outlined"
  //                 />
  //               </FormControl>
  //             </Grid>
  //           </Grid>
  //           <br />
  //           <Grid container spacing={2} justifyContent="flex-start">
  //             <Grid item lg={5} xs={12} md={5}>
  //               <FormControl variant="outlined" required>
  //                 <PlacesAutoComplete
  //                   values={values}
  //                   handleAddress={handleAddress}
  //                   handleLocation={handleLocation}
  //                   styleProps={{
  //                     width: "400px",
  //                     minWidth: "210px",
  //                   }}
  //                 />
  //               </FormControl>
  //             </Grid>{" "}
  //           </Grid>
  //           <br /> <br />
  //           <Grid container>
  //             <Grid item lg={3} xs={12} md={3} className={classes.rightSpace}>
  //               <FormControl variant="outlined">
  //                 <InputLabel id="select-city">City</InputLabel>
  //                 <Select
  //                   className={classes.select}
  //                   labelId="select-city"
  //                   name="city"
  //                   fullWidth
  //                   defaultValue={values.city || "Toronto"}
  //                   label="City"
  //                   // onChange={(event) => {
  //                   //   setCity(event.target.value);
  //                   // }}
  //                   onChange={handleChange("city")}
  //                 >
  //                   {citiesMenuItems}
  //                 </Select>
  //               </FormControl>
  //             </Grid>
  //             <Grid item lg={3} xs={12} md={3} className={classes.rightSpace}>
  //               <FormControl variant="outlined">
  //                 <InputLabel id="select-province">Province</InputLabel>
  //                 <Select
  //                   className={classes.select}
  //                   labelId="select-province"
  //                   name="province"
  //                   fullWidth
  //                   value={values.province}
  //                   defaultValue="Ontario"
  //                   label="State / Province"
  //                   // onChange={(event) => {
  //                   //   setProvince(event.target.value);
  //                   // }}
  //                   onChange={handleChange("province")}
  //                 >
  //                   <MenuItem value={"Ontario"}>Ontario</MenuItem>
  //                 </Select>
  //               </FormControl>
  //             </Grid>
  //             <Grid item lg={3} xs={12} md={3}>
  //               <FormControl className={classes.formControl} variant="outlined">
  //                 <InputLabel id="select-country">Country</InputLabel>
  //                 <Select
  //                   className={classes.select}
  //                   labelId="select-country"
  //                   value={values.country}
  //                   name="country"
  //                   fullWidth
  //                   label="Country"
  //                   // onChange={(event) => {
  //                   //   setCountry(event.target.value); }}
  //                   onChange={handleChange("country")}
  //                 >
  //                   <MenuItem value={"Canada"}>Canada</MenuItem>
  //                 </Select>
  //               </FormControl>
  //             </Grid>
  //             {/* <Grid item lg={3} xs={12} md={3}></Grid> */}
  //           </Grid>
  //           <br />
  //           <Button
  //             color="secondary"
  //             fullWidth
  //             onClick={this.continue}
  //             variant="contained"
  //             className={classes.button}
  //           >
  //             Continue
  //           </Button>
  //         </form>
  //       </div>
  //     );
  //   }
  // }
  // BasicInformation.propTypes = {
  //   classses: PropTypes.object.isRequired,
  // };
  // export default withStyles(styles)(BasicInformation);
};

const userSignUpBasicInformation = {
  //     import React, { Component } from "react";
  // import { connect } from "react-redux";
  // import { Redirect, Link } from "react-router-dom";
  // import {
  //   loginWithFacebook,
  //   loginWithGoogle,
  //   assignUserType,
  //   generateUserData,
  // } from "../../../redux/actions";
  // import { withStyles } from "@material-ui/styles";
  // import Avatar from "@material-ui/core/Avatar";
  // import Button from "@material-ui/core/Button";
  // import { TextField, Grid } from "@material-ui/core";
  // import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
  // import Typography from "@material-ui/core/Typography";
  // // import Paper from "@material-ui/core/Paper";
  // import Container from "@material-ui/core/Container";
  // import { Formik } from "formik";
  // import * as Yup from "yup";
  // import { parse, isDate } from "date-fns";
  // const styles = (theme) => ({});
  // class BasicInformation extends Component {
  //   state = {
  //     email: "",
  //     password: "",
  //     displayname: "",
  //     firstname: "",
  //     lastname: "",
  //   };
  //   continue = (e) => {
  //     e.preventDefault();
  //     this.props.nextStep();
  //   };
  //   handleGoogleSignIn = () => {
  //     const { dispatch } = this.props;
  //     dispatch(loginWithGoogle());
  //     dispatch(assignUserType("client"));
  //     dispatch(generateUserData("client", {}));
  //   };
  //   handleFacebookSignIn = () => {
  //     const { dispatch } = this.props;
  //     dispatch(loginWithFacebook());
  //     dispatch(assignUserType("client"));
  //     dispatch(generateUserData("client", {}));
  //   };
  //   render() {
  //     const { classes, isAuthenticated } = this.props;
  //     const { from } = this.props.location.state || { from: { pathname: "/" } };
  //     const { handleChange, values } = this.props;
  //     function parseDateString(value, originalValue) {
  //       const parsedDate = isDate(originalValue)
  //         ? originalValue
  //         : parse(originalValue, "yyyy-MM-dd", new Date());
  //       return parsedDate;
  //     }
  //     const today = new Date();
  //     if (isAuthenticated) {
  //       return <Redirect to={from} />;
  //     } else {
  //       return (
  //         <Container component="main" maxWidth="xs">
  //           <div className={classes.encase}>
  //             <Avatar className={classes.avatar}>
  //               <LockOutlinedIcon />
  //             </Avatar>
  //             <Typography component="h1" variant="h5">
  //               Sign Up
  //             </Typography>
  //             <Formik
  //               initialValues={{
  //                 // first_name: values.first_name,
  //                 // last_name: values.last_name,
  //                 // display_name: values.display_name,
  //                 // email: values.email,
  //                 // birthdate: values.birthdate,
  //                 first_name: "",
  //                 last_name: "",
  //                 display_name: "ahhh",
  //                 email: "",
  //                 birthdate: "",
  //               }}
  //               validationSchema={Yup.object({
  //                 first_name: Yup.string().required(
  //                   "Did you forget your first name?"
  //                 ),
  //                 last_name: Yup.string().required(
  //                   "Did you forget your last name?"
  //                 ),
  //                 display_name: Yup.string()
  //                   .max(15, "Make it short and sweet!")
  //                   .required("We need to know what to call you"),
  //                 email: Yup.string()
  //                   .email("That email address doesn't look right")
  //                   .required("Email is required, how else would we reach you?"),
  //                 birthdate: Yup.date().transform(parseDateString).max(today),
  //               })}
  //               onSubmit={(values, { setSubmitting }) => {
  //                 //FIXME: here implement continue transition
  //                 alert(JSON.stringify(values, null, 2));
  //                 setSubmitting(false);
  //                 this.continue();
  //               }}
  //             >
  //               {(formik) => (
  //                 <form onSubmit={formik.handleSubmit}>
  //                   <Grid container>
  //                     <Grid item xs>
  //                       <TextField
  //                         variant="outlined"
  //                         fullWidth
  //                         margin="normal"
  //                         // value={values.first_name}
  //                         id="firstname"
  //                         label="First Name"
  //                         name="first_name"
  //                         // onChange={handleChange("first_name")}
  //                         {...formik.getFieldProps("first_name")}
  //                         helperText={
  //                           formik.touched.firstName && formik.errors.firstName
  //                         }
  //                       />
  //                     </Grid>
  //                     <Grid item xs={1}>
  //                       {/* just my lazy way of creating responsive space */}
  //                     </Grid>
  //                     <Grid item xs>
  //                       <TextField
  //                         variant="outlined"
  //                         fullWidth
  //                         value={values.last_name}
  //                         margin="normal"
  //                         id="last_name"
  //                         label="Last Name"
  //                         name="last_name"
  //                         onChange={handleChange("last_name")}
  //                         {...formik.getFieldProps("last_name")}
  //                       />
  //                     </Grid>
  //                   </Grid>
  //                   <TextField
  //                     variant="outlined"
  //                     margin="normal"
  //                     required={true}
  //                     fullWidth
  //                     value={values.display_name}
  //                     id="display_name"
  //                     label="Display Name"
  //                     name="display_name"
  //                     onChange={handleChange("display_name")}
  //                     {...formik.getFieldProps("display_name")}
  //                   />
  //                   <TextField
  //                     variant="outlined"
  //                     margin="normal"
  //                     required={true}
  //                     fullWidth
  //                     value={values.email}
  //                     id="email"
  //                     label="Email Address"
  //                     name="email"
  //                     onChange={handleChange("email")}
  //                     {...formik.getFieldProps("email")}
  //                   />
  //                   <TextField
  //                     id="date"
  //                     label="Date of Birth"
  //                     type="date"
  //                     required={true}
  //                     margin="normal"
  //                     fullWidth
  //                     value={values.birthdate}
  //                     variant="outlined"
  //                     InputLabelProps={{
  //                       shrink: true,
  //                     }}
  //                     onChange={handleChange("birthdate")}
  //                     {...formik.getFieldProps("birthdate")}
  //                   />
  //                   <Typography variant="body2">
  //                     This will not be shown publicly. But we need it for ...
  //                   </Typography>
  //                   <Button
  //                     color="secondary"
  //                     fullWidth
  //                     // onClick={this.continue}
  //                     variant="contained"
  //                     className={classes.button}
  //                     type="submit"
  //                   >
  //                     Continue
  //                   </Button>
  //                 </form>
  //               )}
  //             </Formik>
  //             {/* <Button
  //               type="button"
  //               fullWidth
  //               variant="contained"
  //               className={classes.signInWithGoogle}
  //               startIcon={
  //                 <Avatar
  //                   src={
  //                     "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
  //                   }
  //                   style={{ width: "1.2rem", height: "auto" }}
  //                 />
  //               }
  //               onClick={this.handleGoogleSignIn}
  //             >
  //               Sign In With Google
  //             </Button>
  //             <Button
  //               type="button"
  //               fullWidth
  //               variant="contained"
  //               color="primary"
  //               className={classes.signInWithFacebook}
  //               startIcon={
  //                 <Avatar
  //                   src={
  //                     process.env.PUBLIC_URL +
  //                     "/assets/logos/f_logo_RGB-White_58.png"
  //                   }
  //                   style={{ width: "1.2rem", height: "auto" }}
  //                 />
  //               }
  //               onClick={this.handleFacebookSignIn}
  //             >
  //               Continue with Facebook
  //             </Button> */}
  //             <Typography component="p">
  //               Already have an account{" "}
  //               <Link to="/login" style={{ color: "#b4a2ff" }}>
  //                 Sign in here
  //               </Link>
  //             </Typography>
  //           </div>
  //         </Container>
  //       );
  //     }
  //   }
  // }
  // function mapStateToProps(state) {
  //   return {
  //     isLoggingIn: state.auth.isLoggingIn,
  //     signUpError: state.auth.signUpError,
  //     isAuthenticated: state.auth.isAuthenticated,
  //   };
  // }
  // export default withStyles(styles)(connect(mapStateToProps)(BasicInformation));
};

const businessSignupCategory = {
  // // this will be returned Three times ??? // consider making it a multi tag input for several categoriesrather than 3 pages
  // //feedback for Youseff, from a UX standpoint , havign 3 pages of the same info ( category) is bad practice
  // import React, { Component } from "react";
  // import withStyles from "@material-ui/core/styles/withStyles";
  // import PropTypes from "prop-types";
  // import Autocomplete from "@material-ui/lab/Autocomplete";
  // import { getBusinessCategories } from "../../../firebase/firebase";
  // import TextField from "@material-ui/core/TextField";
  // import Button from "@material-ui/core/Button";
  // import Typography from "@material-ui/core/Typography";
  // const styles = (theme) => ({
  //   root: {
  //     margin: "3rem",
  //   },
  //   formControl: {
  //     margin: theme.spacing(1),
  //     minWidth: 120,
  //   },
  //   button: {
  //     margin: 15,
  //   },
  //   title: {
  //     fontWeight: "700",
  //   },
  // });
  // export class Category extends Component {
  //   state = {
  //     categories: [],
  //     userSuggestions: [],
  //   };
  //   async componentDidMount() {
  //     await this.getCats(); //execute as soon as componenet is called
  //   }
  //   continue = (e) => {
  //     e.preventDefault();
  //     this.props.nextStep();
  //   };
  //   back = (e) => {
  //     e.preventDefault();
  //     this.props.prevStep();
  //   };
  //   async getCats() {
  //     const chips = [];
  //     try {
  //       const cats = (await getBusinessCategories()) || [];
  //       this.setState({ categories: cats });
  //       // TODO: Dispatch "set categories"  in here
  //       cats.forEach((element, i) => {
  //         chips.push({ key: i, label: element.id });
  //       });
  //       // this.setState({ chipData: chips });
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //     return await getBusinessCategories();
  //   }
  //   sortObj = (obj) => {
  //     // return Object.entries(obj).sort(([, a], [, b]) => a - b);
  //     //Sort in decreasing order and return object back
  //     return Object.entries(obj)
  //       .sort(([, a], [, b]) => b - a)
  //       .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
  //   };
  //   render() {
  //     const { classes } = this.props;
  //     const { values, handleCategory } = this.props;
  //     const { categories, userSuggestions } = this.state;
  //     const shoppingCategoryArray = [
  //       "Furniture",
  //       "Apparrel",
  //       "Candle",
  //       "Plants",
  //       "Cannabis",
  //       "Confectionary",
  //       "Stationary",
  //       "Music",
  //       "Gift store",
  //       "Tourism",
  //       "Pet",
  //       "Technology",
  //       "Fitness",
  //       "Sports",
  //       "Book store",
  //       "Cooking",
  //       "Kitchen",
  //       "Home",
  //       "Other",
  //     ];
  //     const nightlifeCategoryArray = [
  //       "Bar",
  //       "Club",
  //       "Party",
  //       "Live music",
  //       "Theatre",
  //       "Comedy",
  //       "Sports bar",
  //       "Lounge",
  //     ];
  //     const foodCategoryArray = [
  //       "Casual dining",
  //       "Fast casual",
  //       "Comfort Food",
  //       "Fast food",
  //       "Fine dining",
  //       "Family style",
  //       "Food truck",
  //       "Cafe",
  //       "Buffet",
  //       "Pub",
  //       "Grill",
  //       "Soul food",
  //       "Ethnic",
  //       "Dessert",
  //       "Bar + grill",
  //       "Breakfast",
  //       "Brunch",
  //       "Other",
  //     ];
  //     const foodSubCategoryArray = [
  //       "Vegetarian",
  //       "Vegan",
  //       "Japanese",
  //       "Ethiopian",
  //       "Thai",
  //       "Tex-Mex",
  //       "Armenian",
  //       "Sports bar",
  //       "Next",
  //     ];
  //     const activityCategoryArray = [
  //       "Outdoor",
  //       "Show",
  //       "Seasonal",
  //       "Games",
  //       "Family",
  //       "Fitness",
  //       "Club",
  //       "Physical Activity",
  //     ];
  //     return (
  //       <div className={classes.root}>
  //         <Typography variant="h4" className={classes.title}>
  //           Categories
  //         </Typography>{" "}
  //         <Typography variant="h6">
  //           Here are some of our most popular categories!
  //         </Typography>
  //         <Typography variant="body2">Select the one fits you best!</Typography>
  //         <br />
  //         <h1> </h1>
  //         {/* Get firebase categories */}
  //         {/* Place them in an array of objects formatted as chiptag data should be  */}
  //         {/* Pass array to ChipTags */}
  //         <Autocomplete
  //           id="tags-standard"
  //           options={categories}
  //           onChange={(event, value) => {
  //             // console.log(Object.keys(this.sortObj(value.data)));
  //             if (value) {
  //               this.setState({
  //                 userSuggestions: Object.keys(this.sortObj(value.data)),
  //               });
  //               let index = categories.findIndex((elem) => {
  //                 return elem.id === value.id;
  //               });
  //               handleCategory(0, index); // store display state
  //               handleCategory(1, value.id); // 1 is for main category, 2  sub_category1, 3 sub_category2, 4 sub_category3
  //             }
  //           }}
  //           getOptionLabel={(option) => option.id}
  //           // defaultValue={["hello"]}
  //           renderInput={(params) => (
  //             <TextField
  //               {...params}
  //               variant="outlined"
  //               label={`My business falls under ${values.main_category}`}
  //               placeholder="Categories"
  //             />
  //           )}
  //         />
  //         <br />
  //         {(() => {
  //           switch (values.categoryState) {
  //             case 0:
  //               return (
  //                 <div>
  //                   <Autocomplete
  //                     options={activityCategoryArray}
  //                     onChange={(event, value) => {
  //                       // create an array with the category and selected sub category
  //                       handleCategory(2, value);
  //                     }}
  //                     renderInput={(params) => (
  //                       <TextField
  //                         {...params}
  //                         variant="standard"
  //                         label={`Type of establishment: ${values.sub_category1}`}
  //                         placeholder="Select a category"
  //                       />
  //                     )}
  //                   />
  //                   <br />
  //                   <Autocomplete
  //                     freeSolo
  //                     options={userSuggestions}
  //                     onChange={(event, value) => {
  //                       // create an array with the category and selected sub category
  //                       handleCategory(3, value);
  //                     }}
  //                     onInputChange={(event, value) => {
  //                       handleCategory(3, value);
  //                     }}
  //                     renderInput={(params) => (
  //                       <TextField
  //                         {...params}
  //                         variant="standard"
  //                         label={`Sub Category 1: ${values.sub_category2}`}
  //                         placeholder="Select or enter a category"
  //                       />
  //                     )}
  //                   />
  //                   <br />
  //                   <Autocomplete
  //                     freeSolo
  //                     options={userSuggestions}
  //                     onChange={(event, value) => {
  //                       // create an array with the category and selected sub category
  //                       handleCategory(4, value);
  //                     }}
  //                     onInputChange={(event, value) => {
  //                       handleCategory(4, value);
  //                     }}
  //                     renderInput={(params) => (
  //                       <TextField
  //                         {...params}
  //                         variant="standard"
  //                         label={`Sub Category 2: ${values.sub_category3}`}
  //                         placeholder="Select or enter a category"
  //                       />
  //                     )}
  //                   />
  //                   <br />
  //                 </div>
  //               );
  //             case 1:
  //               return (
  //                 <div>
  //                   <Autocomplete
  //                     options={foodCategoryArray}
  //                     onChange={(event, value) => {
  //                       handleCategory(2, value);
  //                     }}
  //                     renderInput={(params) => (
  //                       <TextField
  //                         {...params}
  //                         variant="standard"
  //                         label={`Type of establishment: ${values.sub_category1}`}
  //                         placeholder="Select a category"
  //                       />
  //                     )}
  //                   />
  //                   <br />
  //                   <Autocomplete
  //                     options={foodSubCategoryArray}
  //                     onChange={(event, value) => {
  //                       handleCategory(3, value);
  //                     }}
  //                     renderInput={(params) => (
  //                       <TextField
  //                         {...params}
  //                         variant="standard"
  //                         label={`Type of Food: ${values.sub_category2}`}
  //                         placeholder="Select a type of food"
  //                       />
  //                     )}
  //                   />
  //                   <br />
  //                   <Autocomplete
  //                     freeSolo
  //                     options={userSuggestions}
  //                     onChange={(event, value) => {
  //                       handleCategory(4, value);
  //                     }}
  //                     onInputChange={(event, value) => {
  //                       handleCategory(4, value);
  //                     }}
  //                     renderInput={(params) => (
  //                       <TextField
  //                         {...params}
  //                         variant="standard"
  //                         label={`Main Dish:  ${values.sub_category3}`}
  //                         placeholder="e.g Burgers, Tacos, Pad Thai, Jollof"
  //                       />
  //                     )}
  //                   />
  //                   <br />
  //                 </div>
  //               );
  //             case 2:
  //               return (
  //                 <div>
  //                   <Autocomplete
  //                     options={nightlifeCategoryArray}
  //                     onChange={(event, value) => {
  //                       handleCategory(2, value);
  //                     }}
  //                     renderInput={(params) => (
  //                       <TextField
  //                         {...params}
  //                         variant="standard"
  //                         label={`Type of establishment: ${values.sub_category1}`}
  //                         placeholder="Select a category"
  //                       />
  //                     )}
  //                   />
  //                   <br />
  //                   <Autocomplete
  //                     freeSolo
  //                     options={userSuggestions}
  //                     onChange={(event, value) => {
  //                       handleCategory(3, value);
  //                     }}
  //                     onInputChange={(event, value) => {
  //                       handleCategory(3, value);
  //                     }}
  //                     renderInput={(params) => (
  //                       <TextField
  //                         {...params}
  //                         variant="standard"
  //                         label={`One word description: ${values.sub_category2}`}
  //                         placeholder="ex Dancing, Karaoke, Irish"
  //                       />
  //                     )}
  //                   />
  //                   <br />
  //                   <Autocomplete
  //                     freeSolo
  //                     options={userSuggestions}
  //                     onChange={(event, value) => {
  //                       handleCategory(4, value);
  //                     }}
  //                     onInputChange={(event, value) => {
  //                       handleCategory(4, value);
  //                     }}
  //                     renderInput={(params) => (
  //                       <TextField
  //                         {...params}
  //                         variant="standard"
  //                         label={`Theme: ${values.sub_category3}`}
  //                         placeholder="ex Casual, Mature, Western"
  //                       />
  //                     )}
  //                   />
  //                   <br />
  //                 </div>
  //               );
  //             case 3:
  //               return (
  //                 <div>
  //                   <Autocomplete
  //                     freeSolo
  //                     options={userSuggestions}
  //                     onChange={(event, value) => {
  //                       handleCategory(2, value);
  //                     }}
  //                     onInputChange={(event, value) => {
  //                       handleCategory(2, value);
  //                     }}
  //                     renderInput={(params) => (
  //                       <TextField
  //                         {...params}
  //                         variant="standard"
  //                         label={`Best description of your establishment: ${values.sub_category1}`}
  //                         placeholder="Enter or Select a category"
  //                       />
  //                     )}
  //                   />
  //                   <br />
  //                   <Autocomplete
  //                     freeSolo
  //                     options={userSuggestions}
  //                     onChange={(event, value) => {
  //                       handleCategory(3, value);
  //                     }}
  //                     onInputChange={(event, value) => {
  //                       handleCategory(3, value);
  //                     }}
  //                     renderInput={(params) => (
  //                       <TextField
  //                         {...params}
  //                         variant="standard"
  //                         label={`Sub Category 1: ${values.sub_category2}`}
  //                         placeholder="Enter or Select a category"
  //                       />
  //                     )}
  //                   />
  //                   <br />
  //                   <Autocomplete
  //                     freeSolo
  //                     options={userSuggestions}
  //                     onChange={(event, value) => {
  //                       handleCategory(4, value);
  //                     }}
  //                     onInputChange={(event, value) => {
  //                       handleCategory(4, value);
  //                     }}
  //                     renderInput={(params) => (
  //                       <TextField
  //                         {...params}
  //                         variant="standard"
  //                         label={`Sub Category 2: ${values.sub_category3}`}
  //                         placeholder="Enter or Select a category"
  //                       />
  //                     )}
  //                   />
  //                   <br />
  //                 </div>
  //               );
  //             case 4:
  //               return (
  //                 <div>
  //                   <Autocomplete
  //                     options={shoppingCategoryArray}
  //                     onChange={(event, value) => {
  //                       handleCategory(2, value);
  //                     }}
  //                     renderInput={(params) => (
  //                       <TextField
  //                         {...params}
  //                         variant="standard"
  //                         label={`Item Category ${values.sub_category1}`}
  //                         placeholder="Select a category"
  //                       />
  //                     )}
  //                   />
  //                   <br />
  //                   <Autocomplete
  //                     freeSolo
  //                     options={userSuggestions}
  //                     onChange={(event, value) => {
  //                       handleCategory(3, value);
  //                     }}
  //                     onInputChange={(event, value) => {
  //                       handleCategory(3, value);
  //                     }}
  //                     renderInput={(params) => (
  //                       <TextField
  //                         {...params}
  //                         variant="standard"
  //                         label={`Sub Category 1: ${values.sub_category2}`}
  //                         placeholder="Enter or Select a category"
  //                       />
  //                     )}
  //                   />
  //                   <br />
  //                   <Autocomplete
  //                     freeSolo
  //                     options={userSuggestions}
  //                     onChange={(event, value) => {
  //                       handleCategory(4, value);
  //                     }}
  //                     onInputChange={(event, value) => {
  //                       handleCategory(4, value);
  //                     }}
  //                     renderInput={(params) => (
  //                       <TextField
  //                         {...params}
  //                         variant="standard"
  //                         label={`Sub Category 2: ${values.sub_category3}`}
  //                         placeholder="Enter or Select a category"
  //                       />
  //                     )}
  //                   />
  //                   <br />
  //                 </div>
  //               );
  //             default:
  //               return <div>Select a category to begin</div>;
  //           }
  //         })()}
  //         {/* <ChipTags categories={categories} chipData={chipData} /> */}
  //         <div className={classes.extraData}>
  //           <br />
  //         </div>
  //         <Button
  //           color="secondary"
  //           onClick={this.continue}
  //           variant="contained"
  //           className={classes.button}
  //         >
  //           Continue
  //         </Button>
  //         <Button
  //           onClick={this.back}
  //           variant="contained"
  //           className={classes.button}
  //         >
  //           Back
  //         </Button>
  //       </div>
  //     );
  //   }
  // }
  // Category.propTypes = {
  //   classses: PropTypes.object.isRequired,
  // };
  // export default withStyles(styles)(Category);
};

const businessSignupBusinessHours = {
  //   /* eslint-disable no-unused-vars */
  // //Time picker needed here
  // import React, { Component } from "react";
  // import PropTypes from "prop-types";
  // import TextField from "@material-ui/core/TextField";
  // import { FormControl, FormControlLabel, Checkbox } from "@material-ui/core";
  // import withStyles from "@material-ui/core/styles/withStyles";
  // import Typography from "@material-ui/core/Typography";
  // import Button from "@material-ui/core/Button";
  // const styles = (theme) => ({
  //   root: {
  //     margin: "3rem",
  //   },
  //   formControl: {
  //     margin: theme.spacing(1),
  //     minWidth: 200,
  //     display: "flex",
  //   },
  //   title: {
  //     fontWeight: "700",
  //   },
  //   button: {
  //     margin: 15,
  //   },
  //   textField: {
  //     marginLeft: 5,
  //     marginRight: 15,
  //     marginBottom: 5,
  //   },
  // });
  // export class BusinessHours extends Component {
  //   continue = (e) => {
  //     e.preventDefault();
  //     this.props.nextStep();
  //   };
  //   back = (e) => {
  //     e.preventDefault();
  //     this.props.prevStep();
  //   };
  //   state = {
  //     closed: false,
  //     FridayClosed: false,
  //     MondayClosed: false,
  //     SaturdayClosed: false,
  //     SundayClosed: false,
  //     ThursdayClosed: false,
  //     TuesdayClosed: false,
  //     WednesdayClosed: false,
  //     setDate: "",
  //     MondayStart: "",
  //     MondayEnd: "",
  //     TuesdayStart: "",
  //     TuesdayEnd: "",
  //     WednesdayStart: "",
  //     WednesdayEnd: "",
  //     ThursdayStart: "",
  //     ThursdayEnd: "",
  //     FridayStart: "",
  //     FridayEnd: "",
  //     SaturdayStart: "",
  //     SaturdayEnd: "",
  //     SundayStart: "",
  //     SundayEnd: "",
  //   };
  //   convertTo12Hour = (oldFormatTime) => {
  //     var oldFormatTimeArray = oldFormatTime.split(":");
  //     var HH = parseInt(oldFormatTimeArray[0]);
  //     var min = oldFormatTimeArray[1];
  //     var AMPM = HH >= 12 ? "p.m." : "a.m.";
  //     var hours;
  //     if (HH === 0) {
  //       hours = HH + 12;
  //     } else if (HH > 12) {
  //       hours = HH - 12;
  //     } else {
  //       hours = HH;
  //     }
  //     var newFormatTime = hours + ":" + min + " " + AMPM;
  //     return newFormatTime;
  //   };
  //   handleDateChange = (e) => {
  //     this.setState({
  //       setDate: e.target.value,
  //     });
  //   };
  //   render() {
  //     const { classes } = this.props;
  //     const { handleTime } = this.props;
  //     const {
  //       FridayClosed,
  //       MondayClosed,
  //       SaturdayClosed,
  //       SundayClosed,
  //       ThursdayClosed,
  //       TuesdayClosed,
  //       WednesdayClosed,
  //       MondayStart,
  //       MondayEnd,
  //       TuesdayStart,
  //       TuesdayEnd,
  //       WednesdayStart,
  //       WednesdayEnd,
  //       ThursdayStart,
  //       ThursdayEnd,
  //       FridayStart,
  //       FridayEnd,
  //       SaturdayStart,
  //       SaturdayEnd,
  //       SundayStart,
  //       SundayEnd,
  //     } = this.state;
  //     const daysOfWeek = [
  //       "Sunday",
  //       "Monday",
  //       "Tuesday",
  //       "Wednesday",
  //       "Thursday",
  //       "Friday",
  //       "Saturday",
  //     ];
  //     return (
  //       <div className={classes.root}>
  //         <h4 className={classes.title}>Select Business Hours</h4>
  //         {daysOfWeek.map((day, index) => (
  //           <div key={index}>
  //             <FormControl className={classes.formControl}>
  //               <form className={classes.container} noValidate>
  //                 <Typography>{day}</Typography>
  //                 <TextField
  //                   id={`${day + "_start"}`}
  //                   label="Opening"
  //                   type="time"
  //                   // defaultValue="00:00"
  //                   // eslint-disable-next-line no-eval
  //                   value={eval(day + "Start")}
  //                   className={classes.textField}
  //                   InputLabelProps={{
  //                     shrink: true,
  //                   }}
  //                   inputProps={{
  //                     step: 300, // 5 min
  //                   }}
  //                   onChange={(event) => {
  //                     console.log(event.target.value);
  //                     handleTime(
  //                       day + " Start",
  //                       this.convertTo12Hour(event.target.value)
  //                     );
  //                     this.setState({
  //                       [day + "Start"]: event.target.value,
  //                     });
  //                   }}
  //                   // eslint-disable-next-line no-eval
  //                   disabled={eval(day + "Closed")}
  //                 />
  //                 {"  "}
  //                 <TextField
  //                   id={`${day + "_end"}`}
  //                   label="Closing"
  //                   type="time"
  //                   // eslint-disable-next-line no-eval
  //                   value={eval(day + "End")}
  //                   // defaultValue="00:00"
  //                   className={classes.textField}
  //                   InputLabelProps={{
  //                     shrink: true,
  //                   }}
  //                   inputProps={{ step: 300 }} // 5 min
  //                   onChange={(event) => {
  //                     handleTime(
  //                       day + " End",
  //                       this.convertTo12Hour(event.target.value)
  //                     );
  //                     this.setState({
  //                       [day + "End"]: event.target.value,
  //                     });
  //                   }}
  //                   // eslint-disable-next-line no-eval
  //                   disabled={eval(day + "Closed")}
  //                 />
  //                 <FormControlLabel
  //                   value="end"
  //                   control={
  //                     <Checkbox
  //                       onChange={(event) => {
  //                         this.setState({
  //                           [day + "Start"]: "",
  //                           [day + "End"]: "",
  //                           [day + "Closed"]: event.target.checked,
  //                         });
  //                         handleTime(day + " Start", "closed");
  //                         handleTime(day + " End", "closed");
  //                       }}
  //                       color="primary"
  //                     />
  //                   }
  //                   label="Closed"
  //                   labelPlacement="end"
  //                 />
  //               </form>
  //             </FormControl>
  //           </div>
  //         ))}
  //         <Button
  //           color="secondary"
  //           onClick={this.continue}
  //           variant="contained"
  //           className={classes.button}
  //         >
  //           Confirm Details
  //         </Button>
  //         <Button
  //           onClick={this.back}
  //           variant="contained"
  //           className={classes.button}
  //         >
  //           Back
  //         </Button>
  //       </div>
  //     );
  //   }
  // }
  // BusinessHours.propTypes = {
  //   classses: PropTypes.object.isRequired,
  // };
  // export default withStyles(styles)(BusinessHours);
};

const businessSignupConfirm = {
  // import React, { Component } from "react";
  // import PropTypes from "prop-types";
  // import withStyles from "@material-ui/core/styles/withStyles";
  // import Typography from "@material-ui/core/Typography";
  // import Avatar from "@material-ui/core/Avatar";
  // import Button from "@material-ui/core/Button";
  // import {
  //   Card,
  //   CardHeader,
  //   CardMedia,
  //   CardContent,
  //   Grid,
  // } from "@material-ui/core";
  // import { TextField, InputAdornment, IconButton } from "@material-ui/core";
  // import Visibility from "@material-ui/icons/Visibility";
  // import VisibilityOff from "@material-ui/icons/VisibilityOff";
  // import axios from "axios";
  // import {
  //   FB_FUNCTIONS_VALIDATE_PROMO,
  //   FIREBASE_FUNCTIONS_ENDPOINT,
  //   GET_ALL_EVENTS_ENDPOINT,
  // } from "../../../util/keywords";
  // import { firestoreTimeStamp } from "../../../firebase/firebase";
  // const styles = (theme) => ({
  //   root: {
  //     margin: "3rem",
  //   },
  //   formControl: {
  //     margin: theme.spacing(1),
  //     minWidth: 200,
  //     display: "flex",
  //   },
  //   title: {
  //     fontWeight: "700",
  //   },
  //   button: {
  //     margin: 15,
  //   },
  //   textField: {
  //     marginLeft: 5,
  //     marginRight: 15,
  //     marginBottom: 5,
  //   },
  //   makeItBold: {
  //     fontWeight: 700,
  //   },
  // });
  // export class Confirm extends Component {
  //   continue = (e) => {
  //     e.preventDefault();
  //     this.props.nextStep();
  //   };
  //   back = (e) => {
  //     e.preventDefault();
  //     this.props.prevStep();
  //   };
  //   state = {
  //     showPassword: false,
  //     validPromo: {
  //       status: null,
  //       msg: null,
  //       error: null,
  //       data: { duration_month: null },
  //     },
  //   };
  //   //TODO: Extract this method and related fields to a stand alone component
  //   validatePromoCode = (promoCode) => {
  //     const { handleExpiryDate } = this.props;
  //     axios
  //       .get(`${FB_FUNCTIONS_VALIDATE_PROMO}/${promoCode}`)
  //       .then((resp) => {
  //         this.setState({ validPromo: resp.data });
  //         if (resp.data.status === 1) {
  //           const code = resp.data.data;
  //           handleExpiryDate(code);
  //         }
  //       })
  //       .catch((err) => {
  //         if (err.response && err.response.data) {
  //           this.setState({ validPromo: err.response.data });
  //         }
  //         console.log("Fetch err", err);
  //       });
  //   };
  //   // handleChage = (e) => {
  //   //   this.setState({
  //   //     password: e.target.value,
  //   //   });
  //   // };
  //   render() {
  //     const { classes } = this.props;
  //     const {
  //       values,
  //       handleChange,
  //       createBusinessAccountUserPassHandler,
  //     } = this.props;
  //     const { showPassword, validPromo } = this.state;
  //     const handleClickShowPassword = () => {
  //       this.setState({
  //         showPassword: !showPassword,
  //       });
  //     };
  //     const handleMouseDownPassword = () => {
  //       this.setState({
  //         showPassword: !showPassword,
  //         password: "",
  //       });
  //     };
  //     return (
  //       <div className={classes.root}>
  //         <h4 className={classes.title}>Confirm your details</h4>
  //         <p>
  //           {" "}
  //           You may return to previous pages to edit if need be, all your data up
  //           to this point has been stored!
  //         </p>
  //         <br />
  //         <Typography variant="body2">
  //           Click "Final Step" to complte your regristration!
  //         </Typography>
  //         <br />
  //         <Card>
  //           <CardHeader
  //             avatar={
  //               <Avatar
  //                 src={values.image ? URL.createObjectURL(values.image) : ""}
  //               >
  //                 H
  //               </Avatar>
  //             }
  //             title={values.businessName}
  //             subheader={`${values.main_category[0]}, ${values.sub_category1[0]}, ${values.sub_category2[0]}, ${values.sub_category3[0]}`}
  //           />
  //           <CardMedia
  //             className={classes.media}
  //             image="/static/images/cards/paella.jpg"
  //             title="Paella dish"
  //           />
  //           <CardContent>
  //             <Typography variant="h6">Country: </Typography>
  //             <Typography variant="body2" color="textSecondary" component="p">
  //               {values.country}
  //             </Typography>
  //             <Typography variant="h6">State/Province: </Typography>
  //             <Typography variant="body2" color="textSecondary" component="p">
  //               {values.province}
  //             </Typography>
  //             <Typography variant="h6">City: </Typography>
  //             <Typography variant="body2" color="textSecondary" component="p">
  //               {values.city}
  //             </Typography>
  //             <Typography variant="h6">Contact: </Typography>
  //             <Typography variant="subtitle2">Address: </Typography>
  //             <Typography variant="body2" color="textSecondary" component="p">
  //               {values.address}
  //             </Typography>
  //             <a href={`mailto:${values.email}`}>{values.email}</a>
  //           </CardContent>
  //         </Card>
  //         <br />
  //         <form>
  //           <Grid container direction="row" alignItems="center">
  //             <Grid item xs={9}>
  //               <TextField
  //                 fullWidth
  //                 label="Promo Code"
  //                 variant="outlined"
  //                 type="text"
  //                 error={validPromo.status === 0}
  //                 helperText={validPromo.msg}
  //                 onChange={handleChange("promoCode")}
  //                 inputProps={{ style: { textTransform: "uppercase" } }}
  //               />
  //             </Grid>
  //             <Grid item xs={2}>
  //               <Button
  //                 disabled={values.promoCode === ""}
  //                 onClick={() => {
  //                   values.promoCode = values.promoCode.toUpperCase();
  //                   this.validatePromoCode(values.promoCode);
  //                 }}
  //                 color="primary"
  //                 variant="contained"
  //                 className={classes.button}
  //               >
  //                 Apply
  //               </Button>
  //             </Grid>
  //           </Grid>
  //           <Grid container>
  //             <Grid>
  //               <Typography>{/*promoCodeMesssage*/}</Typography>
  //             </Grid>
  //           </Grid>
  //         </form>
  //         <br />
  //         <form>
  //           <TextField
  //             fullWidth
  //             label="Password"
  //             variant="outlined"
  //             type={showPassword ? "text" : "password"} // <-- This is where the magic happens
  //             onChange={handleChange("password")}
  //             InputProps={{
  //               // <-- This is where the toggle button is added.
  //               endAdornment: (
  //                 <InputAdornment position="end">
  //                   <IconButton
  //                     aria-label="toggle password visibility"
  //                     onClick={handleClickShowPassword}
  //                     onMouseDown={handleMouseDownPassword}
  //                   >
  //                     {showPassword ? <Visibility /> : <VisibilityOff />}
  //                   </IconButton>
  //                 </InputAdornment>
  //               ),
  //             }}
  //           />
  //         </form>
  //         {/* <TextField
  //           fullWidth
  //           label="Confrim Password"
  //           variant="outlined"
  //           type={showPassword ? "text" : "password"} // <-- This is where the magic happens
  //           onChange={this.handleChage}
  //           InputProps={{
  //             // <-- This is where the toggle button is added.
  //             endAdornment: (
  //               <InputAdornment position="end">
  //                 <IconButton
  //                   aria-label="toggle password visibility"
  //                   onClick={handleClickShowPassword}
  //                   onMouseDown={handleMouseDownPassword}
  //                 >
  //                   {showPassword ? <Visibility /> : <VisibilityOff />}
  //                 </IconButton>
  //               </InputAdornment>
  //             ),
  //           }}
  //         /> */}
  //         <Button
  //           color="primary"
  //           onClick={(event) => {
  //             createBusinessAccountUserPassHandler(
  //               event,
  //               values.email,
  //               values.password
  //             );
  //           }}
  //           variant="contained"
  //           className={classes.button}
  //         >
  //           Final Step
  //         </Button>
  //         <Button
  //           onClick={this.back}
  //           variant="contained"
  //           className={classes.button}
  //         >
  //           Back
  //         </Button>
  //         <Button
  //           color="secondary"
  //           className={classes.button}
  //           onClick={() => {
  //             console.log(values);
  //           }}
  //           variant="contained"
  //         >
  //           Debug{" "}
  //         </Button>
  //       </div>
  //     );
  //   }
  // }
  // Confirm.propTypes = {
  //   classses: PropTypes.object.isRequired,
  // };
  // export default withStyles(styles)(Confirm);
};

const createEditEventForm = {
  // import {
  //   Avatar,
  //   CardMedia,
  //   Checkbox,
  //   CircularProgress,
  //   FormControl,
  //   FormControlLabel,
  //   FormGroup,
  //   FormHelperText,
  //   Grid,
  //   Radio,
  //   RadioGroup,
  //   TextField,
  // } from "@material-ui/core";
  // import PropTypes from "prop-types";
  // import React, { Component, useEffect } from "react";
  // import withStyles from "@material-ui/core/styles/withStyles";
  // import Dropzone from "../reusable/Dropzone";
  // import imageCompression from "browser-image-compression";
  // import Button from "@material-ui/core/Button";
  // import Carousel from "react-material-ui-carousel";
  // import { akinsToLocalISOString } from "../../util/util";
  // import { connect } from "react-redux";
  // import { clearOnSuccessEvent } from "../../redux/actions";
  // import LocationManager from "../dashboard/LocationManager";
  // const styles = (theme) => ({
  //   root: {
  //     margin: "3rem",
  //   },
  //   txtField: {},
  //   padddingCheckBox: {
  //     // paddingLeft: 150,
  //     // alignSelf: "flex-end",
  //   },
  //   ctrlLabel: {
  //     textAlign: "left",
  //   },
  //   imagePreview: {
  //     width: "5em",
  //     height: "auto",
  //   },
  //   error: {
  //     color: "#f44336",
  //   },
  //   media: {
  //     height: 400,
  //   },
  // });
  // // This is my make shift solution to using hooks in class components. the real solution would be to convert this whole fiel to a functional component
  // const MakeshiftObserver = ({ value_1, value_2, didUpdate }) => {
  //   useEffect(() => {
  //     if (value_1 && value_2) {
  //       didUpdate();
  //     }
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [value_1, value_2]);
  //   return null; // component does not render anything
  // };
  // const AnotherObserver = ({ value, didUpdate }) => {
  //   useEffect(() => {
  //     didUpdate(value);
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [value]);
  //   return null; // component does not render anything
  // };
  // class CreateEditEvent extends Component {
  //   state = {
  //     imagesInState: [],
  //     videosInState: [],
  //     filesInState: [],
  //     eventNameError: false,
  //     eventDescriptionError: false,
  //     formError: {},
  //     eventTypeError: false,
  //   };
  //   handleLocationUpdate = (position) => {
  //     const { dispatch } = this.props;
  //     this.setState({
  //       location: position,
  //     });
  //     this.props.values.location = position;
  //   };
  //   render() {
  //     const { classes } = this.props;
  //     const {
  //       values,
  //       handleChange,
  //       handleTimeChange,
  //       handleChecked,
  //       sendImagesAndVideosBack,
  //       handleSubmit,
  //       setDialogState,
  //       redirectPageToEvent,
  //       pullOnSuccessfulUpdate,
  //       isEventSuccessfullyUpdatedDB,
  //       isEventSuccessfullyUpdatedFB,
  //       isEventSuccessfullyCreatedDB,
  //       isEventSuccessfullyCreatedFB,
  //       setSuccessSnack,
  //     } = this.props;
  //     const {
  //       imagesInState,
  //       videosInState,
  //       filesInState,
  //       eventNameError,
  //       eventDescriptionError,
  //       eventTypeError,
  //     } = this.state;
  //     const { loading, success, error, successAction } = this.props;
  //     const handleStripFirebaseTimestamp = (which) => {
  //       var milliseconds = 1000;
  //       var dateObj = new Date(values[`${which}`].seconds * milliseconds);
  //       var result = akinsToLocalISOString(dateObj);
  //       console.log(result);
  //       values[`${which}`] = result;
  //       return result;
  //     };
  //     const generateDateObjForRepeatingEvent = (slicedTime) => {
  //       var midnight = new Date(new Date().setHours(0, 0, 0, 0));
  //       // var newDate = midnight.valueOf()/1000 + slicedTime
  //       var dateObj = new Date((midnight.valueOf() / 1000 + slicedTime) * 1000);
  //       // Math.Round((new Date().getTime()) /1000)
  //       // return dateObj.toString().slice(0, 21);
  //       // return dateObj.toISOString().slice(0, 16);
  //       return dateObj;
  //     };
  //     const getDateTimeNow = () => {
  //       var tzoffset = new Date().getTimezoneOffset() * 60000; //offset in milliseconds
  //       return new Date(Date.now() - tzoffset).toISOString().slice(0, 16);
  //     };
  //     // TODO: clean this method up, stop repeating yourself
  //     // FIXME: method is also very broken
  //     const onDrop = (acceptedFiles) => {
  //       // this callback will be called after files get dropped, we will get the acceptedFiles. If you want, you can even access the rejected files too
  //       console.log(acceptedFiles);
  //       const compressImage = async (image) => {
  //         console.log(image);
  //         const options = {
  //           maxSizeMB: 0.1,
  //           maxWidthOrHeight: 1000,
  //           useWebWorker: true,
  //         };
  //         try {
  //           const compressedFile = await imageCompression(image, options);
  //           return compressedFile;
  //         } catch (error) {
  //           console.log("Error during image compression: ", error);
  //         }
  //       };
  //       const updateImageFileState = async (file) => {
  //         this.setState({
  //           filesInState: [...this.state.filesInState, file],
  //           imagesInState: [...this.state.imagesInState, file],
  //         });
  //       };
  //       const updateVideoFileState = async (file) => {
  //         this.setState({
  //           filesInState: [...this.state.filesInState, file],
  //           videosInState: [...this.state.videosInState, file],
  //         });
  //       };
  //       if (acceptedFiles.length > 3) {
  //         alert(
  //           "You are only allowed to upload a maximum of 3 images for an event"
  //         );
  //         let allFiles = [];
  //         let images = [];
  //         for (var i = 0; i < 3; i++) {
  //           if (acceptedFiles[i] && acceptedFiles[i].type.includes("image")) {
  //             compressImage(acceptedFiles[i]).then((compressedImageFile) => {
  //               console.log(compressedImageFile);
  //               images.push(compressedImageFile);
  //               allFiles.push(compressedImageFile);
  //               // imagesinState is used for keeping track of uploads AND for displaying previews
  //               if (allFiles.length + filesInState.length <= 3) {
  //                 console.log(
  //                   "Total files are under or equal to 3. Actual value is ",
  //                   allFiles.length + filesInState.length
  //                 );
  //                 updateImageFileState(compressedImageFile);
  //               } else {
  //                 allFiles.length = 0; // clear the array
  //                 allFiles.push(compressedImageFile);
  //                 console.log(
  //                   "total files is greater than 3, removing oldest. Current allFiles length is",
  //                   allFiles.length
  //                 );
  //                 this.setState({
  //                   imagesInState: images,
  //                   videosInState: [],
  //                   filesInState: allFiles,
  //                 });
  //               }
  //             });
  //           } else if (acceptedFiles[i].type.includes("video")) {
  //             const currentFile = acceptedFiles[i];
  //             allFiles.push(currentFile);
  //             try {
  //               // get the frame at 0 seconds of the video file
  //               getVideoCover(acceptedFiles[i], 0)
  //                 .then((cover) => {
  //                   // print out the result image blob
  //                   console.log(cover);
  //                   if (allFiles.length + filesInState.length <= 3) {
  //                     updateVideoFileState(cover);
  //                     // images.push(currentFile);
  //                   } else {
  //                     allFiles.length = 0; // clear the array
  //                     allFiles.push(currentFile);
  //                     this.setState({
  //                       videosInState: [cover],
  //                       imagesInState: [],
  //                       filesInState: [currentFile],
  //                     });
  //                   }
  //                 })
  //                 .catch((err) => {
  //                   console.log("ERROR getting image thumbnail: ", err);
  //                 });
  //             } catch (ex) {
  //               console.log("ERROR getting image thumbnail: ", ex);
  //             }
  //           }
  //         }
  //         console.log(images);
  //         // ensure all images and videos are being stored
  //       } else {
  //         let allFiles = [];
  //         let images = [];
  //         for (var x = 0; x < acceptedFiles.length; x++) {
  //           if (acceptedFiles[x] && acceptedFiles[x].type.includes("image")) {
  //             compressImage(acceptedFiles[x]).then((compressedImageFile) => {
  //               console.log(compressedImageFile);
  //               images.push(compressedImageFile);
  //               allFiles.push(compressedImageFile);
  //               if (allFiles.length + filesInState.length <= 3) {
  //                 console.log(
  //                   "Total files are under or equal to 3. Actual value is ",
  //                   allFiles.length + filesInState.length
  //                 );
  //                 updateImageFileState(compressedImageFile);
  //               } else {
  //                 allFiles.length = 0; // clear the array
  //                 console.log(
  //                   "total files is greater than 3, removing oldest. Current allFiles length is",
  //                   allFiles.length
  //                 );
  //                 allFiles.push(compressedImageFile);
  //                 this.setState({
  //                   imagesInState: images,
  //                   videosInState: [],
  //                   filesInState: allFiles,
  //                 });
  //               }
  //             });
  //           } else if (acceptedFiles[x].type.includes("video")) {
  //             // Below code is for displaying a thumbnail for an uploaded video
  //             console.log("there is a video");
  //             const currentFile = acceptedFiles[x];
  //             allFiles.push(currentFile);
  //             try {
  //               // get the frame at 0 seconds of the video file
  //               getVideoCover(acceptedFiles[x], 0)
  //                 .then((cover) => {
  //                   // print out the result image blob
  //                   console.log(cover);
  //                   if (allFiles.length + filesInState.length <= 3) {
  //                     this.setState({
  //                       videosInState: [...this.state.videosInState, cover],
  //                       filesInState: [...this.state.filesInState, currentFile],
  //                     });
  //                     images.push(currentFile);
  //                   } else {
  //                     allFiles.length = 0; // clear the array
  //                     allFiles.push(currentFile);
  //                     this.setState({
  //                       videosInState: [cover],
  //                       imagesInState: [],
  //                       filesInState: allFiles,
  //                     });
  //                   }
  //                 })
  //                 .catch((err) => {
  //                   console.log("ERROR getting image thumbnail: ", err);
  //                 });
  //             } catch (ex) {
  //               console.log("ERROR getting image thumbnail: ", ex);
  //             }
  //           }
  //           console.log(images);
  //         }
  //       }
  //     };
  //     // Stack overflow https://stackoverflow.com/a/63474748/6100818
  //     function getVideoCover(file, seekTo = 0.0) {
  //       console.log("getting video cover for file: ", file);
  //       return new Promise((resolve, reject) => {
  //         // load the file to a video player
  //         const videoPlayer = document.createElement("video");
  //         videoPlayer.setAttribute("src", URL.createObjectURL(file));
  //         videoPlayer.load();
  //         videoPlayer.addEventListener("error", (ex) => {
  //           reject("error when loading video file", ex);
  //         });
  //         // load metadata of the video to get video duration and dimensions
  //         videoPlayer.addEventListener("loadedmetadata", () => {
  //           // seek to user defined timestamp (in seconds) if possible
  //           if (videoPlayer.duration < seekTo) {
  //             reject("video is too short.");
  //             return;
  //           }
  //           // delay seeking or else 'seeked' event won't fire on Safari
  //           setTimeout(() => {
  //             videoPlayer.currentTime = seekTo;
  //           }, 200);
  //           // extract video thumbnail once seeking is complete
  //           videoPlayer.addEventListener("seeked", () => {
  //             console.log("video is now paused at %ss.", seekTo);
  //             // define a canvas to have the same dimension as the video
  //             const canvas = document.createElement("canvas");
  //             canvas.width = videoPlayer.videoWidth;
  //             canvas.height = videoPlayer.videoHeight;
  //             // draw the video frame to canvas
  //             const ctx = canvas.getContext("2d");
  //             ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
  //             // return the canvas image as a blob
  //             ctx.canvas.toBlob(
  //               (blob) => {
  //                 resolve(blob);
  //               },
  //               "image/jpeg",
  //               0.75 /* quality */
  //             );
  //           });
  //         });
  //       });
  //     }
  //     const handleRemoveFile = (fileName) => {
  //       const updatedFiles = [];
  //       // Add selected fiels to DataTransfer object
  //       for (let file of imagesInState) {
  //         console.log(file);
  //         console.log(file.name);
  //         file.name !== fileName && updatedFiles.push(file); // Add only file name not matched files
  //       }
  //       this.setState({
  //         imagesInState: updatedFiles,
  //       });
  //       sendImagesAndVideosBack(updatedFiles);
  //     };
  //     // const validateTime = (input) => {};
  //     const validateForm = () => {
  //       console.log("hello");
  //       console.log(values["Event Name"]);
  //       // if
  //       values["Event Name"].length === 0
  //         ? this.setState({ eventNameError: true })
  //         : this.setState({ eventNameError: false });
  //       values["Event Description"].length === 0
  //         ? this.setState({ eventDescriptionError: true })
  //         : this.setState({ eventDescriptionError: false });
  //       //TODO: Validate event type
  //       //TODO: Validate event times
  //     };
  //     const onSuccess = () => {
  //       console.log("EVENT CREATED IN DB AND FB ");
  //       this.props.setDialogState(false); //close the dialog and then
  //       this.props.setSuccessSnack(true);
  //       this.props.redirectPageToEvent();
  //       if (values.editingEvent) {
  //         pullOnSuccessfulUpdate();
  //       }
  //       const { dispatch } = this.props;
  //       dispatch(clearOnSuccessEvent());
  //     };
  //     return (
  //       <div className={classes.root}>
  //         <form>
  //           <Grid
  //             container
  //             spacing={0}
  //             direction="row"
  //             alignItems="center"
  //             justifyContent="center"
  //           >
  //             <Grid item xs={10}>
  //               <FormControl fullWidth className={classes.txtField} required>
  //                 <div
  //                   style={{ display: "flex", justifyContent: "space-between" }}
  //                 >
  //                   <label htmlFor="Event Name"> Event Name </label>
  //                   <FormHelperText>
  //                     {values["Event Name"].length}/30
  //                   </FormHelperText>
  //                 </div>
  //                 <TextField
  //                   error={eventNameError}
  //                   value={values["Event Name"]}
  //                   onChange={handleChange("Event Name")}
  //                   name="eventName"
  //                   variant="outlined"
  //                   helperText={
  //                     eventNameError ? "Event name cannot be empty" : ""
  //                   }
  //                   inputProps={{ maxLength: 30 }}
  //                 />
  //               </FormControl>
  //             </Grid>
  //             <Grid item xs={10}>
  //               <FormControl fullWidth required>
  //                 <div
  //                   style={{ display: "flex", justifyContent: "space-between" }}
  //                 >
  //                   <label htmlFor="eventDescription"> Event Description </label>
  //                   <FormHelperText>
  //                     {values["Event Description"].length}/150
  //                   </FormHelperText>
  //                 </div>
  //                 <TextField
  //                   error={eventDescriptionError}
  //                   value={values["Event Description"]}
  //                   onChange={handleChange("Event Description")}
  //                   name="eventDescription"
  //                   variant="outlined"
  //                   helperText={
  //                     eventDescriptionError
  //                       ? "Event description cannot be empty"
  //                       : ""
  //                   }
  //                   multiline
  //                   rows={3}
  //                   inputProps={{ maxLength: 150 }}
  //                 />
  //               </FormControl>
  //             </Grid>
  //             {/* Is the event repeating */}
  //             {values.repeats ? (
  //               <>
  //                 <Grid item xs={5}>
  //                   <FormControl fullWidth required>
  //                     <label htmlFor="eventStart"> Repeat Start </label>
  //                     <TextField
  //                       id="eventStart"
  //                       type="datetime-local"
  //                       variant="outlined"
  //                       defaultValue={
  //                         values["start time"]
  //                           ? akinsToLocalISOString(
  //                               generateDateObjForRepeatingEvent(
  //                                 values["start time"]
  //                               )
  //                             )
  //                           : "" // getDateTimeNow()
  //                       }
  //                       className={classes.textField}
  //                       InputLabelProps={{
  //                         shrink: true,
  //                       }}
  //                       onChange={handleTimeChange("Start time")}
  //                     />
  //                   </FormControl>
  //                 </Grid>
  //                 <Grid item xs={5}>
  //                   <FormControl fullWidth required>
  //                     <label htmlFor="eventEnd"> Repeat End</label>
  //                     <TextField
  //                       id="eventEnd"
  //                       type="datetime-local"
  //                       variant="outlined"
  //                       defaultValue={
  //                         values["end time"]
  //                           ? akinsToLocalISOString(
  //                               generateDateObjForRepeatingEvent(
  //                                 values["end time"]
  //                               )
  //                             )
  //                           : ""
  //                       } //"2020-01-01T08:30"
  //                       className={classes.textField}
  //                       InputLabelProps={{
  //                         shrink: true,
  //                       }}
  //                       onChange={handleTimeChange("End time")}
  //                     />
  //                   </FormControl>
  //                 </Grid>
  //               </>
  //             ) : (
  //               // event is not repeating
  //               <>
  //                 <Grid item xs={5}>
  //                   <FormControl fullWidth required>
  //                     <label htmlFor="eventStart"> Event Start </label>
  //                     <TextField
  //                       id="eventStart"
  //                       type="datetime-local"
  //                       variant="outlined"
  //                       defaultValue={
  //                         values["Start time"] && values["Start time"].seconds
  //                           ? handleStripFirebaseTimestamp("Start time")
  //                           : "" // getDateTimeNow()
  //                       }
  //                       className={classes.textField}
  //                       InputLabelProps={{
  //                         shrink: true,
  //                       }}
  //                       onChange={handleTimeChange("Start time")}
  //                     />
  //                   </FormControl>
  //                 </Grid>
  //                 <Grid item xs={5}>
  //                   <FormControl fullWidth required>
  //                     <label htmlFor="eventEnd"> Event End</label>
  //                     <TextField
  //                       id="eventEnd"
  //                       type="datetime-local"
  //                       variant="outlined"
  //                       defaultValue={
  //                         values["End time"] && values["End time"].seconds
  //                           ? handleStripFirebaseTimestamp("End time")
  //                           : "" // getDateTimeNow()
  //                       } //"2020-01-01T08:30"
  //                       className={classes.textField}
  //                       InputLabelProps={{
  //                         shrink: true,
  //                       }}
  //                       onChange={handleTimeChange("End time")}
  //                     />
  //                   </FormControl>
  //                 </Grid>
  //               </>
  //             )}
  //             <Grid item xs={10}>
  //               <br />
  //               <LocationManager
  //                 handleLocationUpdate={this.handleLocationUpdate}
  //               ></LocationManager>
  //             </Grid>
  //             <Grid item xs={10}>
  //               <FormControl
  //                 fullWidth
  //                 component="fieldset"
  //                 className={classes.formControl}
  //                 required
  //                 error={eventTypeError}
  //                 disabled={
  //                   values.editingEvent && values.repeats // if a editing repeating event, enable based on repeating event time values
  //                     ? !(values["start time"] && values["end time"])
  //                     : !(values["Start time"] && values["End time"])
  //                 } // only become enabled if these two values have been provided
  //               >
  //                 {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
  //                 <br />
  //                 <label> Event Type </label>
  //                 <hr />
  //                 <br />
  //                 <RadioGroup
  //                   aria-label="Event Occurrence type"
  //                   value={values.eventType || ""}
  //                   onChange={handleChecked}
  //                 >
  //                   <FormHelperText> Please select one</FormHelperText>
  //                   <FormControlLabel
  //                     className={classes.ctrlLabel}
  //                     control={
  //                       <div className={classes.padddingCheckBox}>
  //                         <Radio
  //                           // checked={values.oneTimeEvent}
  //                           value="oneTimeEvent"
  //                           name="oneTimeEvent"
  //                         />
  //                       </div>
  //                     }
  //                     label="One-Time Event"
  //                     labelPlacement="start"
  //                   />
  //                   <FormControlLabel
  //                     className={classes.ctrlLabel}
  //                     control={
  //                       <div className={classes.padddingCheckBox}>
  //                         <Radio
  //                           // checked={values.repeatsDaily}
  //                           value="Daily"
  //                           name="Daily"
  //                         />
  //                       </div>
  //                     }
  //                     label="Repeats Daily"
  //                     labelPlacement="start"
  //                   />
  //                   <FormControlLabel
  //                     className={classes.ctrlLabel}
  //                     control={
  //                       <div className={classes.padddingCheckBox}>
  //                         <Radio
  //                           // checked={values.repeatsWeekly}
  //                           name="Weekly"
  //                           value="Weekly"
  //                         />
  //                       </div>
  //                     }
  //                     label="Repeats Weekly"
  //                     labelPlacement="start"
  //                   />
  //                   <FormControlLabel
  //                     className={classes.ctrlLabel}
  //                     control={
  //                       <div className={classes.padddingCheckBox}>
  //                         <Radio
  //                           // checked={values.repeatsSatSun}
  //                           name="Weekend"
  //                           value="Weekend"
  //                         />
  //                       </div>
  //                     }
  //                     label="Repeats Sat-Sun"
  //                     labelPlacement="start"
  //                   />
  //                   <FormControlLabel
  //                     className={classes.ctrlLabel}
  //                     control={
  //                       <div className={classes.padddingCheckBox}>
  //                         <Radio
  //                           // checked={values.repeatsMonFri}
  //                           name="Weekday"
  //                           value="Weekday"
  //                         />
  //                       </div>
  //                     }
  //                     label="Repeats Mon-Fri"
  //                     labelPlacement="start"
  //                   />
  //                 </RadioGroup>
  //               </FormControl>
  //             </Grid>
  //             {values.existingImages ? (
  //               <Grid item xs={10}>
  //                 <FormHelperText>
  //                   New uploads will overwrite the following image(s)
  //                 </FormHelperText>
  //                 <br />
  //                 <Carousel
  //                   autoPlay={false}
  //                   indicators={true}
  //                   navButtonsAlwaysVisible={true}
  //                   animation={"slide"}
  //                 >
  //                   {Object.entries(values.existingImages).map(([key, value]) => {
  //                     return (
  //                       <CardMedia
  //                         className={classes.media}
  //                         image={value || ""}
  //                         key={key}
  //                         title="image"
  //                       />
  //                     );
  //                   })}
  //                 </Carousel>
  //               </Grid>
  //             ) : (
  //               <div></div>
  //             )}
  //             <Grid item xs={10}>
  //               <FormHelperText> You may select up to 3 files</FormHelperText>
  //               <Dropzone onDrop={onDrop} accept={"image/*,video/*"} />
  //             </Grid>
  //             {imagesInState.map((val, index) => (
  //               <Grid item xs={3} key={`uploaded-image-${index}`}>
  //                 <Avatar
  //                   variant="square"
  //                   src={
  //                     imagesInState ? (val ? URL.createObjectURL(val) : "") : ""
  //                   }
  //                   className={classes.imagePreview}
  //                 ></Avatar>{" "}
  //                 <Button
  //                   className={"material-icons delete"}
  //                   onClick={() => handleRemoveFile(val.name)}
  //                 >
  //                   Remove file
  //                 </Button>
  //               </Grid>
  //             ))}
  //             {videosInState.map((val, index) => (
  //               <Grid item xs={3} key={`uploaded-image-${index}`}>
  //                 <Avatar
  //                   variant="square"
  //                   src={
  //                     videosInState ? (val ? URL.createObjectURL(val) : "") : ""
  //                   }
  //                   className={classes.imagePreview}
  //                 ></Avatar>{" "}
  //                 <Button
  //                   className={"material-icons delete"}
  //                   onClick={() => handleRemoveFile(val.name)}
  //                 >
  //                   Remove file
  //                 </Button>
  //               </Grid>
  //             ))}
  //             <Grid item xs={10}>
  //               <Button
  //                 // type="submit" //TODO: this or something similar is  needed for text field validation
  //                 // onSubmit={error ? "" : () => {}}s
  //                 fullWidth
  //                 // color="#b4a2ff"
  //                 onClick={(e) => {
  //                   // e.preventDefault();
  //                   validateForm();
  //                   if (!eventNameError && !eventDescriptionError) {
  //                     if (values.editingEvent) {
  //                       handleSubmit({
  //                         ...values,
  //                       });
  //                       if (
  //                         isEventSuccessfullyUpdatedDB &&
  //                         isEventSuccessfullyUpdatedFB
  //                       ) {
  //                         setDialogState(false); //close the dialog and then
  //                         pullOnSuccessfulUpdate();
  //                         setSuccessSnack(true);
  //                       } else {
  //                         // Do something else
  //                       }
  //                     } else {
  //                       // initial values for new Events
  //                       handleSubmit({
  //                         ...values,
  //                         goingnumber: 0,
  //                         isCanceled: false,
  //                         uniqueSeen: [],
  //                         categories: [],
  //                       });
  //                       // The logic for closing module state is placed outside this function becasue the values 'isEventSuccessfullyCreatedDB & FB'  are async and will update eventually rather than immediatelly, so we let react handle what should happen when the state changes
  //                     }
  //                   }
  //                 }}
  //               >
  //                 {loading ? (
  //                   <CircularProgress size={14} style={{ color: "white" }} />
  //                 ) : values.editingEvent ? (
  //                   "Update Event"
  //                 ) : (
  //                   "Create Event"
  //                 )}
  //               </Button>
  //               {!eventNameError && !eventDescriptionError ? (
  //                 <span></span>
  //               ) : (
  //                 <span className={classes.error}>
  //                   Please fix the highlighted issues to proceed
  //                 </span>
  //               )}
  //             </Grid>
  //           </Grid>
  //         </form>
  //         {/* Below is my make shift solution to using hooks in class components. the real solution would be to convert this whole fiel to a functional component */}
  //         <MakeshiftObserver
  //           value_1={isEventSuccessfullyCreatedFB}
  //           value_2={isEventSuccessfullyCreatedDB}
  //           didUpdate={onSuccess}
  //         />
  //         <MakeshiftObserver
  //           value_1={isEventSuccessfullyUpdatedFB}
  //           value_2={isEventSuccessfullyUpdatedDB}
  //           didUpdate={onSuccess}
  //         />
  //         <AnotherObserver
  //           value={filesInState}
  //           didUpdate={sendImagesAndVideosBack}
  //         />
  //       </div>
  //     );
  //   }
  // }
  // CreateEditEvent.propTypes = {
  //   values: PropTypes.object.isRequired,
  //   setDialogState: PropTypes.func.isRequired,
  //   handleChange: PropTypes.func.isRequired,
  //   handleChecked: PropTypes.func.isRequired,
  //   sendImagesAndVideosBack: PropTypes.func.isRequired,
  //   handleSubmit: PropTypes.func.isRequired,
  //   setSuccessSnack: PropTypes.func.isRequired,
  //   loading: PropTypes.bool,
  //   success: PropTypes.bool,
  //   error: PropTypes.bool,
  //   successAction: PropTypes.func,
  // };
  // function mapStateToProps(state) {
  //   return {
  //     isEventSuccessfullyUpdatedDB: state.events.isEventSuccessfullyUpdatedDB,
  //     isEventSuccessfullyUpdatedFB: state.events.isEventSuccessfullyUpdatedFB,
  //     isEventSuccessfullyCreatedDB: state.events.isEventSuccessfullyCreatedDB,
  //     isEventSuccessfullyCreatedFB: state.events.isEventSuccessfullyCreatedFB,
  //     errorUpdatingEventDB: state.events.errorUpdatingEventDB,
  //     errorUpdatingEventFB: state.events.errorUpdatingEventFB,
  //   };
  // }
  // export default withStyles(styles)(connect(mapStateToProps)(CreateEditEvent));
};

const userSignUpUserInterests = {
  /*
import {
  Grid,
  TextField,
  Typography,
  withStyles,
  Button,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { Formik } from "formik";
import React, { Component } from "react";
import * as Yup from "yup";

const styles = (theme) => ({
  encase: {
    // marginTop: 100,
    display: "flex",
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  inputField: {
    marginTop: 16,
    marginBottom: 8,
  },
});
class UserInterests extends Component {
  state = {
    rank: "",
  };
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };
  getTitles = (data) => {
    return data.map((e) => e.title).join(", ");
  };

  render() {
    const { rank, userSuggestions } = this.state;
    const { classes } = this.props;
    const { handleRank, values } = this.props;
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
    return (
      <div className={classes.encase}>
        <Typography component="h1" variant="h5">
          Tell us about your interests!
        </Typography>
        <Formik
          initialValues={{
            first_name: values.first_name,
            last_name: values.last_name,
            display_name: values.display_name,
            email: values.email,
            birthdate: values.birthdate,
            rank_prefer: values.rank_prefer,
            rank_weekend: values.rank_weekend,
            rank_quick_bite: values.rank_quick_bite,
            rank_eat_out: values.rank_eat_out,
            password: values.password,
          }}
          validationSchema={Yup.object({})}
        >
          {(formik) => (
            <from>
              <Autocomplete
                id="tags-main-interest"
                className={classes.inputField}
                multiple
                filterSelectedOptions
                limitTags={2}
                //   options={rank}
                options={placeHolderStaticPreferences}
                fullWidth
                onChange={(event, value) => {
                  if (value) {
                    // console.log(value);
                    // console.log(this.getTitles(value));
                    handleRank("rank_prefer", this.getTitles(value));
                    this.setState({
                      userPick: this.getTitles(value),
                    });
                  }
                }}
                getOptionLabel={(option) => option.title}
                getOptionSelected={(option, value) =>
                  option.title === value.title
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label={`I love ${values.rank_prefer}`}
                    placeholder="Categories"
                  />
                )}
              />
              <Autocomplete
                className={classes.inputField}
                id="tags-weekend-interests"
                //   options={rank}
                options={placeHolderStaticWeekend}
                multiple
                filterSelectedOptions
                limitTags={2}
                fullWidth
                onChange={(event, value) => {
                  if (value) {
                    handleRank("rank_weekend", this.getTitles(value));
                    this.setState({
                      userPick: this.getTitles(value),
                    });
                  }
                }}
                getOptionLabel={(option) => option.title}
                getOptionSelected={(option, value) =>
                  option.title === value.title
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label={`On Weekends ${values.rank_weekend}`}
                    placeholder="Categories"
                  />
                )}
              />
              <Autocomplete
                className={classes.inputField}
                id="tags-quick-bite"
                //   options={rank}
                options={placeHolderStaticQuickBite}
                multiple
                filterSelectedOptions
                limitTags={2}
                fullWidth
                onChange={(event, value) => {
                  if (value) {
                    handleRank("rank_quick_bite", this.getTitles(value));
                    this.setState({
                      userPick: this.getTitles(value),
                    });
                  }
                }}
                getOptionLabel={(option) => option.title}
                getOptionSelected={(option, value) =>
                  option.title === value.title
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label={`For a quick bite ${values.rank_quick_bite}`}
                    placeholder="Categories"
                  />
                )}
              />
              <Autocomplete
                className={classes.inputField}
                id="tags-eat-out"
                //   options={rank}
                options={placeHolderStaticEatOut}
                multiple
                filterSelectedOptions
                limitTags={2}
                fullWidth
                onChange={(event, value) => {
                  if (value) {
                    handleRank("rank_eat_out", this.getTitles(value));
                    this.setState({
                      userPick: this.getTitles(value),
                    });
                  }
                }}
                getOptionLabel={(option) => option.title}
                getOptionSelected={(option, value) =>
                  option.title === value.title
                }
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label={`Eating out  ${values.rank_eat_out}`}
                    placeholder="Categories"
                  />
                )}
              />
              <Grid container>
                <Grid item xs>
                  <Button
                    fullWidth
                    onClick={this.back}
                    variant="contained"
                    className={classes.button}
                  >
                    Back
                  </Button>
                </Grid>{" "}
                <Grid item xs={1}>
                  {" "}
                </Grid>{" "}
                <Grid item xs={7}>
                  <Button
                    color="secondary"
                    fullWidth
                    onClick={this.continue}
                    variant="contained"
                    className={classes.button}
                  >
                    Continue
                  </Button>
                </Grid>
              </Grid>
            </from>
          )}
        </Formik>
      </div>
    );
  }
}

export default withStyles(styles)(UserInterests);

    */
};

const userSignUpConfirm = {
  /**
   * import {
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  withStyles,
  Button,
  Box,
  Grid,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";
import React, { Component } from "react";

const styles = (theme) => ({
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
});

class Confirm extends Component {
  state = {
    showPassword: false,
    showConfirmPassword: false,
    confirmPassword: null,
  };

  back = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  handleInternalPassWord = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };

  render() {
    const { classes, signUpError, values } = this.props;
    const { handleChange } = this.props;
    const { showPassword, showConfirmPassword, confirmPassword } = this.state;
    const handleClickShowPassword = () => {
      this.setState({
        showPassword: !showPassword,
      });
    };
    const handleClickShowConfirmPassword = () => {
      this.setState({
        showConfirmPassword: !showConfirmPassword,
      });
    };
    const handleMouseDownPassword = () => {
      this.setState({
        showPassword: !showPassword,
      });
    };
    const handleMouseDownConfirmPassword = () => {
      this.setState({
        showConfirmPassword: !showConfirmPassword,
      });
    };
    const isBlank = (str) => {
      return !str || /^\s*$/.test(str);
    };

    const confirmPassError = (str1, str2) => {
      return !isBlank(str1) && !isBlank(str2) && str1 !== str2;
    };

    return (
      <div className={classes.encase}>
        <Typography component="span" variant="h5">
          Now for the finishing touches
        </Typography>
        <Typography component="span" variant="body2">
          <span className={classes.boldBoy}>Name:</span> {values.first_name}{" "}
          {values.last_name}
        </Typography>

        <Typography component="span" variant="body2">
          <span className={classes.boldBoy}>Email:</span> {values.email}
        </Typography>

        <Typography component="span" variant="body2">
          <span className={classes.boldBoy}>Birthdate:</span> {values.birthdate}
        </Typography>

        <Typography component="span" variant="body2">
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
        </Typography>

        <form style={{ width: "100%" }}>
          <TextField
            required={true}
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Password"
            id="password"
            type={showPassword ? "text" : "password"} // <-- This is where the magic happens
            onChange={handleChange("password")}
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
          <TextField
            required={true}
            variant="outlined"
            margin="normal"
            fullWidth
            error={confirmPassError(values.password, confirmPassword)}
            helperText={
              confirmPassError(values.password, confirmPassword)
                ? "Make sure the passwords match!"
                : ""
            }
            name="confrimpassword"
            label="Confirm Password"
            id="confirmpassword"
            type={showConfirmPassword ? "text" : "password"} // <-- This is where the magic happens
            onChange={(e) => {
              this.setState({ confirmPassword: e.target.value });
            }}
            InputProps={{
              // <-- This is where the toggle button is added.
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowConfirmPassword}
                    onMouseDown={handleMouseDownConfirmPassword}
                  >
                    {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </form>
        {signUpError && (
          <Typography component="p" className={classes.errorText}>
            Error Signing up.
          </Typography>
        )}
        <Grid container>
          <Grid item xs>
            <Button
              type="button"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={this.back}
            >
              back
            </Button>
          </Grid>
          <Grid item xs={1}></Grid>
          <Grid item xs={8}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.handleSubmit}
            >
              Sign Up
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(Confirm);

   */
};

const activeEvent = {
  /*
  import { Container, Typography } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import HorizontalEventCard from "../reusable/HorizontalEventCard";
import { pullAllSpecificBusinessUserActiveEvents } from "../../redux/actions";

const styles = (theme) => ({
  root: {
    margin: "3rem",
  },
  container: {
    padding: "0",
    // opacity: "0.1",
  },
});

class ActiveEvents extends Component {
  componentDidMount() {
    const { isUserABusiness, uid, dispatch } = this.props;
    console.log(
      "Component mounted, user is a business? ",
      isUserABusiness,
      uid
    );
    dispatch(pullAllSpecificBusinessUserActiveEvents(uid));

    if (isUserABusiness) {
      console.log("THIS STATEMENT IS A TEST");
    } else {
      //Check if auth user and user being viewed are friends
      // and if so, pull the userbeing viewed events
    }
  }

  render() {
    const { currUserEvents, userData } = this.props;
    const { classes } = this.props;
    return (
      <div>
        <Typography variant="button" component="span">
          Active Events
        </Typography>
        <Container className={classes.container}>
          {currUserEvents && currUserEvents.length > 0 ? (
            currUserEvents.map((item) => (
              <HorizontalEventCard
                item={item}
                classes={classes}
              ></HorizontalEventCard>
            ))
          ) : (
            <div>
              Looks like{" "}
              {userData.displayname
                ? userData.displayname
                : userData["business name"]
                ? userData["business name"]
                : "this user"}{" "}
              has nothing happenin{" "}
            </div>
          )}
        </Container>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isRetrievingEvents: state.events.isRetrievingEvents,
    currUserEvents: state.events.currUserEvents,
    authUserData: state.auth.userData,
    userData: state.user.userData,
    isUserABusiness: state.user.isUserABusiness,
  };
}

ActiveEvents.propTypes = {
  children: PropTypes.node,
  uid: PropTypes.any.isRequired,
};

export default withStyles(styles)(connect(mapStateToProps)(ActiveEvents));

  */
};
