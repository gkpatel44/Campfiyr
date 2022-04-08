import { Button, Card, CardMedia, Grid, withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { pullAllAuthBusinessUserEvents } from "../../redux/actions/events";
import { connect } from "react-redux";
import VideoPlayerControls from "../reusable/VideoPlayerControls";
import ShellBoy from "./ShellBoy";

const styles = (theme) => ({
  // mapWindow: {
  //   width: "200px",
  //   height: "200px",
  // },
  media: {
    // position: "absolute",
    // top: 0,
    // left: 0,
    // width : "100%",
    // height: "100%",
  },
  videoContainer: {
    position: "relative",
    width: "100%",
    // height: 0,
    // paddingBottom: "56.25%",
  },
});

class RandomContent extends Component {
  componentDidMount() {
    navigator.geolocation.getCurrentPosition(function (position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }
  render() {
    const { match, dispatch, classes } = this.props;
    var video = "http://dl5.webmfiles.org/elephants-dream.webm";
    return (
      <div>
        HELLO THIS IS A TEST PAGE {match.params.uid}
        <Grid container>
          <Grid item xs={12} lg={4}>
            <Button
              onClick={(e) => {
                dispatch(pullAllAuthBusinessUserEvents());
              }}
            >
              oh yes the button needs text
            </Button>
            <ShellBoy />
          </Grid>
          <Grid item xs={11} lg={5}>
            {/* <AllEventsTabs /> */}
            {/* <MapsPlacesTest /> */}
          </Grid>
          <Grid item xs={11} lg={4}>
            {/* <VerticalEventCard item={specificEvent} /> */}
          </Grid>
          <Grid item xs={10} md={4} lg={6}>
            Hello
            <Card>
              {/* <CardActionArea> */}
              <div className={classes.videoContainer}>
                <CardMedia
                  component="video"
                  // className={classes.media}
                  image={video}
                  width={"100%"}
                  height={"100%"}
                  // autoPlay
                  controls
                />
                <VideoPlayerControls />
              </div>

              {/* </CardActionArea> */}
            </Card>
            {/* <CreateEditEvent
              setDialogState={() => {}}
              values={{}}
              handleChange={() => {}}
              handleChecked={() => {}}
              sendImagesBack={() => {}}
              handleSubmit={() => {}}
            /> */}
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isRetrievingEvent: state.events.isRetrievingEvent,
    specificEvent: state.events.specificEvent,
    userData: state.auth.userData,
    userType: state.auth.userType,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(RandomContent));
