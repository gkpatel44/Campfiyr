/* eslint-disable no-unused-vars */
import {
  Grid,
  IconButton,
  makeStyles,
  Slider,
  Tooltip,
  Typography,
  withStyles,
  Button,
} from "@material-ui/core";
import {
  Favorite,
  Fullscreen,
  Pause,
  PlayArrow,
  VolumeUp,
} from "@material-ui/icons";
import React from "react";
import PropTypes from "prop-types";

const useStyles = makeStyles({
  controlsWrapper: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    zIndex: 1,
  },

  controlIcons: {
    color: "#777",
    fontSize: 50,
    transform: "scale(0.9)",
    "&:hover": {
      color: "#fff",
      transform: "scale(1)",
    },
  },
  bottomIcons: {
    color: "#999",
    "&:hover": {
      color: "#fff",
    },
  },
  volumeSlider: {
    width: 100,
  },
});

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.number.isRequired,
};

const PrettoSlider = withStyles({
  root: {
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {
    left: "calc(-50% + 4px)",
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

export default function VideoPlayerControls() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  // eslint-disable-next-line no-unused-vars

  const handlePopover = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // eslint-disable-next-line no-unused-vars
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={classes.controlsWrapper}>
      {/* https://www.youtube.com/watch?v=r6qWEteVMyM */}
      {/* Top controls */}
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        style={{ padding: 16 }}
      >
        <Grid item>
          <Typography variant="h5" style={{ color: "#fff" }}>
            Title
          </Typography>
        </Grid>

        <Grid item>
          <Button variant="contained" color="primary" startIcon={<Favorite />}>
            Favorite
          </Button>
        </Grid>
      </Grid>

      {/* Middle Controls */}
      <Grid
        container
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <IconButton className={classes.controlIcons} aria-label="play">
          <PlayArrow fontSize="inherit " />
        </IconButton>
        <IconButton className={classes.controlIcons} aria-label="play">
          <Pause fontSize="inherit " />
        </IconButton>
      </Grid>

      {/* Bottom Controls */}
      <Grid
        container
        directio="row"
        justifyContent="space-between"
        alignItems="center"
        style={{ padding: 16 }}
      >
        <Grid item xs={12}>
          <PrettoSlider
            min={0}
            max={100}
            defaultValue={20}
            ValueLabelComponent={ValueLabelComponent}
          />
        </Grid>
        <Grid item>
          <Grid container alignItems="center" direction="row">
            <IconButton className={classes.bottomIcons}>
              <PlayArrow fontSize="large" />
            </IconButton>

            <IconButton className={classes.bottomIcons}>
              <VolumeUp fontSize="large" />
            </IconButton>

            <Slider
              min={0}
              max={100}
              defaultValue={100}
              className={classes.volumeSlider}
            />

            <Button variant="text" style={{ color: "#fff", marginLeft: 16 }}>
              <Typography>04:20</Typography>
            </Button>
          </Grid>
        </Grid>
        <Grid item>
          <IconButton className={classes.bottomIcons}>
            <Fullscreen fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </div>
  );
}
