/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import PropTypes from "prop-types";

import Avatar from "@material-ui/core/Avatar";
import CardMedia from "@material-ui/core/CardMedia";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { useEffect } from "react";
import Dropzone from "../reusable/Dropzone";
import imageCompression from "browser-image-compression";
import Carousel from "react-material-ui-carousel";
import { akinsToLocalISOString } from "../../util/util";
import { connect } from "react-redux";
import {
  clearOnUpdateSuccessEvent,
  clearOnCreateSuccessEvent,
  enqueueSnackbar as enqueueSnackbarAction,
  closeSnackbar as closeSnackbarAction,
} from "../../redux/actions";
import LocationManager from "../dashboard/LocationManager";
import { capitalize, makeStyles, Tooltip } from "@material-ui/core";
import moment from "moment";
import SnackNotifier from "../SnackNotifier";
import VideoPlayer from "../reusable/VideoPlayer";

const useStyles = makeStyles((theme) => ({
  root: {
    // margin: "1.5rem",
    width: "100%",
    padding: "32px 16px",
    "@media screen and (max-width: 640px)": {
      padding: "8px",
    },
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "16px",
    "@media screen and (max-width: 640px)": {
      padding: 0,
    },
  },
  txtField: {
    width: "100%",
    fontSize: "12px",
    "& .MuiOutlinedInput-root": {
      background: "#383D43",
    },
    "& .MuiInputBase-root": {
      color: "#ABABAB",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ABABAB",
    },
    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#ABABAB",
    },
    "& .MuiOutlinedInput-input": {
      fontSize: "12px",
    },
    "& ::-webkit-calendar-picker-indicator": {
      filter: "invert(0.75)",
    },
  },
  radioField: {
    "& .MuiFormHelperText-root": {
      marginTop: 0,
      color: "#ABABAB",
      fontSize: "12px",
    },
    "& .MuiRadio-root": {
      color: "#ABABAB",
    },
    "& .MuiIconButton-colorSecondary": {
      color: "#6661F2",
    },
  },
  carousel: {
    "& button:focus": {
      outline: "none",
    },
  },
  padddingCheckBox: {
    // paddingLeft: 150,
    // alignSelf: "flex-end",
  },
  ctrlLabel: {
    textAlign: "left",
  },
  imagePreview: {
    width: "5em",
    height: "auto",
    borderRadius: "8px",
  },
  error: {
    color: "#f44336",
  },
  media: {
    height: 400,
    borderRadius: "8px",
    "@media screen and (max-width: 640px)": {
      height: "250px",
    },
  },
  button: {
    // marginTop: theme.spacing(5),
    background: "#6661F2",
    borderRadius: "8px",
    "&:focus": {
      outline: "none",
    },
  },
}));

const momentValidation = (endDateTime, startDateTime) => {
  return moment(endDateTime).isSameOrAfter(moment(startDateTime));
};
const validationSchema = yup.object({
  //  TODO: VALIDATION
  "Event Name": yup
    .string()
    .max(30)
    .required("Event name cannot be left blank"),
  "Event Description": yup
    .string()
    .max(150)
    .required("Event Description is required"),
  eventStartTime: yup.string().required("Start time cannot be empty"),
  eventEndTime: yup
    .string()
    .required("End time cannot be empty")
    .test("is-greater", "End time cannot be before start", function (value) {
      const { eventStartTime } = this.parent;
      return momentValidation(value, eventStartTime);
    }),
  // mediaFiles: yup.array().max(3),
  eventType: yup.string().required("Please select one"),
  chooseLocation: yup.string().required("Please select one"),
  location: yup
    .object()
    .shape({
      lat: yup
        .string()
        .min(3, "Invalid location")
        .required("Location cannot be empty"),
      lng: yup
        .string()
        .min(3, "Invalid location")
        .required("Location cannot be empty"),
    })
    .nullable()
    .required("Location cannot be empty"),
});
function CreateEditEvent(props) {
  const classes = useStyles();
  const { handleChange, values } = props;
  const { dispatch } = props;
  const {
    isEventSuccessfullyCreatedFB,
    isEventSuccessfullyCreatedDB,
    isEventSuccessfullyUpdatedFB,
    isEventSuccessfullyUpdatedDB,
    eventMsg,
    eventError,
  } = props;
  const {
    handleTimeChange,
    handleChecked,
    sendImagesAndVideosBack,
    handleSubmit,
    setDialogState,
    successAction,
  } = props;
  const { loading, userData } = props;
  // console.log("userData: ", userData);

  const MAX_UPLOAD_COUNT = 3;
  const [imagesInState, setImagesInState] = useState([]);
  const [videosInState, setVideosInState] = useState([]);
  const [filesInState, setFilesInState] = useState([]);
  const [previewSpinners, setPreviewSpinners] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [location, setLocation] = useState({});
  const [dispatchedErrors, setDispatchedErrors] = useState([]);
  const enqueueSnackbar = (...args) => dispatch(enqueueSnackbarAction(...args));
  const closeSnackbar = (...args) => dispatch(closeSnackbarAction(...args));

  /**This function is passed to the LocationManager component for receiving
   * uupdates on location change
   *
   * @param {Object} position
   */
  const handleLocationUpdate = (position) => {
    setLocation(position);
    handleChange("location", position);
    formik.setFieldValue("location", position);
    // props.values.location = position;
  };

  const setLocationToUserAddressLocation = () => {
    handleLocationUpdate({
      lat: parseFloat(userData.coordlat),
      lng: parseFloat(userData.coordlong),
    });
  };

  /**
   * Converts Firebase timestamp to JS date object
   * @returns {Date} result
   */
  const handleStripFirebaseTimestamp = (which) => {
    var milliseconds = 1000;
    if (values[`${which}`].seconds) {
      // if it is a firebase timestamp object
      var dateObj = new Date(values[`${which}`].seconds * milliseconds);
      var result = akinsToLocalISOString(dateObj);
      values[`${which}`] = result; // rewrite to the new string value
      return result;
    } else if (moment(values[`${which}`]).isValid()) {
      //  if its already a date / been converted
      return values[`${which}`];
    }
  };

  /**
   * Converts epoch / unix time value to JS date object
   * @returns {Date} dateObj
   */
  const generateDateObjForRepeatingEvent = (slicedTime) => {
    var midnight = new Date(new Date().setHours(0, 0, 0, 0));
    var dateObj = new Date((midnight.valueOf() / 1000 + slicedTime) * 1000);

    return dateObj;
  };

  const generateTimeLabel = (eventType, startOrEnd) => {
    var saidLabel = "";
    var startDate =
      values && typeof values["Start time"] == "string"
        ? values["Start time"].split("T")[0]
        : "";
    var startTime =
      values && typeof values["Start time"] == "string"
        ? values["Start time"].split("T")[1]
        : "";
    var endDate =
      values && typeof values["End time"] == "string"
        ? values["End time"].split("T")[0]
        : "";
    var endTime =
      values && typeof values["End time"] == "string"
        ? values["End time"].split("T")[1]
        : "";
    switch (eventType) {
      case "oneTimeEvent":
        if (startOrEnd === "start") {
          saidLabel = "Event Start";
        } else if (startOrEnd === "end") {
          saidLabel = "Event End";
        }
        return saidLabel;
      case "Daily":
        if (startOrEnd === "start") {
          saidLabel = `Everyday Starting at ${startTime}`;
        } else if (startOrEnd === "end") {
          saidLabel = `Everyday Ending at ${endTime}`;
        }
        return saidLabel;
      case "Weekly":
        var dayAsString = "";
        if (startOrEnd === "start") {
          dayAsString = moment(startDate).format("dddd");
          saidLabel = `${dayAsString}s Starting at ${startTime}`;
        } else if (startOrEnd === "end") {
          dayAsString = moment(endDate).format("dddd");
          saidLabel = `${dayAsString}s Ending at ${endTime}`;
        }
        return saidLabel;
      case "Weekend":
        if (startOrEnd === "start") {
          saidLabel = `Weekends Starting at ${startTime}`;
        } else if (startOrEnd === "end") {
          saidLabel = `Weekends Ending at ${endTime}`;
        }
        return saidLabel;
      case "Weekday":
        if (startOrEnd === "start") {
          saidLabel = `Weekdays Starting at ${startTime}`;
        } else if (startOrEnd === "end") {
          saidLabel = `Weekdays Ending at ${endTime}`;
        }
        return saidLabel;

      default:
        return startOrEnd === "start" ? "Event Start" : "Event End";
    }
  };
  useEffect(() => {
    if (
      (isEventSuccessfullyCreatedFB && isEventSuccessfullyCreatedDB) ||
      (isEventSuccessfullyUpdatedFB && isEventSuccessfullyUpdatedDB)
    ) {
      console.log("EVENT CREATED IN DB AND FB ");
      setDialogState(false); //close the dialog and then
      console.log("this is the one being triggered!");
      triggerSnack(eventMsg, "success", "Dismiss");
      if (values.editingEvent) {
        dispatch(clearOnUpdateSuccessEvent());
        successAction(); // pull the updated info and display wherever relevant
      } else {
        // not editing an event
        dispatch(clearOnCreateSuccessEvent());
        successAction(); //redirect to the newly created event
        console.log("Redirecting to event page!");
      }
    } else if (
      eventError &&
      typeof eventError === "object" &&
      eventError.error &&
      eventError.key &&
      !dispatchedErrors.includes(eventError.key)
    ) {
      setDispatchedErrors([...dispatchedErrors, eventError.key]);
      triggerSnack(eventError.error, "error", "Dismiss");
    }
  }, [
    isEventSuccessfullyCreatedFB,
    isEventSuccessfullyCreatedDB,
    isEventSuccessfullyUpdatedFB,
    isEventSuccessfullyUpdatedDB,
    props,
  ]);

  useEffect(() => {
    sendImagesAndVideosBack(filesInState);
    console.log("Image was sent back to parent component");
    console.log("Files in state", filesInState);
  }, [filesInState]);

  /**
   * Handles behavior of drag and drop module.
   * Compresses images for upload, extracts cover images from videos,
   * and manages file previews and state mamangement
   * spread operator [...variable] is used to force react to notice changes in state files.
   * @param {Array} acceptedFiles
   * TODO: clean this method up, stop repeating yourself
   * FIXME: method is also a bit broken
   */
  const onDrop = (acceptedFiles) => {
    // this callback will be called after files get dropped, we will get the acceptedFiles. If you want, you can even access the rejected files too

    console.log(acceptedFiles);

    const compressImage = async (image) => {
      console.log(image);
      const options = {
        maxSizeMB: 0.4,
        maxWidthOrHeight: 1000,
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(image, options);
        return compressedFile;
      } catch (error) {
        console.log("Error during image compression: ", error);
      }
    };

    // const updateImageFileState = async (file) => {
    //   setFilesInState([...filesInState, file]);
    //   setImagesInState([...imagesInState, file]);
    // };
    // const updateVideoFileState = async (file) => {
    //   setFilesInState([...filesInState, file]);
    //   setVideosInState([...videosInState, file]);
    // };

    if (acceptedFiles.length > MAX_UPLOAD_COUNT) {
      alert(
        "You are only allowed to upload a maximum of 3 images for an event"
      );
      // at this point, display spinners for the number of files dropped
      // and hide them once they are done processing
      setPreviewSpinners(MAX_UPLOAD_COUNT);
      let allFiles = [];
      let images = [];
      let videosArr = [];
      for (var i = 0; i < MAX_UPLOAD_COUNT; i++) {
        if (acceptedFiles[i] && acceptedFiles[i].type.includes("image")) {
          compressImage(acceptedFiles[i]).then((compressedImageFile) => {
            console.log(compressedImageFile);

            // images.push(compressedImageFile);
            // allFiles.push(compressedImageFile);

            // imagesinState is used for keeping track of uploads AND for displaying previews
            if (allFiles.length + filesInState.length <= MAX_UPLOAD_COUNT) {
              images.push(compressedImageFile);
              allFiles.push(compressedImageFile);
              setPreviewSpinners(previewSpinners - allFiles.length);
              setImagesInState([...imagesInState, ...images]);
              setFilesInState([...filesInState, ...allFiles]);
              console.log(
                `Total files are under or equal to ${MAX_UPLOAD_COUNT}. Actual value is `,
                allFiles.length + filesInState.length
              );
              // console.log("allfiles array:", allFiles);
              // console.log("filesInState: ", filesInState);
            } else {
              setPreviewSpinners(
                allFiles.length + filesInState.length - MAX_UPLOAD_COUNT
              );
              allFiles.length = 0; // clear the array, works strangely enough
              images.length = 0;
              setVideosInState([]); // empty videos in state as well
              allFiles.push(compressedImageFile);
              images.push(compressedImageFile);
              console.log(
                `total files is greater than ${MAX_UPLOAD_COUNT}, removing oldest. Current allFiles length is`,
                allFiles.length
              );
              setImagesInState([...images]);
              setFilesInState([...allFiles]);
            }
          });
        } else if (acceptedFiles[i].type.includes("video")) {
          const currentFile = acceptedFiles[i];
          try {
            // get the frame at 0 seconds of the video file
            getVideoCover(acceptedFiles[i], 0)
              .then((cover) => {
                console.log(cover);
                const coverAsFile = new File([cover], currentFile.name);
                console.log(coverAsFile);

                // print out the result image blob
                if (allFiles.length + filesInState.length <= MAX_UPLOAD_COUNT) {
                  videosArr.push(coverAsFile);
                  allFiles.push(currentFile);
                  setPreviewSpinners(previewSpinners - allFiles.length);

                  setVideosInState([...videosInState, ...videosArr]);
                  setFilesInState([...filesInState, ...allFiles]);
                } else {
                  setPreviewSpinners(
                    allFiles.length + filesInState.length - MAX_UPLOAD_COUNT
                  );
                  allFiles.length = 0; // clear the array
                  videosArr.length = 0;
                  allFiles.push(currentFile);
                  videosArr.push(coverAsFile);
                  setImagesInState([]); // empty images in state
                  setVideosInState([...videosArr]);
                  setFilesInState([...allFiles]);
                }
              })
              .catch((err) => {
                console.log("ERROR getting image thumbnail: ", err);
              });
          } catch (ex) {
            console.log("ERROR getting image thumbnail: ", ex);
          }
        }
      }
      console.log(images);
      // ensure all images and videos are being stored
    } else {
      //files selected are less than maximum allowed files
      let allFiles = [];
      let images = [];
      let videosArr = [];
      setPreviewSpinners(acceptedFiles.length);
      for (var x = 0; x < acceptedFiles.length; x++) {
        if (acceptedFiles[x] && acceptedFiles[x].type.includes("image")) {
          compressImage(acceptedFiles[x]).then((compressedImageFile) => {
            if (allFiles.length + filesInState.length < MAX_UPLOAD_COUNT) {
              // console.log(compressedImageFile);
              images.push(compressedImageFile);
              allFiles.push(compressedImageFile);
              setPreviewSpinners(previewSpinners - allFiles.length);

              // console.warn("fileInstate Before insert", filesInState);
              setImagesInState([...imagesInState, ...images]);
              setFilesInState([...filesInState, ...allFiles]);
              // console.warn("fileInstate After insert", filesInState);
              // console.log(
              //   "Total files are under or equal to 3. Actual value is ",
              //   allFiles.length + filesInState.length
              // );
              // console.log("allfiles array:", allFiles);
              // console.log("filesInState: ", filesInState);
            } else {
              setPreviewSpinners(
                allFiles.length + filesInState.length - MAX_UPLOAD_COUNT
              );
              allFiles.length = 0; // clear the array, works strangely enough
              images.length = 0;
              setVideosInState([]); // empty videos in state as well
              allFiles.push(compressedImageFile);
              images.push(compressedImageFile);
              console.log(
                `total files is greater than ${MAX_UPLOAD_COUNT}, removing oldest. Current allFiles length is`,
                allFiles.length
              );
              setImagesInState([...images]);
              setFilesInState([...allFiles]);
            }
          });
        } else if (
          acceptedFiles[x] &&
          acceptedFiles[x].type.includes("video")
        ) {
          // Below code is for displaying a thumbnail for an uploaded video
          console.log("there is a video");
          const currentFile = acceptedFiles[x];
          try {
            // get the frame at 0 seconds of the video file
            getVideoCover(currentFile, 0)
              .then((cover) => {
                // print out the result image blob
                console.log(cover);
                const coverAsFile = new File([cover], currentFile.name);
                console.log(coverAsFile);

                if (allFiles.length + filesInState.length < MAX_UPLOAD_COUNT) {
                  setPreviewSpinners(previewSpinners - allFiles.length);
                  allFiles.push(currentFile);
                  videosArr.push(coverAsFile);
                  setFilesInState([...filesInState, ...allFiles]);
                  setVideosInState([...videosInState, ...videosArr]);
                } else {
                  setPreviewSpinners(
                    allFiles.length + filesInState.length - MAX_UPLOAD_COUNT
                  );
                  allFiles.length = 0; // clear the array
                  videosArr.length = 0; // not really neccessary since imagesinState are emptied out below
                  allFiles.push(currentFile);
                  videosArr.push(coverAsFile);
                  setImagesInState([]); // empty images array
                  setVideosInState([...videosArr]); // reset to only contain current video cover
                  setFilesInState([...allFiles]);
                }
              })
              .catch((err) => {
                console.log("ERROR getting image thumbnail: ", err);
              });
          } catch (ex) {
            console.log("ERROR getting image thumbnail: ", ex);
          }
        }
        console.log(images);
      }
    }
  };

  /**
   * Taken from Stack overflow https://stackoverflow.com/a/63474748/6100818
   * captures thumbnail
   * @param {File} file video file to capture image from
   * @param {Number} seekTo Destination to capture screencap from, defaults to 0.0 if unspecified
   * @returns
   */
  function getVideoCover(file, seekTo = 0.0) {
    console.log("getting video cover for file: ", file);
    return new Promise((resolve, reject) => {
      // load the file to a video player
      const videoPlayer = document.createElement("video");
      videoPlayer.setAttribute("src", URL.createObjectURL(file));
      videoPlayer.load();
      videoPlayer.addEventListener("error", (ex) => {
        reject("error when loading video file", ex);
      });
      // load metadata of the video to get video duration and dimensions
      videoPlayer.addEventListener("loadedmetadata", () => {
        // seek to user defined timestamp (in seconds) if possible
        if (videoPlayer.duration < seekTo) {
          reject("video is too short.");
          return;
        }
        // delay seeking or else 'seeked' event won't fire on Safari
        setTimeout(() => {
          videoPlayer.currentTime = seekTo;
        }, 200);
        // extract video thumbnail once seeking is complete
        videoPlayer.addEventListener("seeked", () => {
          console.log("video is now paused at %ss.", seekTo);
          // define a canvas to have the same dimension as the video
          const canvas = document.createElement("canvas");
          canvas.width = videoPlayer.videoWidth;
          canvas.height = videoPlayer.videoHeight;
          // draw the video frame to canvas
          const ctx = canvas.getContext("2d");
          ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
          // return the canvas image as a blob
          ctx.canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            "image/jpeg",
            0.75 /* quality */
          );
        });
      });
    });
  }

  /**
   * render/spinner ... renders spinners
   *  Variable 'previewSpinner' is an int stored in state. it is updaed by the 'onDrop' method
   *  when new items are dropped, the spinner count is updated and a spinner is redered
   *  to entertain users before image preview is done processing.
   * @returns array containing JSX elements to render spindder
   */
  const renderSpinners = () => {
    const daSpinners = [];
    for (let index = 0; index < previewSpinners; index++) {
      daSpinners.push(
        <Grid item xs={4} key={`preveiew-loading-${index}`}>
          <CircularProgress size={50} style={{ color: "#b4a2ff" }} />
        </Grid>
      );
    }
    return daSpinners;
  };

  const handleRemoveImageFile = (fileName) => {
    var updatedFiles = [];
    for (let file of imagesInState) {
      console.log(file);
      console.log(file.name);
      file.name !== fileName && updatedFiles.push(file); // Add only file name not matched files
    }
    setImagesInState(updatedFiles);
    setFilesInState([...updatedFiles, ...videosInState]);
  };

  const handleRemoveVideoFile = (fileName) => {
    var coverImages = [];
    var actualFiles = [];
    // removing videos is a bit more complicated because 'videosInState'
    // actually only stores the cover photo of the video and not the actual video
    // so we update the cover (videosInState)
    for (let file of videosInState) {
      console.log(file);
      console.log(file.name);
      file.name !== fileName && coverImages.push(file); // Add only file name not matched files
    }
    // and then we update/remove the actual file (filesinState)
    for (let file of filesInState) {
      file.name !== fileName && actualFiles.push(file); // Add only file name not matched files
    }
    setVideosInState(coverImages);
    setFilesInState([...actualFiles]);
  };

  const eventTypeDisabled = () => {
    return values.editingEvent && values.repeats // if a editing repeating event, enable based on repeating event time values
      ? !(values["start time"] && values["end time"])
      : !(values["Start time"] && values["End time"]);
  };

  /** This method is strictly for repopulating the correct event times when editing
   * repeating events. Param 'lowerCaseEndORStart' must either be
   * 'start time' or 'end time' and NOT 'Start time' and 'End time'
   *
   * @param {String} lowerCaseEndORStart
   * @returns {String} Date Represented As ISO String
   */
  const repopulateRepeatingTime = (lowerCaseEndOrStart) => {
    return values[lowerCaseEndOrStart]
      ? akinsToLocalISOString(
          generateDateObjForRepeatingEvent(values[lowerCaseEndOrStart])
        )
      : "";
  };

  /** This method is strictly for repopulating the correct event times when editing
   * NON-repeating events. Param 'upperCaseEndOrStart' must be one of
   * 'Start time' and 'End time' and NOT 'start time' or 'end time'
   *
   * @param {String} upperCaseEndOrStart
   * @returns {String} Date respresnted as AISO String
   */
  const repopulateStandardTime = (upperCaseEndOrStart) => {
    return values[upperCaseEndOrStart]
      ? handleStripFirebaseTimestamp(upperCaseEndOrStart)
      : "";
  };

  /** Helper function for repopulating event times into event form and formik.
   *  Based on application-wide state, it automatically capitalizes ( or not) the first
   *  letter of the input 'which' whose posibble values are 'start' and 'end'
   *
   * This ensures compliance with {@link repopulateStandardTime} and {@link repopulateRepeatingTime} functions
   *
   * @param {String} which
   * @returns {String} If successful, a date represented as ISO Sring OR an empty string ""
   */
  const repopulateTime = (which) => {
    return values.editingEvent && values.repeats
      ? repopulateRepeatingTime(`${which} time`) // if editing a repeating event,
      : repopulateStandardTime(`${capitalize(which)} time`); // otherwise
  };

  /**
   *
   * @param {String} msg
   * @param {String} variant
   * @param {String} dismissMsg
   */
  const triggerSnack = (msg, variant, dismissMsg, key) => {
    enqueueSnackbar({
      message: msg,
      options: {
        key: key || new Date().getTime() + Math.random(),
        variant: variant,
        preventDuplicate: true,
        action: (key) => (
          <Button onClick={() => closeSnackbar(key)}>{dismissMsg}</Button>
        ),
      },
    });
  };
  const formik = useFormik({
    initialValues: {
      //pain -.-String
      "Event Name": values["Event Name"] || "",
      "Event Description": values["Event Description"] || "",
      eventStartTime: repopulateTime("start") || "",
      eventEndTime: repopulateTime("end") || "",
      eventType: values.eventType || "",
      chooseLocation: values.chooseLocation || "",
      location: values.location || null,
      // mediaFiles: values.existingImages
      //   ? Object.entries(values.existingImages)
      //   : [], //MEdia validation is currently not in use, honestly might be pointless
    },
    validationSchema: validationSchema,
    onSubmit: (formValues) => {
      // We don't want to send back the form values this way because we have other
      // functions handling it already (They handle reshaping data to fit firebase schema)
      // handleUpdateState(formValues);

      // alert(JSON.stringify(formValues, null, 2));

      if (values.editingEvent) {
        handleSubmit({
          ...values,
        });
        if (isEventSuccessfullyUpdatedDB && isEventSuccessfullyUpdatedFB) {
          //This never executes since js isn't synchronous, the useEffect method handles the closing and updating instead
          setDialogState(false); //close the dialog and then
          successAction();
        } else {
          // Do something else
          // triggerSnack(eventError, "error", "Dismiss", eventError); // pass in Event Error as key
        }
      } else {
        // initial values for new Events
        handleSubmit({
          ...values,
          goingnumber: 0,
          isCanceled: false,
          uniqueSeen: [],
          category: userData?.category_array[0], // autopopulate event category with the main category the user specified when creating their account. see redux/actions/events.refactorForDBsubmit
        });
        // The logic for closing module state is placed outside this function becasue the values 'isEventSuccessfullyCreatedDB & FB'  are async and will update eventually rather than immediatelly, so we let react handle what should happen when the state changes
      }
    },
  });

  return (
    <div className={classes.root}>
      <SnackNotifier />
      <form onSubmit={formik.handleSubmit} className={classes.form}>
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          style={{ width: "100%" }}
        >
          <Grid item xs={12} className="w-full">
            <div
              style={{
                width: "100%",
                padding: "16px",
                background: "#292C31",
                borderRadius: "8px",
              }}
            >
              <Grid
                container
                direction="column"
                spacing={2}
                alignItems="center"
                className="w-full"
              >
                <Grid item xs={12} className="w-full">
                  <FormControl
                    fullWidth
                    className={classes.txtField}
                    required
                    disabled={loading}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <label htmlFor="Event Name"> Event Name </label>
                      <FormHelperText style={{ color: "#ABABAB" }}>
                        {values["Event Name"].length}/30
                      </FormHelperText>
                    </div>
                    <TextField
                      value={formik.values["Event Name"]}
                      onChange={(e) => {
                        formik.setFieldValue("Event Name", e.target.value);
                        handleChange("Event Name", e.target.value);
                      }}
                      name="eventName"
                      variant="outlined"
                      helperText={
                        formik.touched["Event Name"] &&
                        formik.errors["Event Name"]
                      }
                      error={
                        formik.touched["Event Name"] &&
                        Boolean(formik.errors["Event Name"])
                      }
                      inputProps={{ maxLength: 30 }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} className="w-full">
                  <FormControl
                    fullWidth
                    required
                    disabled={loading}
                    className={classes.txtField}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <label htmlFor="Event Description">
                        {" "}
                        Event Description{" "}
                      </label>
                      <FormHelperText style={{ color: "#ABABAB" }}>
                        {values["Event Description"].length}/150
                      </FormHelperText>
                    </div>
                    <TextField
                      value={formik.values["Event Description"]}
                      onChange={(e) => {
                        formik.setFieldValue(
                          "Event Description",
                          e.target.value
                        );
                        handleChange("Event Description", e.target.value);
                      }}
                      name="Event Description"
                      variant="outlined"
                      helperText={
                        formik.touched["Event Description"] &&
                        formik.errors["Event Description"]
                      }
                      error={
                        formik.touched["Event Description"] &&
                        Boolean(formik.errors["Event Description"])
                      }
                      multiline
                      rows={3}
                      inputProps={{ maxLength: 150 }}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </div>
          </Grid>
          <Grid item xs={12} className="w-full">
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={5}>
                <div
                  style={{
                    width: "100%",
                    minHeight: "36vh",
                    padding: "16px",
                    background: "#292C31",
                    borderRadius: "8px",
                  }}
                >
                  <Grid
                    container
                    spacing={2}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Grid item xs={12}>
                      <Grid container spacing={2} justifyContent="center">
                        {/* =========================================================
                         * Is the event repeating - only applies when editing an event
                         *  =========================================================
                         */}
                        {values.repeats ? (
                          <>
                            <Grid item xs={12}>
                              <FormControl
                                fullWidth
                                required
                                disabled={loading}
                                className={classes.txtField}
                              >
                                <label htmlFor="eventStart">
                                  {" "}
                                  Repeat Start{" "}
                                </label>
                                <TextField
                                  id="eventStart"
                                  type="datetime-local"
                                  variant="outlined"
                                  name="eventStartTime"
                                  defaultValue={formik.values.eventStartTime}
                                  className={classes.textField}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "eventStartTime",
                                      e.currentTarget.value
                                    );
                                    handleTimeChange(
                                      "Start time",
                                      e.currentTarget.value
                                    );
                                  }}
                                  helperText={
                                    formik.touched["eventStartTime"] &&
                                    formik.errors["eventStartTime"]
                                  }
                                  error={
                                    formik.touched["eventStartTime"] &&
                                    Boolean(formik.errors["eventStartTime"])
                                  }
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl
                                fullWidth
                                required
                                disabled={loading}
                                className={classes.txtField}
                              >
                                <label htmlFor="eventEnd"> Repeat End</label>
                                <TextField
                                  id="eventEnd"
                                  type="datetime-local"
                                  variant="outlined"
                                  name="eventEndTime"
                                  defaultValue={formik.values.eventEndTime} //"2020-01-01T08:30"
                                  className={classes.textField}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "eventEndTime",
                                      e.target.value
                                    );
                                    handleTimeChange(
                                      "End time",
                                      e.target.value
                                    );
                                  }}
                                  helperText={
                                    formik.touched["eventEndTime"] &&
                                    formik.errors["eventEndTime"]
                                  }
                                  error={
                                    formik.touched["eventEndTime"] &&
                                    Boolean(formik.errors["eventEndTime"])
                                  }
                                />
                              </FormControl>
                            </Grid>
                          </>
                        ) : (
                          // =====================================================
                          // event is not repeating && just regualr event creation
                          // =====================================================
                          <>
                            <Grid item xs={12}>
                              <FormControl
                                fullWidth
                                required
                                disabled={loading}
                                className={classes.txtField}
                              >
                                <label htmlFor="eventStart">
                                  {generateTimeLabel(
                                    values["eventType"],
                                    "start"
                                  )}
                                </label>
                                <TextField
                                  id="eventStart"
                                  name="eventStartTime"
                                  type="datetime-local"
                                  variant="outlined"
                                  defaultValue={formik.values.eventStartTime} //"2020-01-01T08:30"
                                  // defaultValue={
                                  //   //To be honest, i'm not sure what this does anymore - Akin 2021/04/25
                                  //   values["Start time"] && values["Start time"].seconds
                                  //     ? handleStripFirebaseTimestamp("Start time")
                                  //     : "" // getDateTimeNow()
                                  // }
                                  className={classes.textField}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "eventStartTime",
                                      e.target.value
                                    );
                                    handleTimeChange(
                                      "Start time",
                                      e.target.value
                                    );
                                  }}
                                  helperText={
                                    formik.touched["eventStartTime"] &&
                                    formik.errors["eventStartTime"]
                                  }
                                  error={
                                    formik.touched["eventStartTime"] &&
                                    Boolean(formik.errors["eventStartTime"])
                                  }
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl
                                fullWidth
                                required
                                disabled={loading}
                                className={classes.txtField}
                              >
                                <label htmlFor="eventEnd">
                                  {generateTimeLabel(
                                    values["eventType"],
                                    "end"
                                  )}
                                </label>
                                <TextField
                                  id="eventEnd"
                                  type="datetime-local"
                                  name="eventEndTime"
                                  variant="outlined"
                                  defaultValue={formik.values.eventEndTime} //"2020-01-01T08:30"
                                  // defaultValue={
                                  //   //To be honest, i'm not sure what this does anymore - Akin 2021/04/25

                                  //   values["End time"] && values["End time"].seconds
                                  //     ? handleStripFirebaseTimestamp("End time")
                                  //     : "" // getDateTimeNow()
                                  // } //"2020-01-01T08:30"
                                  className={classes.textField}
                                  InputLabelProps={{
                                    shrink: true,
                                  }}
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "eventEndTime",
                                      e.target.value
                                    );
                                    handleTimeChange(
                                      "End time",
                                      e.target.value
                                    );
                                  }}
                                  helperText={
                                    formik.touched["eventEndTime"] &&
                                    formik.errors["eventEndTime"]
                                  }
                                  error={
                                    formik.touched["eventEndTime"] &&
                                    Boolean(formik.errors["eventEndTime"])
                                  }
                                />
                              </FormControl>
                            </Grid>
                          </>
                        )}
                      </Grid>
                    </Grid>
                    <Tooltip
                      title="Set the location for this event"
                      aria-label="set Location"
                    >
                      <Grid item xs={12}>
                        <FormControl
                          className={classes.radioField}
                          error={
                            formik.touched.chooseLocation &&
                            Boolean(formik.errors.chooseLocation)
                          }
                        >
                          <FormHelperText>
                            Where will the be at? {"  "}
                            {formik.touched.chooseLocation &&
                              formik.errors.chooseLocation}
                          </FormHelperText>
                          <RadioGroup
                            aria-label="Event Occurrence type"
                            value={formik.values.chooseLocation}
                            // default="businessLocation" // removed the option to inpiut a different location for now
                            onChange={(e) => {
                              if (e.target.value === "businessLocation") {
                                setLocationToUserAddressLocation();
                              } else if (e.target.value === "inputLocation") {
                                console.log(
                                  "Clearing location as option was changed"
                                );
                                handleLocationUpdate(null);
                              }
                              formik.setFieldValue(
                                "chooseLocation",
                                e.target.value
                              );
                            }}
                            row
                          >
                            <FormControlLabel
                              control={<Radio name="businessLocation" />}
                              value="businessLocation"
                              label="My business location"
                              labelPlacement="end"
                            />
                          </RadioGroup>
                        </FormControl>
                        {formik.values.chooseLocation === "inputLocation" ? (
                          <div>
                            <span style={{ color: "red" }}>
                              {formik.errors.location &&
                                formik.errors.location.lat}
                            </span>

                            <LocationManager
                              handleLocationUpdate={handleLocationUpdate}
                              formik={formik}
                              fieldName={"location"}
                            />
                          </div>
                        ) : (
                          <> </>
                        )}
                      </Grid>
                    </Tooltip>
                  </Grid>
                </div>
              </Grid>
              <Grid item xs={12} sm={7}>
                <div
                  style={{
                    width: "100%",
                    padding: "16px",
                    background: "#292C31",
                    borderRadius: "8px",
                  }}
                >
                  <FormHelperText style={{ color: "#ABABAB" }}>
                    {" "}
                    You may select up to 3 files
                  </FormHelperText>
                  <Dropzone onDrop={onDrop} accept={"image/*, .mp4"} />
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} className="w-full">
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12} sm={5}>
                {eventTypeDisabled() ? (
                  <></>
                ) : (
                  <div
                    style={{
                      width: "100%",
                      padding: "16px",
                      background: "#292C31",
                      borderRadius: "8px",
                    }}
                  >
                    <FormControl
                      fullWidth
                      component="fieldset"
                      // className={classes.formControl}
                      className={classes.radioField}
                      required
                      // error={eventTypeError}
                      disabled={eventTypeDisabled()} // only become enabled if these start and end time have been provided
                      error={
                        formik.touched.eventType &&
                        Boolean(formik.errors.eventType)
                      }
                    >
                      {/* <FormLabel component="legend">Assign responsibility</FormLabel> */}
                      <label style={{ fontSize: "12px" }}> Event Type </label>
                      <RadioGroup
                        aria-label="Event Occurrence type"
                        value={formik.values.eventType || ""}
                        onChange={(e) => {
                          handleChecked(e);
                          formik.setFieldValue("eventType", e.target.value);
                        }}
                      >
                        <FormHelperText style={{ color: "#6661F2" }}>
                          {" "}
                          {eventTypeDisabled()
                            ? "Please enter start and end time"
                            : "Please select one"}
                        </FormHelperText>
                        <FormControlLabel
                          className={classes.ctrlLabel}
                          control={
                            <div className={classes.padddingCheckBox}>
                              <Radio
                                // checked={values.oneTimeEvent}
                                value="oneTimeEvent"
                                name="oneTimeEvent"
                              />
                            </div>
                          }
                          label="One-Time Event"
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          className={classes.ctrlLabel}
                          control={
                            <div className={classes.padddingCheckBox}>
                              <Radio
                                // checked={values.repeatsDaily}
                                value="Daily"
                                name="Daily"
                              />
                            </div>
                          }
                          label="Repeats Daily"
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          className={classes.ctrlLabel}
                          control={
                            <div className={classes.padddingCheckBox}>
                              <Radio
                                // checked={values.repeatsWeekly}
                                name="Weekly"
                                value="Weekly"
                              />
                            </div>
                          }
                          label="Repeats Weekly"
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          className={classes.ctrlLabel}
                          control={
                            <div className={classes.padddingCheckBox}>
                              <Radio
                                // checked={values.repeatsSatSun}
                                name="Weekend"
                                value="Weekend"
                              />
                            </div>
                          }
                          label="Repeats Sat-Sun"
                          labelPlacement="start"
                        />
                        <FormControlLabel
                          className={classes.ctrlLabel}
                          control={
                            <div className={classes.padddingCheckBox}>
                              <Radio
                                // checked={values.repeatsMonFri}
                                name="Weekday"
                                value="Weekday"
                              />
                            </div>
                          }
                          label="Repeats Mon-Fri"
                          labelPlacement="start"
                        />
                      </RadioGroup>
                    </FormControl>
                  </div>
                )}
              </Grid>
              <Grid item xs={12} sm={7} className="flex flex-col justify-end">
                {Object.keys(formik.errors).length !== 0 ? (
                  <div style={{ color: "red" }}>
                    Please fix the errors above and try again
                  </div>
                ) : (
                  ""
                )}
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={25} style={{ color: "white" }} />
                  ) : values.editingEvent ? (
                    "Update Event"
                  ) : (
                    "Create Event"
                  )}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/**
           * =========================================================
           * Image/video upload and previewing
           * =========================================================
           */}
          {imagesInState.length || videosInState.length ? (
            <Grid item xs={12} className="w-full">
              <div
                style={{
                  width: "100%",
                  padding: "16px",
                  background: "#292C31",
                  borderRadius: "8px",
                }}
              >
                <Grid
                  container
                  spacing={2}
                  justifyContent="center"
                  alignItems="flex-end"
                >
                  {imagesInState.map((val, index) => (
                    <Grid item key={`uploaded-image-${index}`}>
                      <Avatar
                        variant="square"
                        src={
                          imagesInState
                            ? val
                              ? URL.createObjectURL(val)
                              : ""
                            : ""
                        }
                        className={classes.imagePreview}
                        key={val.name}
                      />
                      <Button
                        style={{ color: "#ABABAB" }}
                        className={`material-icons delete focus:outline-none`}
                        onClick={() => handleRemoveImageFile(val.name)}
                      >
                        Remove file
                      </Button>
                    </Grid>
                  ))}
                  {videosInState.map((val, index) => (
                    <Grid item key={`uploaded-image-${index}`}>
                      <Avatar
                        variant="square"
                        src={
                          videosInState
                            ? val
                              ? URL.createObjectURL(val)
                              : ""
                            : ""
                        }
                        className={classes.imagePreview}
                      />
                      <Button
                        style={{ color: "#ABABAB" }}
                        className={`material-icons delete focus:outline-none`}
                        onClick={() => handleRemoveVideoFile(val.name)}
                      >
                        Remove file
                      </Button>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </Grid>
          ) : null}
          {/* =========================================================
           *           ONLY APPLIES WHEN EDITING AN EVENT
           * =========================================================
           * */}
          {values.existingImages ? (
            <Grid item xs={12} sm={10} className="w-full">
              <div
                style={{
                  width: "100%",
                  padding: "16px",
                  background: "#292C31",
                  borderRadius: "8px",
                }}
              >
                <FormHelperText style={{ fontSize: "12px", color: "#ABABAB" }}>
                  New uploads will overwrite the following image(s)
                </FormHelperText>
                <Carousel
                  className={classes.carousel}
                  autoPlay={false}
                  indicators={true}
                  navButtonsAlwaysVisible={true}
                  animation={"slide"}
                >
                  {/*  eslint-disable-next-line array-callback-return */}
                  {Object.entries(values.existingImages).map(([key, value]) => {
                    if (key.includes("image")) {
                      return (
                        <CardMedia
                          className={classes.media}
                          image={value || ""}
                          key={key}
                          title="image"
                        />
                      );
                    } else if (key.includes("video")) {
                      return (
                        <div>
                          <VideoPlayer videoSrc={value} key={key} />
                        </div>
                      );
                    }
                  })}
                </Carousel>
              </div>
            </Grid>
          ) : (
            <></> //otherwise, render nothing
          )}
          {renderSpinners()}
        </Grid>
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          {/*<Grid item xs={10}>*/}
          {/*  <FormControl*/}
          {/*    fullWidth*/}
          {/*    className={classes.txtField}*/}
          {/*    required*/}
          {/*    disabled={loading}*/}
          {/*  >*/}
          {/*    <div style={{ display: "flex", justifyContent: "space-between" }}>*/}
          {/*      <label htmlFor="Event Name"> Event Name </label>*/}
          {/*      <FormHelperText>*/}
          {/*        {values["Event Name"].length}/30*/}
          {/*      </FormHelperText>*/}
          {/*    </div>*/}
          {/*    <TextField*/}
          {/*      value={formik.values["Event Name"]}*/}
          {/*      onChange={(e) => {*/}
          {/*        formik.setFieldValue("Event Name", e.target.value);*/}
          {/*        handleChange("Event Name", e.target.value);*/}
          {/*      }}*/}
          {/*      name="eventName"*/}
          {/*      variant="outlined"*/}
          {/*      helperText={*/}
          {/*        formik.touched["Event Name"] && formik.errors["Event Name"]*/}
          {/*      }*/}
          {/*      error={*/}
          {/*        formik.touched["Event Name"] &&*/}
          {/*        Boolean(formik.errors["Event Name"])*/}
          {/*      }*/}
          {/*      inputProps={{ maxLength: 30 }}*/}
          {/*    />*/}
          {/*  </FormControl>*/}
          {/*</Grid>*/}
          {/*<Grid item xs={10}>*/}
          {/*  <FormControl fullWidth required disabled={loading}>*/}
          {/*    <div style={{ display: "flex", justifyContent: "space-between" }}>*/}
          {/*      <label htmlFor="Event Description"> Event Description </label>*/}
          {/*      <FormHelperText>*/}
          {/*        {values["Event Description"].length}/150*/}
          {/*      </FormHelperText>*/}
          {/*    </div>*/}
          {/*    <TextField*/}
          {/*      value={formik.values["Event Description"]}*/}
          {/*      onChange={(e) => {*/}
          {/*        formik.setFieldValue("Event Description", e.target.value);*/}
          {/*        handleChange("Event Description", e.target.value);*/}
          {/*      }}*/}
          {/*      name="Event Description"*/}
          {/*      variant="outlined"*/}
          {/*      helperText={*/}
          {/*        formik.touched["Event Description"] &&*/}
          {/*        formik.errors["Event Description"]*/}
          {/*      }*/}
          {/*      error={*/}
          {/*        formik.touched["Event Description"] &&*/}
          {/*        Boolean(formik.errors["Event Description"])*/}
          {/*      }*/}
          {/*      multiline*/}
          {/*      rows={3}*/}
          {/*      inputProps={{ maxLength: 150 }}*/}
          {/*    />*/}
          {/*  </FormControl>*/}
          {/*</Grid>*/}
          {/* =========================================================
           * Is the event repeating - only applies when editing an event
           *  =========================================================
           */}
          {/*{values.repeats ? (*/}
          {/*  <>*/}
          {/*    <Grid item xs={5}>*/}
          {/*      <FormControl fullWidth required disabled={loading}>*/}
          {/*        <label htmlFor="eventStart"> Repeat Start </label>*/}
          {/*        <TextField*/}
          {/*          id="eventStart"*/}
          {/*          type="datetime-local"*/}
          {/*          variant="outlined"*/}
          {/*          name="eventStartTime"*/}
          {/*          defaultValue={formik.values.eventStartTime}*/}
          {/*          className={classes.textField}*/}
          {/*          InputLabelProps={{*/}
          {/*            shrink: true,*/}
          {/*          }}*/}
          {/*          onChange={(e) => {*/}
          {/*            formik.setFieldValue("eventStartTime", e.target.value);*/}
          {/*            handleTimeChange("Start time", e.target.value);*/}
          {/*          }}*/}
          {/*          helperText={*/}
          {/*            formik.touched["eventStartTime"] &&*/}
          {/*            formik.errors["eventStartTime"]*/}
          {/*          }*/}
          {/*          error={*/}
          {/*            formik.touched["eventStartTime"] &&*/}
          {/*            Boolean(formik.errors["eventStartTime"])*/}
          {/*          }*/}
          {/*        />*/}
          {/*      </FormControl>*/}
          {/*    </Grid>*/}
          {/*    <Grid item xs={5}>*/}
          {/*      <FormControl fullWidth required disabled={loading}>*/}
          {/*        <label htmlFor="eventEnd"> Repeat End</label>*/}
          {/*        <TextField*/}
          {/*          id="eventEnd"*/}
          {/*          type="datetime-local"*/}
          {/*          variant="outlined"*/}
          {/*          name="eventEndTime"*/}
          {/*          defaultValue={formik.values.eventEndTime} //"2020-01-01T08:30"*/}
          {/*          className={classes.textField}*/}
          {/*          InputLabelProps={{*/}
          {/*            shrink: true,*/}
          {/*          }}*/}
          {/*          onChange={(e) => {*/}
          {/*            formik.setFieldValue("eventEndTime", e.target.value);*/}
          {/*            handleTimeChange("End time", e.target.value);*/}
          {/*          }}*/}
          {/*          helperText={*/}
          {/*            formik.touched["eventEndTime"] &&*/}
          {/*            formik.errors["eventEndTime"]*/}
          {/*          }*/}
          {/*          error={*/}
          {/*            formik.touched["eventEndTime"] &&*/}
          {/*            Boolean(formik.errors["eventEndTime"])*/}
          {/*          }*/}
          {/*        />*/}
          {/*      </FormControl>*/}
          {/*    </Grid>*/}
          {/*  </>*/}
          {/*) : (*/}
          {/*  // =====================================================*/}
          {/*  // event is not repeating && just regualr event creation*/}
          {/*  // =====================================================*/}
          {/*  <>*/}
          {/*    <Grid item xs={5}>*/}
          {/*      <FormControl fullWidth required disabled={loading}>*/}
          {/*        <label htmlFor="eventStart">*/}
          {/*          {generateTimeLabel(values["eventType"], "start")}*/}
          {/*        </label>*/}
          {/*        <TextField*/}
          {/*          id="eventStart"*/}
          {/*          name="eventStartTime"*/}
          {/*          type="datetime-local"*/}
          {/*          variant="outlined"*/}
          {/*          defaultValue={formik.values.eventStartTime} //"2020-01-01T08:30"*/}
          {/*          // defaultValue={*/}
          {/*          //   //To be honest, i'm not sure what this does anymore - Akin 2021/04/25*/}
          {/*          //   values["Start time"] && values["Start time"].seconds*/}
          {/*          //     ? handleStripFirebaseTimestamp("Start time")*/}
          {/*          //     : "" // getDateTimeNow()*/}
          {/*          // }*/}
          {/*          className={classes.textField}*/}
          {/*          InputLabelProps={{*/}
          {/*            shrink: true,*/}
          {/*          }}*/}
          {/*          onChange={(e) => {*/}
          {/*            formik.setFieldValue("eventStartTime", e.target.value);*/}
          {/*            handleTimeChange("Start time", e.target.value);*/}
          {/*          }}*/}
          {/*          helperText={*/}
          {/*            formik.touched["eventStartTime"] &&*/}
          {/*            formik.errors["eventStartTime"]*/}
          {/*          }*/}
          {/*          error={*/}
          {/*            formik.touched["eventStartTime"] &&*/}
          {/*            Boolean(formik.errors["eventStartTime"])*/}
          {/*          }*/}
          {/*        />*/}
          {/*      </FormControl>*/}
          {/*    </Grid>*/}
          {/*    <Grid item xs={5}>*/}
          {/*      <FormControl fullWidth required disabled={loading}>*/}
          {/*        <label htmlFor="eventEnd">*/}
          {/*          {generateTimeLabel(values["eventType"], "end")}*/}
          {/*        </label>*/}
          {/*        <TextField*/}
          {/*          id="eventEnd"*/}
          {/*          type="datetime-local"*/}
          {/*          name="eventEndTime"*/}
          {/*          variant="outlined"*/}
          {/*          defaultValue={formik.values.eventEndTime} //"2020-01-01T08:30"*/}
          {/*          // defaultValue={*/}
          {/*          //   //To be honest, i'm not sure what this does anymore - Akin 2021/04/25*/}

          {/*          //   values["End time"] && values["End time"].seconds*/}
          {/*          //     ? handleStripFirebaseTimestamp("End time")*/}
          {/*          //     : "" // getDateTimeNow()*/}
          {/*          // } //"2020-01-01T08:30"*/}
          {/*          className={classes.textField}*/}
          {/*          InputLabelProps={{*/}
          {/*            shrink: true,*/}
          {/*          }}*/}
          {/*          onChange={(e) => {*/}
          {/*            formik.setFieldValue("eventEndTime", e.target.value);*/}
          {/*            handleTimeChange("End time", e.target.value);*/}
          {/*          }}*/}
          {/*          helperText={*/}
          {/*            formik.touched["eventEndTime"] &&*/}
          {/*            formik.errors["eventEndTime"]*/}
          {/*          }*/}
          {/*          error={*/}
          {/*            formik.touched["eventEndTime"] &&*/}
          {/*            Boolean(formik.errors["eventEndTime"])*/}
          {/*          }*/}
          {/*        />*/}
          {/*      </FormControl>*/}
          {/*    </Grid>*/}
          {/*  </>*/}
          {/*)}*/}

          {/* =========================================================
           * FOR PRESENTING  MAP INTERFACE AND UPDATING EVENT LOCATION
           *  =========================================================
           */}
          {/*<Tooltip*/}
          {/*  title="Set the location for this event"*/}
          {/*  aria-label="set Location"*/}
          {/*>*/}
          {/*  <Grid item xs={10}>*/}
          {/*    <br />*/}
          {/*    <FormControl*/}
          {/*      error={*/}
          {/*        formik.touched.chooseLocation &&*/}
          {/*        Boolean(formik.errors.chooseLocation)*/}
          {/*      }*/}
          {/*    >*/}
          {/*      <FormHelperText>*/}
          {/*        Where will the be at? {"  "}*/}
          {/*        {formik.touched.chooseLocation &&*/}
          {/*          formik.errors.chooseLocation}*/}
          {/*      </FormHelperText>*/}
          {/*      <RadioGroup*/}
          {/*        aria-label="Event Occurrence type"*/}
          {/*        value={formik.values.chooseLocation || ""}*/}
          {/*        // default="businessLocation" // removed the option to inpiut a different location for now*/}
          {/*        onChange={(e) => {*/}
          {/*          if (e.target.value === "businessLocation") {*/}
          {/*            setLocationToUserAddressLocation();*/}
          {/*          } else if (e.target.value === "inputLocation") {*/}
          {/*            console.log("Clearing location as option was changed");*/}
          {/*            handleLocationUpdate(null);*/}
          {/*          }*/}
          {/*          formik.setFieldValue("chooseLocation", e.target.value);*/}
          {/*        }}*/}
          {/*        row*/}
          {/*      >*/}
          {/*        <FormControlLabel*/}
          {/*          control={<Radio name="businessLocation" />}*/}
          {/*          value="businessLocation"*/}
          {/*          label="My business location"*/}
          {/*          labelPlacement="end"*/}
          {/*        />*/}
          {/*        /!* <FormControlLabel*/}
          {/*          value="inputLocation"*/}
          {/*          control={<Radio name="inputLocation" />}*/}
          {/*          label="Input different location"*/}
          {/*          labelPlacement="end"*/}
          {/*        /> *!/*/}
          {/*      </RadioGroup>*/}
          {/*      <br />*/}
          {/*    </FormControl>*/}
          {/*    {formik.values.chooseLocation === "inputLocation" ? (*/}
          {/*      <div>*/}
          {/*        <span style={{ color: "red" }}>*/}
          {/*          {formik.errors.location && formik.errors.location.lat}*/}
          {/*        </span>*/}

          {/*        <LocationManager*/}
          {/*          handleLocationUpdate={handleLocationUpdate}*/}
          {/*          formik={formik}*/}
          {/*          fieldName={"location"}*/}
          {/*        ></LocationManager>*/}
          {/*      </div>*/}
          {/*    ) : (*/}
          {/*      <> </>*/}
          {/*    )}*/}
          {/*  </Grid>*/}
          {/*</Tooltip>*/}

          {/*<Grid item xs={10}>*/}
          {/*  {eventTypeDisabled() ? (*/}
          {/*    <></>*/}
          {/*  ) : (*/}
          {/*    <FormControl*/}
          {/*      fullWidth*/}
          {/*      component="fieldset"*/}
          {/*      className={classes.formControl}*/}
          {/*      required*/}
          {/*      // error={eventTypeError}*/}
          {/*      disabled={eventTypeDisabled()} // only become enabled if these start and end time have been provided*/}
          {/*      error={*/}
          {/*        formik.touched.eventType && Boolean(formik.errors.eventType)*/}
          {/*      }*/}
          {/*    >*/}
          {/*      /!* <FormLabel component="legend">Assign responsibility</FormLabel> *!/*/}
          {/*      <br />*/}
          {/*      <label> Event Type </label> <hr />*/}
          {/*      <br />*/}
          {/*      <RadioGroup*/}
          {/*        aria-label="Event Occurrence type"*/}
          {/*        value={formik.values.eventType || ""}*/}
          {/*        onChange={(e) => {*/}
          {/*          handleChecked(e);*/}
          {/*          formik.setFieldValue("eventType", e.target.value);*/}
          {/*        }}*/}
          {/*      >*/}
          {/*        <FormHelperText>*/}
          {/*          {" "}*/}
          {/*          {eventTypeDisabled()*/}
          {/*            ? "Please enter start and end time"*/}
          {/*            : "Please select one"}*/}
          {/*        </FormHelperText>*/}
          {/*        <FormControlLabel*/}
          {/*          className={classes.ctrlLabel}*/}
          {/*          control={*/}
          {/*            <div className={classes.padddingCheckBox}>*/}
          {/*              <Radio*/}
          {/*                // checked={values.oneTimeEvent}*/}
          {/*                value="oneTimeEvent"*/}
          {/*                name="oneTimeEvent"*/}
          {/*              />*/}
          {/*            </div>*/}
          {/*          }*/}
          {/*          label="One-Time Event"*/}
          {/*          labelPlacement="start"*/}
          {/*        />*/}
          {/*        <FormControlLabel*/}
          {/*          className={classes.ctrlLabel}*/}
          {/*          control={*/}
          {/*            <div className={classes.padddingCheckBox}>*/}
          {/*              <Radio*/}
          {/*                // checked={values.repeatsDaily}*/}
          {/*                value="Daily"*/}
          {/*                name="Daily"*/}
          {/*              />*/}
          {/*            </div>*/}
          {/*          }*/}
          {/*          label="Repeats Daily"*/}
          {/*          labelPlacement="start"*/}
          {/*        />*/}
          {/*        <FormControlLabel*/}
          {/*          className={classes.ctrlLabel}*/}
          {/*          control={*/}
          {/*            <div className={classes.padddingCheckBox}>*/}
          {/*              <Radio*/}
          {/*                // checked={values.repeatsWeekly}*/}
          {/*                name="Weekly"*/}
          {/*                value="Weekly"*/}
          {/*              />*/}
          {/*            </div>*/}
          {/*          }*/}
          {/*          label="Repeats Weekly"*/}
          {/*          labelPlacement="start"*/}
          {/*        />*/}
          {/*        <FormControlLabel*/}
          {/*          className={classes.ctrlLabel}*/}
          {/*          control={*/}
          {/*            <div className={classes.padddingCheckBox}>*/}
          {/*              <Radio*/}
          {/*                // checked={values.repeatsSatSun}*/}
          {/*                name="Weekend"*/}
          {/*                value="Weekend"*/}
          {/*              />*/}
          {/*            </div>*/}
          {/*          }*/}
          {/*          label="Repeats Sat-Sun"*/}
          {/*          labelPlacement="start"*/}
          {/*        />*/}
          {/*        <FormControlLabel*/}
          {/*          className={classes.ctrlLabel}*/}
          {/*          control={*/}
          {/*            <div className={classes.padddingCheckBox}>*/}
          {/*              <Radio*/}
          {/*                // checked={values.repeatsMonFri}*/}
          {/*                name="Weekday"*/}
          {/*                value="Weekday"*/}
          {/*              />*/}
          {/*            </div>*/}
          {/*          }*/}
          {/*          label="Repeats Mon-Fri"*/}
          {/*          labelPlacement="start"*/}
          {/*        />*/}
          {/*      </RadioGroup>*/}
          {/*    </FormControl>*/}
          {/*  )}*/}
          {/*</Grid>*/}
          {/*/!* =========================================================*/}
          {/* *           ONLY APPLIES WHEN EDITING AN EVENT*/}
          {/* * =========================================================*/}
          {/* * *!/*/}
          {/*{values.existingImages ? (*/}
          {/*  <Grid item xs={10}>*/}
          {/*    <FormHelperText>*/}
          {/*      New uploads will overwrite the following image(s)*/}
          {/*    </FormHelperText>*/}
          {/*    <br />*/}
          {/*    <Carousel*/}
          {/*      autoPlay={false}*/}
          {/*      indicators={true}*/}
          {/*      navButtonsAlwaysVisible={true}*/}
          {/*      animation={"slide"}*/}
          {/*    >*/}
          {/*      {Object.entries(values.existingImages).map(([key, value]) => {*/}
          {/*        if (key.includes("image")) {*/}
          {/*          return (*/}
          {/*            <CardMedia*/}
          {/*              className={classes.media}*/}
          {/*              image={value || ""}*/}
          {/*              key={key}*/}
          {/*              title="image"*/}
          {/*            />*/}
          {/*          );*/}
          {/*        } else if (key.includes("video")) {*/}
          {/*          return (*/}
          {/*            <div>*/}
          {/*              <VideoPlayer videoSrc={value} key={key} />*/}
          {/*            </div>*/}
          {/*          );*/}
          {/*        }*/}
          {/*      })}*/}
          {/*    </Carousel>*/}
          {/*  </Grid>*/}
          {/*) : (*/}
          {/*  <></> //otherwise, render nothing*/}
          {/*)}*/}
          {/**
           * =========================================================
           * Image/video upload and previewing
           * =========================================================
           */}
          {/*<Grid item xs={10} style={{ marginBottom: 15 }}>*/}
          {/*  <FormHelperText> You may select up to 3 files</FormHelperText>*/}
          {/*  <Dropzone onDrop={onDrop} accept={"image/*, .mp4"} />*/}
          {/*</Grid>*/}

          {/*{imagesInState.map((val, index) => (*/}
          {/*  <Grid item xs={3} key={`uploaded-image-${index}`}>*/}
          {/*    <Avatar*/}
          {/*      variant="square"*/}
          {/*      src={imagesInState ? (val ? URL.createObjectURL(val) : "") : ""}*/}
          {/*      className={classes.imagePreview}*/}
          {/*      key={val.name}*/}
          {/*    ></Avatar>{" "}*/}
          {/*    <Button*/}
          {/*      className={"material-icons delete"}*/}
          {/*      onClick={() => handleRemoveImageFile(val.name)}*/}
          {/*    >*/}
          {/*      Remove file*/}
          {/*    </Button>*/}
          {/*  </Grid>*/}
          {/*))}*/}
          {/*{videosInState.map((val, index) => (*/}
          {/*  <Grid item xs={3} key={`uploaded-image-${index}`}>*/}
          {/*    <Avatar*/}
          {/*      variant="square"*/}
          {/*      src={videosInState ? (val ? URL.createObjectURL(val) : "") : ""}*/}
          {/*      className={classes.imagePreview}*/}
          {/*    ></Avatar>{" "}*/}
          {/*    <Button*/}
          {/*      className={"material-icons delete"}*/}
          {/*      onClick={() => handleRemoveVideoFile(val.name)}*/}
          {/*    >*/}
          {/*      Remove file*/}
          {/*    </Button>*/}
          {/*  </Grid>*/}
          {/*))}*/}

          {/*{renderSpinners()}*/}
          {/**
           * =========================================================
           *  Submitting and validating event
           * =========================================================
           */}
          {/*<Grid item xs={12} sm={3}>*/}
          {/*  {Object.keys(formik.errors).length !== 0 ? (*/}
          {/*    <div style={{ color: "red" }}>*/}
          {/*      Please fix the errors above and try again*/}
          {/*    </div>*/}
          {/*  ) : (*/}
          {/*    ""*/}
          {/*  )}*/}
          {/*  <Button*/}
          {/*    fullWidth*/}
          {/*    type="submit"*/}
          {/*    variant="contained"*/}
          {/*    color="secondary"*/}
          {/*    className={classes.button}*/}
          {/*    disabled={loading}*/}
          {/*  >*/}
          {/*    {loading ? (*/}
          {/*      <CircularProgress size={25} style={{ color: "white" }} />*/}
          {/*    ) : values.editingEvent ? (*/}
          {/*      "Update Event"*/}
          {/*    ) : (*/}
          {/*      "Create Event"*/}
          {/*    )}*/}
          {/*  </Button>*/}
          {/*</Grid>*/}
        </Grid>
      </form>
      {/*<Button*/}
      {/*  color="secondary"*/}
      {/*  className={classes.button}*/}
      {/*  onClick={() => {*/}
      {/*    console.log(formik.errors);*/}
      {/*    console.log(formik.values);*/}
      {/*    console.log(repopulateStandardTime("End time"));*/}
      {/*    console.log(repopulateStandardTime("Start time"));*/}
      {/*    console.log(values["End time"]);*/}
      {/*    console.log(values["Start time"]);*/}
      {/*  }}*/}
      {/*  variant="contained"*/}
      {/*>*/}
      {/*  Debug{" "}*/}
      {/*</Button>*/}
    </div>
  );
}

CreateEditEvent.propTypes = {
  values: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool.isRequired,
  successAction: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired,
  setDialogState: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    isEventSuccessfullyUpdatedDB: state.events.isEventSuccessfullyUpdatedDB,
    isEventSuccessfullyUpdatedFB: state.events.isEventSuccessfullyUpdatedFB,
    isEventSuccessfullyCreatedDB: state.events.isEventSuccessfullyCreatedDB,
    isEventSuccessfullyCreatedFB: state.events.isEventSuccessfullyCreatedFB,
    errorUpdatingEventDB: state.events.errorUpdatingEventDB,
    errorUpdatingEventFB: state.events.errorUpdatingEventFB,
    eventMsg: state.events.msg,
    eventError: state.events.error,
    userData: state.auth.userData,
  };
}
export default connect(mapStateToProps)(CreateEditEvent);
