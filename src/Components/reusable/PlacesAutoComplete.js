import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { mapsPlacesApiKey } from "../../util/config";
import parse from "autosuggest-highlight/parse";
import throttle from "lodash/throttle";
import PropTypes from "prop-types";

const autocompleteService = { current: null };
const Geocoder = { current: null };

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
  customInput: {
    // marginBottom: "10px",
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

function loadScript(src, position, id) {
  if (!position) {
    return;
  }

  const script = document.createElement("script");
  script.setAttribute("async", "");
  script.setAttribute("id", id);
  script.src = src;
  position.appendChild(script);
}

function PlacesAutoComplete(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const [inputValue, setInputValue] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const [geoData, setGeoData] = React.useState(null);
  const loaded = React.useRef(false);
  const { handleLocation, formik, fieldName } = props;
  const { prevInput } = props;

  const getGeoData = async (place_id) => {
    var res = await Geocoder.current.geocode(
      { placeId: place_id },
      async function (place) {
        res = await place;
        console.log(res);
        setGeoData(res);
        return res;
      }
    );
    return res;
  };

  if (typeof window !== "undefined" && !loaded.current) {
    if (!document.querySelector("#google-maps")) {
      //has maps been manually loaded or has maps been added by some external library?
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${mapsPlacesApiKey}&libraries=places`,
        document.querySelector("head"),
        "google-maps"
      );
      console.log("maps was injected");
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    []
  );

  React.useEffect(() => {
    // console.log(!autocompleteService.current && window.google);
    // console.log(window.google);
    // console.log(autocompleteService.current);
    let active = true;

    if (!autocompleteService.current && window.google) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
      Geocoder.current = new window.google.maps.Geocoder();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  React.useEffect(() => {
    if (geoData === null) {
      return undefined;
    }
    console.log("Geodata was updated :", geoData);

    if (typeof geoData[0].geometry === "undefined") {
      return undefined;
    }
    console.log("Lattitude from geodata:", geoData[0].geometry.location.lat());
    console.log("Longitude from geodata:", geoData[0].geometry.location.lng());
    try {
      var location = {
        lat: geoData[0].geometry.location.lat(),
        lng: geoData[0].geometry.location.lng(),
      };
      handleLocation(location);
    } catch (err) {
      console.error(err);
    }
  }, [geoData, handleLocation]);

  return (
    <Autocomplete
      id="google-map-places-autocomplete"
      style={{ ...props.styleProps }}
      getOptionLabel={(option) =>
        typeof option === "string" ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        // setValue(newValue);
        if (newValue) {
          console.log(newValue);
          props.handleAddress(newValue.description); //because New Value contains alot of info from maps and we only need the " description" - readable address
          props.values.address = newValue.description;
          formik?.setFieldValue(fieldName, newValue.description); // validation where applicable, actual value may be over written by whatever the parent component requires from this child component
          setValue(props.values.address);
          getGeoData(newValue.place_id);
        }
      }}
      onOpen={formik?.handleBlur}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          className={classes.customInput}
          label={prevInput || "Address"}
          defaultValue={prevInput || ""}
          variant="outlined"
          fullWidth
          error={
            formik?.touched[`${fieldName}`] &&
            Boolean(formik?.errors[`${fieldName}`])
          }
          helperText={
            formik?.touched[`${fieldName}`] && formik?.errors[`${fieldName}`]
          }
        />
      )}
      renderOption={(option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings;
        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match) => [match.offset, match.offset + match.length])
        );

        return (
          <Grid container alignItems="center">
            <Grid item>
              <LocationOnIcon className={classes.icon} />
            </Grid>
            <Grid item xs>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{ fontWeight: part.highlight ? 700 : 400 }}
                >
                  {part.text}
                </span>
              ))}

              <Typography variant="body2" color="textSecondary">
                {option.structured_formatting.secondary_text}
              </Typography>
            </Grid>
          </Grid>
        );
      }}
    />
  );
}

PlacesAutoComplete.propTypes = {
  children: PropTypes.node,
  values: PropTypes.object.isRequired,
  styleProp: PropTypes.object,
  handleAddress: PropTypes.func.isRequired,
  handleLocation: PropTypes.func.isRequired, //not really required, just pass an empty function if you don't need lat lng data
  formik: PropTypes.object,
  fieldName: PropTypes.string,
  prevInput: PropTypes.string,
};

export default PlacesAutoComplete;
