import {
  Button,
  Grid,
  Typography,
  TextField,
  FormControl,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { updateProfile } from "../../redux/actions/auth";
import EditAvatar from "../auth/businessSignUp/EditAvatar";
import PlacesAutoComplete from "../reusable/PlacesAutoComplete";

const styles = (theme) => ({
  root: {
    minWidth: "20rem",
    padding: "16px",
  },
  textField: {
    background: "#292C31",
    borderRadius: "8px",
    "& .MuiInputBase-root": {
      color: "#ABABAB",
    },
    "& .MuiFilledInput-underline:before": {
      borderBottom: 0,
    },
    "& .MuiFilledInput-underline:after": {
      borderBottom: 0,
    },
    "& .MuiFormLabel-root.Mui-focused": {
      fontSize: "14px",
      color: "#ABABAB",
    },
    "& .MuiFormLabel-root": {
      color: "#ABABAB",
      fontSize: "14px",
    },
    "& .MuiInputLabel-filled.MuiInputLabel-shrink": {
      transform: "translate(12px, -5px) scale(0.75)",
    },
    "& .MuiFilledInput-input": {
      padding: "12px 12px 10px",
    },
    "& .MuiFilledInput-multiline": {
      padding: 0,
    },
    "& .MuiInputLabel-filled": {
      transform: "translate(12px, 15px) scale(1)",
    },
  },
  btnSave: {
    width: "100%",
    background: "#6661F2",
    borderRadius: "8px",
    "&:focus": {
      outline: "none",
    },
  },
});

export class QuickEditProfile extends Component {
  state = {
    image: null,
    "business name": this.props.userData["business name"],
    displayname: this.props.userData.displayname,
    bio: this.props.userData.bio || "",
    number: this.props.userData.number || "",
    website: this.props.userData.website || "",
    customLink: this.props.userData.customLink || "",
    location: this.props.userData.location || "",
    address: this.props.userData.address,
    coordlat: this.props.userData.coordlat,
    coordlong: this.props.userData.coordlong,
  };

  // Handle fields change
  handleChange = (input) => (e) => {
    this.setState({ [input]: e.target.value });
  };
  handleAddress = (addy) => {
    this.setState({ address: addy });
  };
  handleLocation = (loc) => {
    const { lat, lng } = loc;
    this.setState({
      coordlat: lat,
      coordlong: lng,
    });
  };

  render() {
    const { classes, userData, userType, setDialogState } = this.props;
    const { dispatch } = this.props;

    const {
      displayname,
      bio,
      number,
      website,
      customLink,
      image,
      location,
      address,
      coordlat,
      coordlong,
    } = this.state;
    const businessname = this.state["business name"];
    const businessChanges = {
      "business name": businessname,
      website,
      customLink,
      bio,
      number,
      address,
      coordlat,
      coordlong,
    };
    const clientChanges = { website, bio, displayname, location };
    const uploadProfileInfo = (allTheInfo) => {
      dispatch(updateProfile(userType, userData.uid, allTheInfo));
    };

    const collectImage = (image) => {
      this.setState({
        image,
      });
    };

    if (image) {
      businessChanges.image = image;
      clientChanges.image = image;
      // console.log(
      //   "IF STATEMENT Business Changes: ",
      //   businessChanges,
      //   "IF STATEMENT Client Changes: ",
      //   clientChanges
      // );
    }
    return (
      <div className={classes.root}>
        <Grid container spacing={2} direction="column" alignItems="center">
          <Grid
            item
            xs={12}
            className="w-full flex flex-col justify-center items-start"
          >
            <Typography component="h2">Edit Profile</Typography>
            <div className="w-full border-b border-gray-500 mt-2" />
          </Grid>
          <Grid
            item
            xs={12}
            className="w-full flex justify-center items-center"
          >
            <EditAvatar
              imageUrl={userData.photoURL || userData.imageDownloadURL}
              sendImageBack={collectImage}
            />
          </Grid>
          <Grid item xs={12} className="w-full">
            <TextField
              className={classes.textField}
              name={userType === "business" ? "business name" : "displayname"}
              variant="filled"
              label={userType === "business" ? "Business Name" : "Display Name"}
              value={displayname ? displayname : this.state["business name"]}
              // disabled={userType === "business"}
              // helperText={
              //   userType === "business"
              //     ? "Business Users must edit their name by contacting happenin support"
              //     : ""
              // }
              onChange={this.handleChange(
                userType === "business" ? "business name" : "displayname"
              )}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} className="w-full">
            <TextField
              className={classes.textField}
              name="bio"
              label="Bio"
              multiline
              variant="filled"
              value={bio}
              onChange={this.handleChange("bio")}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} className="w-full">
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={6}>
                {userType === "business" ? (
                  <FormControl
                    style={{ width: "100%" }}
                    // className={classes.customInput}
                    className={classes.textField}
                    variant="outlined"
                    required
                  >
                    {/* to add formik https://github.com/stackworx/formik-material-ui/issues/126 */}
                    <PlacesAutoComplete
                      values={{ address }}
                      handleAddress={this.handleAddress}
                      handleLocation={this.handleLocation}
                      styleProps={{
                        width: "100%",
                        minWidth: "210px",
                      }}
                      fieldName={"address"}
                      prevInput={`${address}`}
                    />
                  </FormControl>
                ) : (
                  <TextField
                    className={classes.textField}
                    name={"location"}
                    label={"Location"}
                    variant="filled"
                    value={location}
                    onChange={this.handleChange("location")}
                    fullWidth
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  className={classes.textField}
                  name="website"
                  label="Website"
                  variant="filled"
                  value={website}
                  onChange={this.handleChange("website")}
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
          {userType === "business" ? (
            <Grid item xs={12} className="w-full">
              <Grid container spacing={2} justifyContent="center">
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.textField}
                    name="customLink"
                    label="Custom Link"
                    variant="filled"
                    value={customLink}
                    onChange={this.handleChange("customLink")}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    className={classes.textField}
                    name="number"
                    label="Phone Number"
                    variant="filled"
                    value={number}
                    onChange={this.handleChange("number")}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>
          ) : null}
          <Grid item xs={12} sm={6} className="w-full">
            <Button
              className={classes.btnSave}
              color="primary"
              onClick={() => {
                userType === "business"
                  ? uploadProfileInfo(businessChanges)
                  : uploadProfileInfo(clientChanges);
                setDialogState(false);
                console.log("Attempted to close dialog");
              }}
              variant="contained"
            >
              Save
            </Button>
          </Grid>
        </Grid>
        {/*<Grid container spacing={2}>*/}
        {/*<Grid item xs={6}>*/}
        {/*  <Typography component="h2">Edit Profile</Typography>*/}
        {/*</Grid>*/}
        {/*  <Grid item xs={3}>*/}
        {/*    <Button*/}
        {/*      onClick={() => {*/}
        {/*        userType === "business"*/}
        {/*          ? uploadProfileInfo(businessChanges)*/}
        {/*          : uploadProfileInfo(clientChanges);*/}
        {/*        setDialogState(false);*/}
        {/*        console.log("Attempted to close dialog");*/}
        {/*      }}*/}
        {/*      variant="contained"*/}
        {/*    >*/}
        {/*      Save*/}
        {/*    </Button>*/}
        {/*  </Grid>*/}
        {/*</Grid>*/}
        {/*<Grid container spacing={2}>*/}
        {/*  <Grid item xs={6}>*/}
        {/*    <EditAvatar*/}
        {/*      imageUrl={userData.photoURL || userData.imageDownloadURL}*/}
        {/*      sendImageBack={collectImage}*/}
        {/*    />*/}
        {/*  </Grid>*/}
        {/*</Grid>*/}
        {/*<br />*/}
        {/*<Grid container spacing={2}>*/}
        {/*<Grid item xs={12}>*/}
        {/*<TextField*/}
        {/*  name={userType === "business" ? "business name" : "displayname"}*/}
        {/*  variant="filled"*/}
        {/*  label={userType === "business" ? "Business Name" : "Display Name"}*/}
        {/*  value={displayname ? displayname : this.state["business name"]}*/}
        {/*  // disabled={userType === "business"}*/}
        {/*  // helperText={*/}
        {/*  //   userType === "business"*/}
        {/*  //     ? "Business Users must edit their name by contacting happenin support"*/}
        {/*  //     : ""*/}
        {/*  // }*/}
        {/*  onChange={this.handleChange(*/}
        {/*    userType === "business" ? "business name" : "displayname"*/}
        {/*  )}*/}
        {/*  fullWidth*/}
        {/*/>*/}
        {/*</Grid>*/}
        {/*<Grid item xs={10}>*/}
        {/*  <TextField*/}
        {/*    name="bio"*/}
        {/*    label="Bio"*/}
        {/*    multiline*/}
        {/*    variant="filled"*/}
        {/*    value={bio}*/}
        {/*    onChange={this.handleChange("bio")}*/}
        {/*    fullWidth*/}
        {/*  ></TextField>*/}
        {/*</Grid>*/}
        {/*<Grid item xs={10}>*/}
        {/*  {userType === "business" ? (*/}
        {/*    <FormControl*/}
        {/*      style={{ width: "100%" }}*/}
        {/*      // className={classes.customInput}*/}
        {/*      className={classes.customInput}*/}
        {/*      variant="outlined"*/}
        {/*      required*/}
        {/*    >*/}
        {/*      /!* to add formik https://github.com/stackworx/formik-material-ui/issues/126 *!/*/}
        {/*      <PlacesAutoComplete*/}
        {/*        values={{ address }}*/}
        {/*        handleAddress={this.handleAddress}*/}
        {/*        handleLocation={this.handleLocation}*/}
        {/*        styleProps={{*/}
        {/*          width: "100%",*/}
        {/*          minWidth: "210px",*/}
        {/*        }}*/}
        {/*        fieldName={"address"}*/}
        {/*        prevInput={`${address}`}*/}
        {/*      />*/}
        {/*    </FormControl>*/}
        {/*  ) : (*/}
        {/*    <TextField*/}
        {/*      name={"location"}*/}
        {/*      label={"Location"}*/}
        {/*      variant="filled"*/}
        {/*      value={location}*/}
        {/*      onChange={this.handleChange("location")}*/}
        {/*      fullWidth*/}
        {/*    />*/}
        {/*  )}*/}
        {/*</Grid>*/}
        {/*<Grid item xs={10}>*/}
        {/*  <TextField*/}
        {/*    name="website"*/}
        {/*    label="Website"*/}
        {/*    variant="filled"*/}
        {/*    value={website}*/}
        {/*    onChange={this.handleChange("website")}*/}
        {/*    fullWidth*/}
        {/*  ></TextField>*/}
        {/*</Grid>*/}
        {/*<Grid item xs={10}>*/}
        {/*  {userType === "business" && (*/}
        {/*    <TextField*/}
        {/*      name="customLink"*/}
        {/*      label="Custom Link"*/}
        {/*      variant="filled"*/}
        {/*      value={customLink}*/}
        {/*      onChange={this.handleChange("customLink")}*/}
        {/*      fullWidth*/}
        {/*    />*/}
        {/*  )}*/}
        {/*</Grid>*/}
        {/*{userType === "business" ? (*/}
        {/*  <Grid item xs={10}>*/}
        {/*   <TextField*/}
        {/*   name="number"*/}
        {/*   label="Phone Number"*/}
        {/*   variant="filled"*/}
        {/*   value={number}*/}
        {/*   onChange={this.handleChange("number")}*/}
        {/*   fullWidth*/}
        {/*  ></TextField>*/}
        {/*  </Grid>*/}
        {/*) : (*/}
        {/*  <span></span>*/}
        {/*)}*/}
        {/*</Grid>*/}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    userData: state.auth.userData,
    userType: state.auth.userType,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(QuickEditProfile));
