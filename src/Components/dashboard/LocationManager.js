import { Grid, withStyles, Card } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import MapContainer from "../Map/LocationManagerMapWindow";
import PlacesAutoComplete from "../reusable/PlacesAutoComplete";
import { CLEAR_LOCATION_EVENT_DATA } from "../../redux/types";
import PropTypes from "prop-types";

const styles = (theme) => ({
  root: {
    background: "#383D43",
    width: "300px",
    borderRadius: "8px",
    color: "#FFFFFF",
    padding: "10px",
    position: "relative",
    minHeight: "300px",
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
});

class LocationManager extends Component {
  state = {
    location: {
      // Default to Toronto
      lat: 43.6487,
      lng: -79.38544,
    },
    status: "Loading...",
    address: "",
  };
  componentDidMount() {
    if (navigator.geolocation) {
      // Request user precise bowser location
      navigator.geolocation.getCurrentPosition(
        this.showPosition,
        this.showError
      );
    } else {
      // if preceise broser location not provided,  update status message with error/ next steps
      this.setState({
        status:
          "Geolocation is not supported by this browser. Please enter a postal code",
      });
      //TODO: add fallback to ipaddress geomapping.
    }
  }
  /** Method triggered by broswers navigation API
   * Takes in position object and sets the value of latitude and longitude within component state
   * Component state.location is then passed as a prop down to the Map which re-renders on update
   *
   * @param {Object} position
   */
  showPosition = (position) => {
    if (typeof position?.coords?.latitude === "number") {
      this.handleLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }
  };

  /**Handles the possible array of errors thrown by the geolocation API
   *
   * @param {*} error
   */
  showError = (error) => {
    const { dispatch } = this.props;
    switch (error.code) {
      case error.PERMISSION_DENIED:
        dispatch(this.clearExistingLocationData());
        // Default to Toronto
        this.handleLocation(
          {
            lat: 43.6487,
            lng: -79.38544,
          },
          "Allow location access or enter a location"
        );

        break;
      case error.POSITION_UNAVAILABLE:
        dispatch(this.clearExistingLocationData());
        this.handleLocation(
          {
            lat: 43.6487,
            lng: -79.38544,
          },
          "Location information is unavailable. Please enter a postal code"
        );

        break;
      case error.TIMEOUT:
        dispatch(this.clearExistingLocationData());
        // Default to Toronto
        this.handleLocation(
          {
            lat: 43.6487,
            lng: -79.38544,
          },
          "The request to get your location timed out. Please enter a postal code"
        );

        break;
      case error.UNKNOWN_ERROR:
        dispatch(this.clearExistingLocationData());
        // Default to Toronto
        this.handleLocation(
          {
            lat: 43.6487,
            lng: -79.38544,
          },
          "Something went wrong. Please enter a postal code"
        );
        break;
      default:
        dispatch(this.clearExistingLocationData());
        // Default to Toronto
        this.handleLocation(
          {
            lat: 43.6487,
            lng: -79.38544,
          },
          "Please enter a postal code or allow location to continue!"
        );
    }
  };
  /** Method passed down to the PlacesAutoComplete component.
   *
   * The method is triggered onChange within the child component with param "Addy"
   * which represnts the human readable address autocompleted from google maps suggestions
   *
   * @param {String} addy
   */
  handleAddress = (addy) => {
    this.setState({ address: addy });
  };
  /**Two way method, sets the local state of LocationMaanager Component and
   * updates the parent of LocationManager through a required prop Function
   * called 'handleLocationUpdate'.
   *
   * Param 'loc' is an object containing the latitude and longitude values of
   * an entered human readable address
   *
   * @param {Object} loc
   */
  handleLocation = (loc, status) => {
    const { handleLocationUpdate } = this.props;
    this.setState({
      status: status || "You are currently viewing events in:",
      location: loc,
    });
    handleLocationUpdate(loc);
  };

  /**REDUX state management function
   *
   * @returns {Object}
   */
  clearExistingLocationData = () => {
    return {
      type: CLEAR_LOCATION_EVENT_DATA,
    };
  };

  render() {
    const { status, address, location } = this.state;
    const values = { address, location };
    const { formik, fieldName, classes } = this.props;
    return (
      //   <div style={{ height: "250px", width: "250px" }}>
      <Card
        className={classes.root}
        style={{ borderColor: "white", height: "100%" }}
      >
        <div
          style={{
            position: "absolute",
            top: "84px",
            right: "10px",
            bottom: "10px",
            left: "10px",
          }}
        >
          {/* dependency as script as part of usage of maps api call is part of react-google-map api so no 
          need to manually import it for place autocomplete api this causes inconsistancy */}
          <MapContainer location={location} />
        </div>
        <Grid container direction="column">
          <Grid item xs={12}>
            <Grid container direction="column">
              <Grid item xs={12}>
                {/* Status message auto updates based on errors / actions within the location Manager component */}
                <div className="text-xs mb-2">{status}</div>
              </Grid>
              <Grid item xs={12}>
                {/** PlacesAutoComplete component is a rather convoluted component taken from the materialui docs/samples
                 * The component receives optional props 'SyleProps' which i (Akin) used for minor styling. This can be expanded
                 * with the right knowledge of CSS, or overhauled entirely
                 *
                 * */}
                <PlacesAutoComplete
                  values={values}
                  handleAddress={this.handleAddress}
                  handleLocation={this.handleLocation}
                  styleProps={{
                    width: "100%",
                    // width: "200px",
                    // minWidth: "210px",
                  }}
                  formik={formik} //if provided, optional for form input validation
                  fieldName={fieldName} // if provided, works alongside formik
                />
              </Grid>
            </Grid>
          </Grid>
          {/*<Grid item xs={12}>*/}
          {/*  <MapContainer location={location} />*/}
          {/*</Grid>*/}
        </Grid>
      </Card>
    );
  }
}

LocationManager.propTypes = {
  handleLocationUpdate: PropTypes.func.isRequired,
  formik: PropTypes.object,
  fieldName: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    locationEvents: state.events.locationEvents,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(LocationManager));
