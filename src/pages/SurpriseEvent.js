import {
  CardMedia,
  Grid,
  withStyles,
  Snackbar,
  Button,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import NavBar from "../Components/NavBar";
import Carousel from "react-material-ui-carousel";
import { Room, Link as LinkIcon } from "@material-ui/icons";
import { cleanEventState, getSurpriseEventData } from "../redux/actions";
import { connect } from "react-redux";
import { Helmet } from "react-helmet";
import { FacebookShareButton, WhatsappShareButton } from "react-share";
import { EVENTNAME, EVENTDESCRIPTION } from "../util/keywords";
import { distanceInKM } from "../util/util";
import { useLocation } from "react-router";
import { Skeleton } from "@material-ui/lab";
import { Facebook, WhatsApp } from "@material-ui/icons";
//Helpers
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { compile } from "path-to-regexp";
import { useHistory } from "react-router-dom";
import { PLAY_STORE_URL, APP_STORE_URL } from "../constants/AppConstants";
import { ReactComponent as GooglePlayBadge } from "./assets/google-play-badge.svg";
import { ReactComponent as AppStoreBadge } from "./assets/app-store-badge.svg";
import { firebaseAnalytics } from "../firebase/firebase";

const styles = (theme) => ({
  media: {
    width: "100%",
    backgroundSize: "contain",
    height: 500,
    "@media (max-width: 600px)": {
      height: 300,
    },
  },
  eventCard: {
    display: "block",
    marginLeft: "auto",
    marginRight: "auto",
    minHeight: "500px",
    width: "auto",
    height: "auto",
  },
  carousel: {
    "& button:focus": {
      outline: "none",
    },
  },
  button: {
    background: "#7950F3",
    borderRadius: "8px",
    padding: "8px 16px",
    marginBottom: "10px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: "100%",

    "&.MuiSelect-icon": {
      color: "white",
    },
  },
  sectionBg: {
    padding: "16px",
    borderRadius: "8px",
    background: "#292C31",
    marginTop: "16px",
  },
});

const useQuery = (key) => {
  return new URLSearchParams(useLocation().search).get(key);
};

const SurpriseEvent = (props) => {
  const { classes, eventData } = props;
  const history = useHistory();
  const SURPRISE_EVENT_PATH =
    "/surpriseme?latitude=:latitude&longitude=:longitude&category=:category";
  const CURRENT_PAGE_PATH = window.location.href;
  const toSurpriseEventPath = compile(SURPRISE_EVENT_PATH);
  const [viewSnackBar, setViewSnackBar] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [position, setPosition] = useState({
    longitude: "-79.38544",
    latitude: "43.6487",
  });
  const [category, setCategory] = useState("Any");

  const [playing, isPlaying] = useState(false);
  const handleVideoPause = () => {
    isPlaying(!playing);
  };

  const { dispatch } = props;
  const latitude = useQuery("latitude");
  const longitude = useQuery("longitude");
  const catParam = useQuery("category");
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const success = (pos) => {
    setErrorMsg("Fetching event near by your location.");
    setViewSnackBar(true);
    let crd = pos.coords;
    dispatch(getSurpriseEventData(crd.latitude, crd.longitude, catParam));
  };
  const errors = (err) => {
    setErrorMsg("Please allow location access to view the events near you.");
    setViewSnackBar(true);
  };

  useEffect(() => {
    if (latitude && longitude) {
      setPosition({ longitude: longitude, latitude: latitude });
    }
    if (
      navigator.permissions &&
      navigator.permissions.query &&
      navigator.geolocation
    ) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            // If granted get the location from navigator instead of params
            navigator.geolocation.getCurrentPosition((position) => {
              let longitude = position.coords.longitude;
              let latitude = position.coords.latitude;
              dispatch(getSurpriseEventData(latitude, longitude, catParam));
            });
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors);
            dispatch(
              getSurpriseEventData(
                position.latitude,
                position.longitude,
                catParam
              )
            );
          } else if (result.state === "denied") {
            dispatch(
              getSurpriseEventData(
                position.latitude,
                position.longitude,
                catParam
              )
            );
          }
        });
    } else {
      /* Check for safari */
      dispatch(
        getSurpriseEventData(position.latitude, position.longitude, catParam)
      );
    }
    firebaseAnalytics.logEvent("page_surpriseEvent", {
      event_id: eventData?.eventId,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(cleanEventState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCloseSuccessSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setViewSnackBar(false);
  };

  const handleSurpriseEvent = () => {
    history.push(
      toSurpriseEventPath({
        latitude: position.latitude,
        longitude: position.longitude,
        category: category,
      })
    );
    window.location.reload();
  };

  return (
    <div style={{ background: "#292C31", minHeight: "100vh" }}>
      <Helmet>
        <title>
          {eventData && eventData["Event Name"]
            ? eventData["Event Name"] + " : Campfiyr"
            : "Event : Campfiyr"}
        </title>
      </Helmet>
      <NavBar />

      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={viewSnackBar}
        autoHideDuration={3000}
        message={errorMsg}
        onClose={handleCloseSuccessSnackbar}
      />
      <div className="w-full flex justify-center items-center py-20 xs:px-5 sm:px-20 md:px-48">
        <Grid
          container
          spacing={2}
          justifyContent="center"
          style={{
            background: "#383D43",
            borderRadius: "8px",
            padding: "20px",
            maxWidth: "1200px",
            position: "relative",
          }}
        >
          {eventData && eventData.isCanceled && (
            <>
              <div
                className="absolute z-10 top-0 right-0 bottom-0 left-0 bg-gray-700 opacity-75"
                style={{ borderRadius: "8px" }}
              />
              <div className="absolute z-20 top-0 right-0 bottom-0 left-0 flex flex-col justify-center items-center">
                <div
                  className="text-red-600 text-4xl font-archivoBlack tracking-widest"
                  style={{
                    textShadow:
                      "1px 0 white, 0 1px white, 1px 0 white, 0 1px white",
                  }}
                >
                  CANCELLED
                </div>
              </div>
            </>
          )}
          <Grid item xs={12} md={8}>
            <Grid
              container
              spacing={1}
              justifyContent="center"
              style={{ textAlign: "center" }}
            >
              <Grid item xs={5} md={4} style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  className={`${classes.button} focus:outline-none`}
                  size={"small"}
                  onClick={() => {
                    alert(
                      "Get a random local business to support on the Campfiyr app #supportlocal"
                    );
                  }}
                >
                  Surprise me challenge
                </Button>
              </Grid>
              <Grid item xs={7} md={8} style={{ textAlign: "center" }}>
                <div
                  className="text-xm"
                  style={{
                    color: "#FFFFFF",
                  }}
                >
                  <span>
                    Get a random local business to support on the Campfiyr app
                    <br />
                    #supportlocal
                  </span>
                </div>
              </Grid>
            </Grid>
            <div className={classes.sectionBg}>
              {eventData && eventData.images ? (
                <Carousel
                  style={{
                    borderRadius: "8px",
                  }}
                  className={classes.carousel}
                  autoPlay={false}
                  indicators={true}
                  // navButtonsAlwaysVisible={true}
                  animation={"slide"}
                  activeIndicatorIconButtonProps={{
                    style: {
                      color: "#7950F3",
                    },
                  }}
                >
                  {
                    // eslint-disable-next-line array-callback-return
                    Object.entries(eventData.images).map(([key, value]) => {
                      if (key.includes("image")) {
                        return (
                          <CardMedia
                            className={classes.media}
                            style={{ borderRadius: "8px" }}
                            image={value || ""}
                            key={key}
                            title="image"
                          />
                        );
                      } else if (key.includes("video")) {
                        return (
                          <div
                            className={classes.videoContainer}
                            key={`vid-container-${key}`}
                          >
                            <CardMedia
                              className={classes.media}
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
                          </div>
                        );
                      }
                    })
                  }
                </Carousel>
              ) : (
                <Skeleton animation="wave" height="20rem" width="100%" />
              )}
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <Grid
              item
              xs={12}
              md={12}
              className="flex justify-center items-center text-white"
            >
              <span
                className="font-archivoBlack text-xl xs:text-base text-center"
                style={{
                  padding: "8px 40px",
                  borderRadius: "8px",
                  background: "#292C31",
                }}
              >
                {eventData ? eventData[EVENTNAME] : "Loading ..."}{" "}
              </span>
              <span
                className="flex justify-center items-center text-base xs:mt-2"
                style={{ fontSize: "12px", marginLeft: "10px" }}
              >
                <Room
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "#7950F3",
                    margin: "0 5px 3px 0",
                  }}
                />
                {distanceInKM(eventData?.dbData?.distance, 1) || "-.-"}
                KM
              </span>
            </Grid>
            <Grid item xs={12} md={12}>
              <div
                className="text-xs"
                style={{
                  color: "#FFFFFF",
                  marginTop: "1.5rem",
                  textAlign: "center",
                }}
              >
                <span>
                  Share your results on social media and tag @campfiyr for a
                  chance to win $250 to a business of your choosing on the
                  Campfiyr app!
                  <br />
                  Challenge your friends for a bonus entry!
                </span>
              </div>
              <div className={classes.sectionBg}>
                <div className="font-bold mb-2" style={{ color: "#7950F3" }}>
                  Share
                </div>
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  style={{ textAlign: "center" }}
                >
                  <Grid item xs={4} md={4}>
                    <FacebookShareButton url={CURRENT_PAGE_PATH}>
                      <Facebook
                        style={{
                          width: "25px",
                          height: "25px",
                          color: "white",
                          cursor: "pointer",
                        }}
                      />
                    </FacebookShareButton>
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <WhatsappShareButton url={CURRENT_PAGE_PATH}>
                      <WhatsApp
                        style={{
                          width: "25px",
                          height: "25px",
                          color: "white",
                          cursor: "pointer",
                        }}
                      />
                    </WhatsappShareButton>
                  </Grid>
                  <Grid item xs={4} md={4}>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(CURRENT_PAGE_PATH);
                        setErrorMsg("Link copied to clipboard.");
                        setViewSnackBar(true);
                      }}
                    >
                      <LinkIcon
                        style={{
                          width: "25px",
                          height: "25px",
                          color: "white",
                          cursor: "pointer",
                        }}
                      />
                    </button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <div className={classes.sectionBg}>
              <div className="font-bold mb-2" style={{ color: "#7950F3" }}>
                Description
              </div>
              <div
                className="text-xs"
                style={{
                  background: "#383D43",
                  borderRadius: "8px",
                  padding: "8px",
                  color: "#FFFFFF",
                }}
              >
                {eventData ? eventData[EVENTDESCRIPTION] : "Loading ..."}
              </div>
            </div>
            <Grid item xs={12} md={12}>
              <div className={classes.sectionBg}>
                <div className="font-bold mb-2" style={{ color: "#7950F3" }}>
                  Surprise me
                </div>
                <Grid container spacing={2} justifyContent="space-between">
                  <Grid item xs={12} md={12}>
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel
                        id="demo-simple-select-outlined-label"
                        style={{ color: "white" }}
                      >
                        Select the category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={category}
                        onChange={handleChange}
                        label="Category"
                        style={{ color: "white" }}
                        si
                      >
                        <MenuItem value="Any">
                          <em>Any</em>
                        </MenuItem>
                        <MenuItem value={"Activity"}>Activity</MenuItem>
                        <MenuItem value={"Apparel and Accessories"}>
                          Apparel and Accessories
                        </MenuItem>
                        <MenuItem value={"Art and Decor"}>
                          Art and Decor
                        </MenuItem>
                        <MenuItem value={"Beauty"}>Beauty</MenuItem>
                        <MenuItem value={"Desserts and Treats"}>
                          Desserts and Treats
                        </MenuItem>
                        <MenuItem value={"Food Product"}>Food Product</MenuItem>
                        <MenuItem value={"Nightlife"}>Nightlife</MenuItem>
                        <MenuItem value={"Other"}>Other</MenuItem>
                        <MenuItem value={"Pet"}>Pet</MenuItem>
                        <MenuItem value={"Restaurants and Cafes"}>
                          Restaurants and Cafes
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      className={`${classes.button} focus:outline-none`}
                      size={"small"}
                      onClick={() => handleSurpriseEvent()}
                    >
                      Surprise me again
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid item xs={12} md={12} style={{ textAlign: "center" }}>
              <div
                className="text-xm"
                style={{
                  color: "#FFFFFF",
                }}
              >
                <span>
                  Find local promotions and hidden gem businesses in your
                  community.
                </span>
              </div>
            </Grid>
            <Grid item xs={12}>
              <div
                style={{ width: "100%", padding: "16px" }}
                className="w-full flex justify-center items-center"
              >
                <div className="mx-2 cursor-pointer">
                  <a
                    href={PLAY_STORE_URL}
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    <GooglePlayBadge />
                  </a>
                </div>
                <div className="mx-2 cursor-pointer">
                  <a
                    href={APP_STORE_URL}
                    target="_blank"
                    rel="noreferrer nofollow"
                  >
                    <AppStoreBadge />
                  </a>
                </div>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    eventData: {
      ...state.events.specificEventFB,
      dbData: { ...state.events.specificEventDB },
    },
  };
};

export default withStyles(styles)(connect(mapStateToProps)(SurpriseEvent));
