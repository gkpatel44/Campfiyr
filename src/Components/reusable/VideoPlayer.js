import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import CardMedia from "@material-ui/core/CardMedia";
import VideoPlayerPlay from "./VideoPlayerPlay";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  videoContainer: {},
  media: {
    // width: "10rem",
    // height: "10rem",
    minHeight: "300px",
    minWidth: "200px",
    borderRadius: "8px",
    backgroundSize: "auto",
    "&:focus": {
      outline: "none",
    },
  },
}));

export default function VideoPlayer(props) {
  const classes = useStyles();
  const [videoPlaying, setVideoPlaying] = useState(false);
  const vidRef = useRef(null);
  const togglePlay = () => {
    vidRef.current && vidRef.current.play();
    setVideoPlaying(!videoPlaying);
  };
  const { videoSrc, key } = props;

  return (
    <div className={classes.videoContainer} key={`vid-container-${key}`}>
      <CardMedia
        // className={classes.media} // if you uncomment this, you 'force' aspect ratio and white borders
        className={classes.media}
        component="video"
        controls
        // src={value || ""}
        image={videoSrc || ""}
        key={key}
        title="image"
        onPause={() => {
          setVideoPlaying(false);
        }}
        // ref={(el) => (vidRef = el)}
        ref={vidRef}
      />
      {/* <Button onClick={togglePlay}>play/Pause</Button> */}
      <div hidden={videoPlaying}>
        <VideoPlayerPlay play={togglePlay} />
      </div>
    </div>
  );
}

VideoPlayer.propTypes = {
  videoSrc: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
};
