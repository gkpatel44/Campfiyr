import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
// import PropTypes from "prop-types";
import ImageCard from "./ImageCard";
import about from "../util/about";
// import useWindowPosition from "../hook/useWindowPosition";
import { Waypoint } from "react-waypoint";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    // minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
    margin: "20px 0",
  },
}));

// class AboutHappenin extends Component
const AboutHappenin = () => {
  // render() {
  const classes = useStyles();
  // const { classes } = this.props;
  const [checked, setChecked] = useState(false);
  return (
    <div className={classes.root} id="aboutHappenin">
      <div>
        <Waypoint
          onEnter={() => {
            setChecked(true);
          }}
        >
          <div>
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={12}>
                <ImageCard item={about[0]} checked={checked} id={0} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <ImageCard item={about[1]} checked={checked} id={1} />
              </Grid>
            </Grid>
          </div>
        </Waypoint>
      </div>
    </div>
  );
  // }
};

// AboutHappenin.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default AboutHappenin;
