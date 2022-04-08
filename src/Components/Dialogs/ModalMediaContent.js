import { React } from "react";
import Carousel from "react-material-ui-carousel";
import { CardMedia, withStyles } from "@material-ui/core";
import { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
const useStyles = makeStyles({
  media: {
    minHeight: "200px",
    borderRadius: "8px",
  },
  carousel: {
    "& button:focus": {
      outline: "none",
    },
    width: "100%",
    height: "100%",
    "text-align": "center",
  },
  rightSpace: {
    marginRight: 10,
  },
  cardMedia: {
    width: "100%",
    borderRadius: "8px",
    height: "30rem",
    backgroundSize: "contain",
  },
});

//Carousel for album
function ModalMediaContent(props) {
  const classes = useStyles();
  const gallery = props.content;
  const [playing, isPlaying] = useState(false);
  const handleVideoPause = () => {
    isPlaying(!playing);
  };

  return (
    <Carousel
      style={{
        paddingBottom: "5px",
        "button:focus": { outline: "none" },
      }}
      className={`${classes.carousel} pt-3 pr-3 pl-3`}
      autoPlay={false}
      indicators={true}
      animation={"slide"}
      activeIndicatorIconButtonProps={{
        style: {
          color: "#7950F3",
          "& button: focus": {
            outline: "none",
          },
        },
      }}
    >
      {gallery && gallery.length > 0 ? (
        gallery.map(({ key, value }, index) => {
          if (key.includes("video")) {
            return (
              <div key={key}>
                {
                  <CardMedia
                    className={classes.cardMedia} // if you uncomment this, you 'force' aspect ratio and white borders
                    component="video"
                    controls
                    image={value || ""}
                    key={key}
                    title="video"
                    onPause={() => {
                      handleVideoPause();
                    }}
                    autoPlay
                  />
                }
              </div>
            );
          } else {
            return (
              <CardMedia
                className={classes.cardMedia}
                image={value || ""}
                key={key}
                title="image"
              />
            );
          }
        })
      ) : (
        <Skeleton  variant="rect" className={classes.cardMedia} animation="wave" />
      )}
    </Carousel>
  );
}

export default withStyles(useStyles)(ModalMediaContent);
