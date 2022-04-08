import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";

const styles = (theme) => ({
  cloudContainer: {
    // position: "fixed",
    // overflowX: "hidden",
  },
  cloudCircle: {
    width: "100px",
    height: "38px",
    borderRadius: "50%",
    filter: "url(#filter)",
    boxShadow: " 400px 375px 27px 6px #fff",
    position: "absolute",
    // overflow: "hidden",
    top: "-395px",
    left: "-45px",
  },
});

class CloudCircles extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.cloudContainer}>
        <div className={classes.cloudCircle}></div>
        <svg width="0" height="0" overflow="auto">
          <filter id="filter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency=".01"
              numOctaves="10"
            />
            <feDisplacementMap in="SourceGraphic" scale="180" />
          </filter>
        </svg>
      </div>
    );
  }
}

export default withStyles(styles)(CloudCircles);
