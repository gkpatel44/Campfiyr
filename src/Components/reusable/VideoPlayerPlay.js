import { Grid, IconButton, makeStyles } from "@material-ui/core";
import { PlayArrow } from "@material-ui/icons";
import React from "react";

//https://codepen.io/Varo/pen/vLdvMK

const useStyles = makeStyles({
  controlsWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // background: "rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // zIndex: 1,
  },
  controlIcons: {
    color: "#777",
    fontSize: "10vh",
    transform: "scale(0.9)",
    "&:hover": {
      color: "#fff",
      transform: "scale(1)",
    },
    "&:focus": {
      outline: "none",
    },
    background: "rgba(0,0,0,.15)",
    backdropFilter: "blur(20px) saturate(1.5) brightness(1.2)",
    borderRadius: "100%",
    border: "none",
  },
  fancyPlay: {
    background: "rgba(0,0,0,.15)",
    backdropFilter: "blur(20px) saturate(1.5) brightness(1.2)",
    borderRadius: "100%",
    border: "none",
  },
});
export default function VideoPlayerPlay({ play }) {
  const classes = useStyles();

  return (
    <div className={classes.controlsWrapper}>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        style={{ padding: 16 }}
      ></Grid>
      <Grid
        container
        spacing={0}
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs>
          <IconButton
            className={classes.controlIcons}
            aria-label="play"
            onClick={play}
          >
            <PlayArrow fontSize="inherit" className={classes.fancyPlay} />
          </IconButton>
        </Grid>
      </Grid>
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        style={{ padding: 16 }}
      ></Grid>
    </div>
  );
}
