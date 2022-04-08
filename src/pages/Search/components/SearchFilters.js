import { FormLabel, makeStyles } from "@material-ui/core";
import { FormControlLabel } from "@material-ui/core";
import { Radio } from "@material-ui/core";
import { RadioGroup } from "@material-ui/core";
import { FormControl } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import useQuery from "../../../hook/useQuery";

const useStyles = makeStyles((theme) => ({
  formControl: {
    "& .MuiSlider-root": {
      width: "92%",
      color: "#7950F3",
    },
    "& .MuiRadio-radio.MuiRadio-radio": {
      color: "#FFFFFF",
    },
    "& .MuiRadio-icon": {
      color: "#FFFFFF",
    },
    "& .MuiFormControlLabel-root": {
      margin: "4px",
      padding: "2px",
    },

    //added for radio button text
    "& .MuiFormLabel-root": {
      padding: "10px",
      color: "white",
    },
  },
  form: {
    "& .MuiFormControl-root": {
      width: "100%",
      color: "white",
    },
  },
  formControlLabel: {
    background: "#292C31",

    borderRadius: "8px",
    "& .MuiTypography-body1": {
      fontSize: "12px",
    },
    "&:hover": {
      color: "#ABABAB",
    },

    border: "1px solid transparent",
    "& .MuiRadio-colorSecondary.Mui-checked": {
      color: "#7950F3",
    },
    "& .MuiRadio-root": {
      color: "#7950F3",
    },
  },
}));

function SearchFilters(props) {
  const classes = useStyles();
  const [type, setType] = useState("all");
  let query = useQuery();
  const queryParam = query.get("q");
  const history = useHistory();
  let match = useRouteMatch("/search/:type");

  const handleChange = (event) => {
    const selected = event.target.value;
    setType(selected);
    history.push(`/search/${selected}?q=${String(queryParam).toLowerCase()}`);
  };
  useEffect(() => {
    setType(match.params.type);
    console.log(match.params.type);
  }, [match.params.type]);

  return (
    <div
      style={{
        width: "100%",
        padding: "8px",
        background: "#383D43",
        borderRadius: "8px",
      }}
    >
      <div className={classes.form}>
        <FormControl component="fieldset" className={`${classes.formControl}`}>
          <FormLabel component="h4">Filters</FormLabel>
          <RadioGroup
            aria-label="Search filters"
            name="searchFilters"
            value={type}
            onChange={handleChange}
          >
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="All"
              className={classes.formControlLabel}
            />
            <FormControlLabel
              value="people"
              control={<Radio />}
              label="People"
              className={`${classes.formControlLabel}`}
            />
            <FormControlLabel
              value="businesses"
              control={<Radio />}
              label="Businesses"
              className={`${classes.formControlLabel}`}
            />
          </RadioGroup>
        </FormControl>
      </div>
    </div>
  );
}

export default SearchFilters;
