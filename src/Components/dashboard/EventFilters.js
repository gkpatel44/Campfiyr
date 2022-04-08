import { makeStyles } from "@material-ui/core";
import PropTypes from "prop-types";
// MUI stuff
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Checkbox from "@material-ui/core/Checkbox";
import Slider from "@material-ui/core/Slider";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";

import React, { useEffect, useState } from "react";
import { getBusinessCategories } from "../../firebase/firebase";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "#383D43",
    borderRadius: "8px",
    color: "#FFFFFF",
    padding: "16px",
    "@media screen and (max-width: 640px)": {
      padding: "8px",
    },
  },
  txtField: {},
  padddingCheckBox: {
    // paddingLeft: 150,
    // alignSelf: "flex-end",
  },
  ctrlLabel: {
    textAlign: "left",
  },

  formControl: {
    "& .MuiSlider-root": {
      width: "92%",

      color: "#7950F3",
    },
    "& .MuiSelect-select.MuiSelect-select": {
      color: "#FFFFFF",
    },
    "& .MuiSelect-icon": {
      color: "#FFFFFF",
    },
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid #7950F3",
    },
    "& .MuiInput-underline:after": {
      borderBottom: "3px solid #7950F3",
    },
    "& .MuiFormControlLabel-root": {
      margin: 0,
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
    "& .MuiCheckbox-colorSecondary.Mui-checked": {
      color: "#586069",
    },
    "& .MuiCheckbox-root": {
      color: "#586069",
    },
  },
}));

function RenderCheckboxes(props) {
  const classes = useStyles();
  const { setChecked, checked, category, updateCategory } = props;
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <div
        style={{
          width: "100%",
          padding: "8px",
          background: "#292C31",
          borderRadius: "8px",
        }}
      >
        <FormControlLabel
          className={`${classes.formControlLabel} w-full flex justify-start items-center`}
          control={
            <Checkbox
              checked={checked[`${category}`]}
              onChange={(e) => {
                setChecked({ ...checked, [category]: e.target.checked });
                updateCategory(e.target.name, e.target.checked);
              }}
              name={`${category}`}
            />
          }
          label={`${category}`}
        />
      </div>
    </Grid>
  );
}

RenderCheckboxes.propTypes = {
  setChecked: PropTypes.func.isRequired,
  checked: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  updateCategory: PropTypes.func.isRequired,
};

function EventFilters(props) {
  const classes = useStyles();
  const { updateCategory, updateRange, updateLimitCount } = props;
  const [distanceRange, setDistanceRange] = useState(8);
  const [limit, setLimit] = useState(20);

  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState({});

  const valuetext = (value) => {
    return `${value} KM`;
  };

  useEffect(() => {
    (async () => {
      await getCats();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // dynamically pulls categories from Firestore storage
  const getCats = async () => {
    try {
      const cats = (await getBusinessCategories()) || [];
      // make 'Resturant' the first category by shifting its index after fetch
      var first = "Restaurants";
      cats.sort(function (x, y) {
        return x.id.includes(first) ? -1 : y.id.includes(first) ? 1 : 0;
      });

      setCategories(cats);
      cats.forEach((element, i) => {
        // do nothing.. used to do something before
        checked[`${element.id}`] = false;
      });
      // this.setState({ chipData: chips });
    } catch (error) {
      console.error(error.message);
    }
    return await getBusinessCategories();
  };

  return (
    // <Card className={`${classes.root}`} style={{ width: "300px" }}>
    <Card className={`${classes.root}`}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} className="w-full flex flex-start">
          <div className="text-xs">Filters</div>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <div
                style={{
                  width: "100%",
                  padding: "16px",
                  background: "#292C31",
                  borderRadius: "8px",
                }}
              >
                <FormControl
                  style={{ width: "100%" }}
                  component="fieldset"
                  className={classes.formControl}
                >
                  {/*<FormLabel component="legend">Range (KM)</FormLabel>*/}
                  <div className="text-xs text-white w-full">Range (Km)</div>

                  <Slider
                    defaultValue={8}
                    value={distanceRange}
                    min={0}
                    max={30}
                    step={0.5}
                    getAriaValueText={valuetext}
                    valueLabelDisplay="auto"
                    onChange={(e, val) => {
                      setDistanceRange(val);
                      updateRange(val);
                    }}
                    aria-labelledby="distance-range-slider"
                  />
                </FormControl>
              </div>
            </Grid>
            <Grid item xs={12} sm={6}>
              <div
                style={{
                  padding: "16px",
                  background: "#292C31",
                  borderRadius: "8px",
                }}
              >
                <FormControl
                  className={classes.formControl}
                  style={{ width: "84%" }}
                >
                  {/*<FormLabel component="legend">Limit</FormLabel>*/}
                  <div className="text-xs text-white">Limit</div>
                  <Select
                    labelId="demo-customized-select-label"
                    id="demo-customized-select"
                    value={limit}
                    onChange={(e) => {
                      setLimit(e.target.value);
                      updateLimitCount(e.target.value);
                    }}
                  >
                    {/* <MenuItem value="">
                <em>None</em>
              </MenuItem> */}
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={50}>50</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <FormControl
            component="fieldset"
            className={`${classes.formControl} w-full`}
          >
            {/*<FormLabel component="legend">Filter by Category</FormLabel>*/}
            <FormGroup className="w-full flex">
              <Grid container spacing={2} justifyContent="flex-start">
                {categories.map((cat, index) => {
                  return (
                    <RenderCheckboxes
                      category={cat?.id}
                      checked={checked}
                      key={index}
                      setChecked={setChecked}
                      updateCategory={updateCategory}
                    />
                  );
                })}
              </Grid>
            </FormGroup>
            <br />
          </FormControl>
        </Grid>
      </Grid>
    </Card>
  );
}

EventFilters.propTypes = {
  updateCategory: PropTypes.func.isRequired,
  updateRange: PropTypes.func.isRequired,
  updateLimitCount: PropTypes.func.isRequired,
};

export default EventFilters;
