import {
  EVENTS_PULL_REQUEST,
  EVENTS_PULL_SUCCESS,
  EVENTS_PULL_FAILURE,
  CURRENT_EVENT_PULL_REQUEST,
  CURRENT_EVENT_PULL_SUCCESS,
  CURRENT_EVENT_PULL_FAILURE,
  CREATE_EVENT_REQUEST_FB,
  CREATE_EVENT_SUCCESS_FB,
  CREATE_EVENT_FAILURE_FB,
  CREATE_EVENT_REQUEST_DB,
  CREATE_EVENT_SUCCESS_DB,
  CREATE_EVENT_FAILURE_DB,
  SPECIFIED_EVENT_PULL_REQUEST_FB,
  SPECIFIED_EVENT_PULL_SUCCESS_FB,
  SPECIFIED_EVENT_PULL_FAILURE_FB,
  SPECIFIED_EVENT_PULL_REQUEST_DB,
  SPECIFIED_EVENT_PULL_SUCCESS_DB,
  SPECIFIED_EVENT_PULL_FAILURE_DB,
  USER_EVENT_PULL_REQUEST,
  USER_EVENT_PULL_SUCCESS,
  USER_EVENT_PULL_FAILURE,
  UPDATE_EVENT_REQUEST_FB,
  UPDATE_EVENT_REQUEST_DB,
  UPDATE_EVENT_SUCCESS_FB,
  UPDATE_EVENT_FAILURE_FB,
  UPDATE_EVENT_SUCCESS_DB,
  UPDATE_EVENT_FAILURE_DB,
  EVENTS_BY_LOCATION_PULL_SUCCESS,
  EVENTS_BY_LOCATION_PULL_FAILURE,
  EVENTS_BY_LOCATION_PULL_REQUEST,
  USER_EVENTS_BY_LOCATION_PULL_SUCCESS,
  USER_EVENTS_BY_LOCATION_PULL_FAILURE,
  USER_EVENTS_BY_LOCATION_PULL_REQUEST,
  CLEAR_ON_SUCCESSFUL_CREATE,
  CLEAR_ON_SUCCESSFUL_UPDATE,
  CLEAR_USER_LOCATION_EVENT_DATA,
  CLEAN_EVENT_STATE,
  MEDIA_UPLOAD_REQUEST,
  MEDIA_UPLOAD_PROCESSING,
  MEDIA_UPLOAD_FAILURE,
  MEDIA_UPLOAD_COMPLETE,
} from "../types";

import {
  firebaseInstance,
  firestore,
  firestoreTimeStamp,
  storage,
} from "../../firebase/firebase";

import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import {
  FB_FUNCTIONS_CORS_PROXY,
  CREATE_EVENT_ENDPOINT,
  EDIT_EVENT_ENDPOINT,
  GET_ALL_EVENTS_ENDPOINT,
  GET_SPECIFIC_EVENT_ENDPOINT,
  HAPPENIN_API_SECRET,
  GET_SURPRISE_EVENT_ENDPOINT,
} from "../../util/keywords";
import { convertTimeOfDayToDateObj, minsTo_HourMin } from "../../util/util";

const requestAllEvents = () => {
  return {
    type: EVENTS_PULL_REQUEST,
  };
};

const requestCurrentlyActiveEvent = () => {
  return {
    type: CURRENT_EVENT_PULL_REQUEST,
  };
};

const FB_requestSpecificEvent = () => {
  // for any provided URL of busid and Event ID
  return {
    type: SPECIFIED_EVENT_PULL_REQUEST_FB,
  };
};

const FB_receiveSpecificEvent = (eventData) => {
  return {
    type: SPECIFIED_EVENT_PULL_SUCCESS_FB,
    payload: eventData,
  };
};

const FB_errorReceiveingSpecificEvent = (err) => {
  return {
    type: SPECIFIED_EVENT_PULL_FAILURE_FB,
    payload: err, //TODO: expand error handling to be specifi based on the err received
  };
};

const DB_requestSpecificEvent = () => {
  // for any provided URL of busid and Event ID
  return {
    type: SPECIFIED_EVENT_PULL_REQUEST_DB,
  };
};

const DB_receiveSpecificEvent = (eventData) => {
  return {
    type: SPECIFIED_EVENT_PULL_SUCCESS_DB,
    payload: eventData,
  };
};

const DB_errorReceiveingSpecificEvent = (err) => {
  return {
    type: SPECIFIED_EVENT_PULL_FAILURE_DB,
    payload: err, //TODO: expand error handling to be specifi based on the err received
  };
};

const requestSpecificUserEvent = () => {
  //getEvents ALL for a specific user e.g - displayin gall a businesses past and current events
  return {
    type: USER_EVENT_PULL_REQUEST,
  };
};

const receiveSpecificUserEvents = (eventData) => {
  return {
    type: USER_EVENT_PULL_SUCCESS,
    payload: eventData,
  };
};

const receiveCurrentlyActiveEvent = (eventData) => {
  return {
    type: CURRENT_EVENT_PULL_SUCCESS,
    payload: eventData,
  };
};
const receiveAllEvents = (eventData) => {
  return {
    type: EVENTS_PULL_SUCCESS,
    payload: eventData,
  };
};

const errorReceivingSpecificUserEvents = () => {
  return {
    type: USER_EVENT_PULL_FAILURE,
  };
};
const errorReceivingCurrentlyActiveEvent = () => {
  return {
    type: CURRENT_EVENT_PULL_FAILURE,
  };
};
const errorReceivingAllEvents = (err) => {
  return {
    type: EVENTS_PULL_FAILURE,
    payload: err, //TODO: expand error handling to be specifi based on the err received
  };
};

const FB_createEventRequest = () => {
  return {
    type: CREATE_EVENT_REQUEST_FB,
  };
};
const FB_createEventSuccess = (incoming) => {
  return {
    type: CREATE_EVENT_SUCCESS_FB,
    payload: incoming,
  };
};
const FB_errorCreatingEvent = (err) => {
  return {
    type: CREATE_EVENT_FAILURE_FB,
    payload: err,
  };
};
const DB_createEventRequest = () => {
  return {
    type: CREATE_EVENT_REQUEST_DB,
  };
};
const DB_createEventSuccess = (incoming) => {
  return {
    type: CREATE_EVENT_SUCCESS_DB,
    payload: incoming,
  };
};
const DB_errorCreatingEvent = (err) => {
  return {
    type: CREATE_EVENT_FAILURE_DB,
    payload: { error: err, key: Date.now() },
  };
};

const FB_updateEventRequest = () => {
  return {
    type: UPDATE_EVENT_REQUEST_FB,
  };
};
const FB_updateEventSuccess = (incoming) => {
  return {
    type: UPDATE_EVENT_SUCCESS_FB,
    payload: incoming,
  };
};
const FB_errorUpdatingEvent = (err) => {
  return {
    type: UPDATE_EVENT_FAILURE_FB,
    payload: err,
  };
};

const DB_updateEventRequest = () => {
  return {
    type: UPDATE_EVENT_REQUEST_DB,
  };
};
const DB_updateEventSuccess = (incoming) => {
  return {
    type: UPDATE_EVENT_SUCCESS_DB,
    payload: incoming,
  };
};
const DB_errorUpdatingEvent = (err) => {
  return {
    type: UPDATE_EVENT_FAILURE_DB,
    payload: { error: err, key: Date.now() },
  };
};

const requestAllEventsByLocation = () => {
  return {
    type: EVENTS_BY_LOCATION_PULL_REQUEST,
  };
};

const receiveAllEventsByLocation = (data) => {
  return {
    type: EVENTS_BY_LOCATION_PULL_SUCCESS,
    payload: data,
  };
};

const errorReceivingAllEventsByLocation = (data) => {
  return {
    type: EVENTS_BY_LOCATION_PULL_FAILURE,
    payload: data,
  };
};

const requestAllUserEventsByLocation = () => {
  return {
    type: USER_EVENTS_BY_LOCATION_PULL_REQUEST,
  };
};

const receiveAllUserEventsByLocation = (data) => {
  return {
    type: USER_EVENTS_BY_LOCATION_PULL_SUCCESS,
    payload: data,
  };
};

const errorReceivingAllUserEventsByLocation = (data) => {
  return {
    type: USER_EVENTS_BY_LOCATION_PULL_FAILURE,
    payload: data,
  };
};

const cleanUserLocEvents = () => {
  return {
    type: CLEAR_USER_LOCATION_EVENT_DATA,
  };
};

const clearOnSuccessfulCreate = () => {
  return {
    type: CLEAR_ON_SUCCESSFUL_CREATE,
  };
};

const clearOnSuccessfulUpdate = () => {
  return {
    type: CLEAR_ON_SUCCESSFUL_UPDATE,
  };
};

const cleanEvent_ResetState = () => {
  return {
    type: CLEAN_EVENT_STATE,
  };
};

const startMediaUpload = () => {
  return {
    type: MEDIA_UPLOAD_REQUEST,
  };
};

const mediaUploadProgress = (file, prog) => {
  return {
    type: MEDIA_UPLOAD_PROCESSING,
    payload: {
      media: file,
      percentage: prog,
    },
  };
};

const mediaUploadComplete = () => {
  return {
    type: MEDIA_UPLOAD_COMPLETE,
  };
};
const mediaUploadFailure = (data) => {
  return {
    type: MEDIA_UPLOAD_FAILURE,
    mediaError: data,
  };
};

const axiosConfig = (targetPath) => {
  // with proxy
  return {
    headers: {
      "App-Secret": HAPPENIN_API_SECRET,
      "Content-Type": "application/json",
      "Target-URL": targetPath,
      // "Auth-Token" : "not functional yet"
    },
  };
};
// SEE HERE for why the proxy is needed:  https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe

export const get_AllEventsInRange = (rangeData) => (dispatch) => {
  dispatch(requestAllEventsByLocation());

  var d = new Date();
  var tznOffset = d.getTimezoneOffset();
  var { asInvesrseString } = minsTo_HourMin(tznOffset);
  rangeData.time_zone = asInvesrseString;

  axios
    .post(
      FB_FUNCTIONS_CORS_PROXY,
      rangeData,
      axiosConfig(GET_ALL_EVENTS_ENDPOINT)
    )
    .then((res) => {
      console.log(res.data.data);
      if (res.data.status === 1) {
        // success
        dispatch(receiveAllEventsByLocation(res.data.data));
      } else if (res.data.status === 0) {
        // error
        dispatch(errorReceivingAllEventsByLocation(res.data.msg));
      }
    })
    .catch((err) => {
      console.log("Axios Error", err);
      // dispatch(errorReceivingAllEventsByLocation(err));
    });
};
/**Basically the same as above, only need to store it sperately
 * a'rangeData' is expected to contain the requested user businesss id
 *
 * @param {*} rangeData
 * @returns
 */
export const get_AllUserEventsInRange = (rangeData) => (dispatch) => {
  dispatch(requestAllUserEventsByLocation());
  axios
    .post(
      FB_FUNCTIONS_CORS_PROXY,
      rangeData,
      axiosConfig(GET_ALL_EVENTS_ENDPOINT)
    )
    .then((res) => {
      console.log(res.data.data);
      if (res.data.status === 1) {
        // success
        dispatch(receiveAllUserEventsByLocation(res.data.data));
      } else if (res.data.status === 0) {
        // error
        dispatch(errorReceivingAllUserEventsByLocation(res.data.msg));
      }
    })
    .catch((err) => {
      console.log("Axios Error", err);
      // dispatch(errorReceivingAllEventsByLocation(err));
    });
};

export const get_SpecificEvent =
  (eventid, latitude, longitude) => (dispatch) => {
    dispatch(DB_requestSpecificEvent());
    var getData = { event_id: eventid, latitude, longitude };
    axios
      .post(
        FB_FUNCTIONS_CORS_PROXY,
        getData,
        axiosConfig(GET_SPECIFIC_EVENT_ENDPOINT)
      )
      .then((res) => {
        if (res.data.status === 1) {
          // success
          dispatch(DB_receiveSpecificEvent(res.data.data[0]));
        } else if (res.data.status === 0) {
          // error
          dispatch(DB_errorReceiveingSpecificEvent(res.data.msg));
        }
      })
      .catch((err) => {
        console.log("Axios Error", err);
        // dispatch(errorReceivingAllEventsByLocation(err));
      });
  };

export const getSurpriseEventData = (latitude, longitude, category) => (dispatch) => {
  dispatch(DB_requestSpecificEvent());
  var getData = {
    latitude: latitude,
    longitude: longitude,
    range: 30000,
    page: 1,
    limit: 1,
  };

  if (category && category !== "Any") {
    getData.category = category;
  }
  axios
    .post(
      FB_FUNCTIONS_CORS_PROXY,
      getData,
      axiosConfig(GET_SURPRISE_EVENT_ENDPOINT)
    )
    .then((res) => {
      if (res.data.status === 1) {
        // success
        const resObj = res.data.data[0];
        dispatch(DB_receiveSpecificEvent(resObj));
        dispatch(pullSpecificEvent(resObj.business_id, resObj.event_id));
      } else if (res.data.status === 0) {
        // error
        dispatch(DB_errorReceiveingSpecificEvent(res.data.msg));
      }
    })
    .catch((err) => {
      console.log("Axios Error", err);
      // dispatch(errorReceivingAllEventsByLocation(err));
    });
};

const post_CreateEvent = (eventData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        FB_FUNCTIONS_CORS_PROXY,
        eventData,
        axiosConfig(CREATE_EVENT_ENDPOINT)
      )
      .then((res) => {
        console.log(res.data.msg);
        if (res.data.status === 1) {
          // success
          resolve(res.data);
        } else if (res.data.status === 0) {
          // error
          reject(res.data);
        }
      })
      .catch((err) => {
        console.log("Axios Error", err);
        reject(err);
      });
  });
};

const post_UpdateEvent = (eventData) => {
  return new Promise((resolve, reject) => {
    axios
      .post(
        FB_FUNCTIONS_CORS_PROXY,
        eventData,
        axiosConfig(EDIT_EVENT_ENDPOINT)
      )
      .then((res) => {
        console.log(res.data.msg);
        if (res.data.status === 1) {
          // success
          resolve(res.data);
        } else if (res.data.status === 0) {
          // error
          reject(res.data);
        }
      })
      .catch((err) => {
        console.log("Axios Error", err);
        reject(err);
        // dispatch(errorReceivingAllEventsByLocation(err));
      });
  });
};

// FIREBASE FROM THIS POINT DOWN

export const pullAllAuthBusinessUserEvents = (uid) => (dispatch) => {
  dispatch(requestAllEvents());

  if (uid !== null) {
    (async function () {
      console.log("uid is not null");
      const eventsRef = firestore
        .doc(`businessAccounts/${uid}`)
        .collection("CurrentEvent");
      var rightNow = new Date();

      let eventsPast = eventsRef.where("End time", "<=", rightNow);
      let eventsActiveorUpcoming = eventsRef
        .where("End time", ">", rightNow)
        .where("isCanceled", "==", false);
      // let eventsRepatWeekly = eventsRef.where(
      //   "repeat interval",
      //   "==",
      //   "weekly"
      // );
      let eventsRepeating = eventsRef
        .where("repeats", "==", true)
        .where("isCanceled", "==", false);

      /* Decomisioned 2021-03-28
      // eventsRepeatDaily.where("repeat interval", "==", "daily");
      // eventsRepeatDaily.where("repeat interval", "==", "weekday");
      // eventsRepeatDaily.where("repeat interval", "==", "weekend"); 
      */
      let eventsCancelled = eventsRef.where("isCanceled", "==", true);

      const allEvents = {};
      await DRY(eventsPast, uid)
        .then((pastEvents) => {
          // dispatch(receivePastEvents());
          console.log("Past Events", pastEvents);
          allEvents.pastEvents = pastEvents;
        })
        .catch((err) => {
          dispatch(errorReceivingAllEvents(err));
        });

      await DRY(eventsActiveorUpcoming, uid)
        .then((activeEvents) => {
          console.log("Active or upcoming Events", activeEvents);
          allEvents.activeEvents = activeEvents;
        })
        .catch((err) => {
          dispatch(errorReceivingAllEvents(err));
        });

      /* Decomisioned 2021-03-28
      await DRY(eventsRepatWeekly, uid)
        .then((weeklyEvents) => {
          console.log("Weekly Events", weeklyEvents);
          allEvents.weeklyEvents = weeklyEvents;
        })
        .catch((err) => {
          dispatch(errorReceivingAllEvents(err));
        });
      */

      await DRY(eventsRepeating, uid)
        .then((repeatingEvnts) => {
          console.log("All Repeating Events", repeatingEvnts);
          allEvents.repeatingEvents = repeatingEvnts;
        })
        .catch((err) => {
          dispatch(errorReceivingAllEvents(err));
        });

      await DRY(eventsCancelled, uid)
        .then((cancelledEvents) => {
          console.log("Daily Events", cancelledEvents);
          allEvents.cancelledEvents = cancelledEvents;
        })
        .catch((err) => {
          dispatch(errorReceivingAllEvents(err));
        });

      await dispatch(receiveAllEvents(allEvents));

      // const events = await eventsRef.get()
      //   .then((querySnapshot) => {
      //     querySnapshot.forEach(async (doc) => {
      //       // doc.data() is never undefined for query doc snapshots

      //       console.log(doc.id, " => ", doc.data());
      //       allEvents.push({
      //         eventId: doc.id,
      //         images: await getEventImages(user.uid, doc.id),
      //         ...doc.data(),
      //       });
      //     });
      //     dispatch(receiveAllEvents(allEvents));
      //   })
      //   .catch((err) => {
      //     dispatch(errorReceivingAllEvents());
      //     console.log("Error pulling Events for user", err);
      //   });
    })();
  }
};

export const pullAllSpecificBusinessUserActiveEvents = (uid) => (dispatch) => {
  (async function () {
    dispatch(requestSpecificUserEvent());
    const eventsRef = firestore
      .doc(`businessAccounts/${uid}`)
      .collection("CurrentEvent");

    var rightNow = new Date();
    var activeEvents = {};
    let eventsActiveorUpcoming = eventsRef.where("End time", ">", rightNow);

    await DRY(eventsActiveorUpcoming, uid)
      .then((activeEventsData) => {
        console.log("Active or upcoming Events", activeEvents);
        activeEvents = activeEventsData;
      })
      .catch((err) => {
        dispatch(errorReceivingSpecificUserEvents(err));
      });

    await dispatch(receiveSpecificUserEvents(activeEvents));
  })();
};

//FIXME: this method is far too general, please update
export const pullCurrentEvent = () => (dispatch) => {
  dispatch(requestCurrentlyActiveEvent());
  firebaseInstance.auth().onAuthStateChanged(async (user) => {
    if (user !== null) {
      const currEvent = [];
      var rightNow = new Date();
      // var aDayAgo = new Date() - 84600;
      // aDayAgo.setDate(aDayAgo.getDate() - 1);
      // var aDayAgoObject = new Date(aDayAgo);
      console.log("trying to get events based on the convoluted request");
      console.log("Value of right now is : ", rightNow);
      await firestore
        .doc(`businessAccounts/${user.uid}`)
        .collection("CurrentEvent")
        .where("Start time", "<=", rightNow)
        // .where("Start time", ">=", aDayAgoObject) // this is supposed to check that it started within 24 hours but this is strictly almost never true. For instance, today is Dec 26 an event that started Dec23rd  will never be >= aday ago  (dece25th)
        .orderBy("Start time", "desc")
        .where("isCanceled", "==", false)
        // .where("End time", ">", rightNow) // cannot do this, this is against firestore rules, must perform in frontend
        .limit(1)
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach(async (doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            await getEventImages(user.uid, doc.id).then((images) => {
              currEvent.push({
                eventid: doc.id,
                images, // No longer in use, spereading doc.data should overrite images if none exists
                ...doc.data(),
              });
              // console.log("All Events Array: ", allEvents);
              dispatch(receiveCurrentlyActiveEvent(currEvent));
            });
          });
        })
        .catch((err) => {
          dispatch(errorReceivingCurrentlyActiveEvent(err));
          console.log("Error pulling current event for user", err);
        });
    }
  });
};

export const pullSpecificEvent = (uid, eventId) => (dispatch) => {
  dispatch(FB_requestSpecificEvent());
  //TODO: maybe do uid validation??
  // firebaseInstance.auth().getUser()
  // https://firebase.google.com/docs/auth/admin/manage-users#retrieve_user_data
  getSpecificEvent(uid, eventId)
    .then((specificEvent) => {
      dispatch(FB_receiveSpecificEvent(specificEvent));
    })
    .catch((err) => {
      dispatch(FB_errorReceiveingSpecificEvent(err));
      console.log("Error pulling Events for user", err);
    });
};

export const getSpecificEvent = async (uid, eventId) => {
  return await firestore
    .doc(`businessAccounts/${uid}/CurrentEvent/${eventId}`)
    .get()
    .then(async (querySnapshot) => {
      // console.log(querySnapshot.id, " => ", querySnapshot.data());
      const specificEvent = {
        eventId: querySnapshot.id,
        images: await getEventImages(uid, eventId), // No longer in use, spereading doc.data should overrite images if none exists
        ...querySnapshot.data(),
      };
      return specificEvent;
    })
    .catch((err) => {
      console.log("Error pulling Events for user", err);
    });
};

export const createEvent = (eventData) => (dispatch) => {
  var dataForDB = { ...eventData }; // take data before it is altered during firebase submit

  firebaseInstance.auth().onAuthStateChanged(async (user) => {
    if (user !== null) {
      let eventId;
      eventId = uuidv4().toUpperCase();
      dataForDB = refactorForDBSubmit({ ...dataForDB, uid: user.uid, eventId }); // unwrap the contents of data object and add uid and eventId to form a new object
      if (typeof dataForDB.error === "undefined") {
        dispatch(DB_createEventRequest());
        post_CreateEvent(dataForDB)
          .then((respData) => {
            dispatch(DB_createEventSuccess(respData.msg));
            dispatch(FB_createEventRequest());
            var batch = firestore.batch(); //do a batched write
            writeEvent(user.uid, eventId, eventData, batch, dispatch)
              .then(() => {
                //This line informs the front end it is okay to progress to next screen
                dispatch(FB_createEventSuccess({ uid: user.uid, eventId }));
              })
              .catch((err) => {
                console.error("Error creating event: ", err);
                dispatch(FB_errorCreatingEvent(err));
              });
          })
          .catch((respData) => {
            dispatch(
              DB_errorCreatingEvent(respData.msg ? respData.msg : respData)
            );
          });
      } else {
        // TODO: You should probably delete the event from firebase when this happens
        dispatch(DB_errorCreatingEvent(dataForDB.error));
        console.error(dataForDB.error);
      }
    }
  });
};

const refactorForDBSubmit = (data) => {
  // sigh, this whole thing is ...
  const temp = {};

  const stripToTimeString = (rawTimeNum) => {
    return convertTimeOfDayToDateObj(rawTimeNum).toString().slice(16, 24);
  };
  
  if (typeof data["End time"] === "string") {
    temp.end_time = data["End time"].replace(/T/g, " ").concat(":00");
  } else if (typeof data["end time"] === "number") {
    console.log(" visited end time check", data["end time"]);
    temp.end_time = stripToTimeString(data["end time"]);
  } else {
    console.log(
      "BAD TIME INPUT - End time: " + data["End time"],
      ", end time: " + data["end time"]
    );
    temp.error = "Bad Time Input";
  }

  if (typeof data["Start time"] === "string") {
    console.log(" visited Start time check");
    temp.start_time = data["Start time"].replace(/T/g, " ").concat(":00");
  } else if (
    typeof data["start time"] === "number" &&
    data.eventType !== "oneTimeEvent"
  ) {
    console.log(" visited start time check", data["start time"]);

    temp.start_time = stripToTimeString(data["start time"]);
  } else {
    console.log(
      "BAD TIME INPUT - Start time: " + data["Start time"],
      ", start time: " + data["start time"]
    );
    temp.error = "Bad Time Input";
  }

  switch (data.eventType) {
    case "oneTimeEvent":
      temp.event_type = "ONE_TIME";
      break;
    case "Daily":
      temp.event_type = "DAILY";
      break;
    case "Weekly":
      temp.event_type = "WEEKLY";
      break;
    case "Weekend":
      temp.event_type = "SAT_SUN";
      break;
    case "Weekday":
      temp.event_type = "MON_FRI";
      break;
    default:
      temp.event_type = "ONE_TIME";
      break;
  }

  temp.event_id = data.eventId;
  temp.business_id = data.uid;
  temp.event_description = data["Event Description"];
  temp.event_name = data["Event Name"];
  temp.going_number = data.goingnumber;
  temp.unique_seen = data.uniqueSeen;
  temp.is_canceled = 0;
  // temp.categories = data.categories;
  temp.category = data.category;
  temp.latitude = data.location.lat;
  temp.longitude = data.location.lng;

  var d = new Date();
  var tznOffset = d.getTimezoneOffset();
  var { asString } = minsTo_HourMin(tznOffset);
  temp.time_zone = asString;

  // existingImages: data.existingImages,
  // editingEvent: true,
  console.log(temp);
  return temp;
};

export const updateEvent = (uid, eventId, eventData) => (dispatch) => {
  var dataForDB = { ...eventData }; // take data before it is altered during firebase submit
  console.log("uid and event id respectively", uid, eventId);
  if (uid && eventId) {
    dataForDB = refactorForDBSubmit({ ...dataForDB, uid, eventId });
    if (typeof dataForDB.error === "undefined") {
      dispatch(DB_updateEventRequest());
      post_UpdateEvent(dataForDB)
        .then((respData) => {
          dispatch(DB_updateEventSuccess(respData.msg));
          dispatch(FB_updateEventRequest());
          var batch = firestore.batch(); //do a batched write

          writeEvent(uid, eventId, eventData, batch, dispatch)
            .then((res) => {
              dispatch(FB_updateEventSuccess(res));
            })
            .catch((err) => {
              console.error("Error updating event: ", err);
              dispatch(FB_errorUpdatingEvent(err));
            });
        })
        .catch((respData) => {
          dispatch(
            DB_errorUpdatingEvent(respData.msg ? respData.msg : respData)
          );
        });
    } else {
      dispatch(DB_errorUpdatingEvent(dataForDB.error));
      console.error("Error Updating Event in DB: ", dataForDB.error);
    }
  }
};

export const updateEventCancellation = (uid, eventId, status) => (dispatch) => {
  dispatch(FB_updateEventRequest());
  console.log("uid and event id respectively", uid, eventId);
  if (uid && eventId) {
    firestore
      .collection("businessAccounts")
      .doc(uid)
      .collection("CurrentEvent")
      .doc(eventId)
      .update({
        isCanceled: status,
      })
      .then(() => {
        var asNum = status === true ? 1 : 0;
        dispatch(post_UpdateEvent({ event_id: eventId, is_canceled: asNum }));
        dispatch(FB_updateEventSuccess("Document Updated"));
      })
      .catch((err) => {
        console.error("Error updating event: ", err);
        // dispatch(FB_errorUpdatingEvent(err));
      });
  }
};

export const cleanUserLocationEvent = () => (dispatch) => {
  dispatch(cleanUserLocEvents());
};

export const clearOnCreateSuccessEvent = () => (dispatch) => {
  dispatch(clearOnSuccessfulCreate());
};

export const clearOnUpdateSuccessEvent = () => (dispatch) => {
  dispatch(clearOnSuccessfulUpdate());
};

export const cleanEventState = () => (dispatch) => {
  dispatch(cleanEvent_ResetState());
};

const writeEvent = async (uid, existingEventId, data, batch, dispatch) => {
  // delete redundant placeholder data
  console.log("Within 'writeEvent' method");

  if (data.existingImages) delete data.existingImages; //TODO: users should be able to 'add on' to previously uploaded images , so this should be fixed/ broadened
  if (data.editingEvent) delete data.editingEvent;

  let eventId;
  if (existingEventId === null) {
    eventId = uuidv4().toUpperCase();
  } else {
    eventId = existingEventId;
  }

  try {
    console.log(data);

    return (async function () {
      console.log("About to write images");
      if (data.images && data.images.length !== 0) {
        console.log("Writing images");
        dispatch(startMediaUpload());
        var eventImagesRef = firestore.doc(
          `businessAccounts/${uid}/CurrentEvent/${eventId}`
        );
        const images = {};
        //  Following code is this way because of how they set up the firebase :/. i hate it as well
        if (data.images[0]) {
          try {
            var imageUrl = await uploadEventImage(
              data.images[0],
              eventId,
              uid,
              dispatch
            );
            if (data.images[0].type.includes("video")) {
              // batch.set(eventImagesRef, { images: { video1: imageUrl } });
              images.video1 = imageUrl;
            } else {
              // batch.set(eventImagesRef, { images: { image1: imageUrl } });
              images.image1 = imageUrl;
            }
          } catch (error) {
            dispatch(mediaUploadFailure(error));
          }
        }
        if (data.images[1]) {
          try {
            var imageUrl2 = await uploadEventImage(
              data.images[1],
              eventId,
              uid,
              dispatch
            );
            if (data.images[1].type.includes("video")) {
              // batch.update(eventImagesRef, { images: { video2: imageUrl2 } });
              images.video2 = imageUrl2;
            } else {
              // batch.update(eventImagesRef, { images: { image2: imageUrl2 } });
              images.image2 = imageUrl2;
            }
          } catch (error) {
            dispatch(mediaUploadFailure(error));
          }
        }
        if (data.images[2]) {
          try {
            var imageUrl3 = await uploadEventImage(
              data.images[2],
              eventId,
              uid,
              dispatch
            );
            if (data.images[2].type.includes("video")) {
              // batch.update(eventImagesRef, { images: { video3: imageUrl3 } });
              images.video3 = imageUrl3;
            } else {
              // batch.update(eventImagesRef, { images: { image3: imageUrl3 } });
              images.image3 = imageUrl3;
            }
          } catch (error) {
            dispatch(mediaUploadFailure(error));
          }
        }

        delete data.images; //remove from object after individual uplaods are done.
        // ===== new addition =====
        batch.set(eventImagesRef, { images });
        dispatch(mediaUploadComplete());
      } else {
        delete data.images; // there are no images, so remove this entry
      }
      console.log("Setting Event times...");

      // Logic seperating time for repeating versus one time events, detailed explanation in authUserPege/CurrentEvent
      var dataAdjustedForTime = {};
      if (data.eventType === "oneTimeEvent") {
        data["Start time"] = firestoreTimeStamp.fromDate(
          new Date(data["Start time"])
        );
        data["End time"] = firestoreTimeStamp.fromDate(
          new Date(data["End time"])
        );
        delete data["start time"];
        delete data["end time"];
        dataAdjustedForTime = data;
      } else {
        dataAdjustedForTime = { ...data };
        console.log(dataAdjustedForTime);
        dataAdjustedForTime["repeat interval"] =
          dataAdjustedForTime.eventType?.replace(/repeats/g, "");
        dataAdjustedForTime.repeats = true;
        delete dataAdjustedForTime.eventType;
        delete dataAdjustedForTime["Start time"];
        delete dataAdjustedForTime["End time"];
      }
      var d = new Date();
      var tznOffset = d.getTimezoneOffset();
      var { hour, minute } = minsTo_HourMin(tznOffset);
      dataAdjustedForTime.time_zone = { hour, minute };

      // var myTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
      var eventRef = firestore.doc(
        `businessAccounts/${uid}/CurrentEvent/${eventId}`
      );
      batch.update(eventRef, {
        ...dataAdjustedForTime,
        eventid: eventId,
        busuid: uid,
      });
      batch.commit().catch((err) => {
        console.log("Batch commit error: ");
      });
      console.log("Event Should now be created / updated");
      return { uid, eventId };
    })();
  } catch (error) {
    console.log("Error Creating event: ", error);
  }
};
/**
 * This method will be slowly phased out as the structure for storing images have
 * been changed recently to sit in the main evrnt folder businessAccounts/${uid}/CurrentEvent/${eventId}/
 * rather than businessAccounts/${uid}/CurrentEvent/${eventId}/images/images
 * @param {string} uid
 * @param {string} eventId
 * @returns collection contianing image urls
 */
const getEventImages = async (uid, eventId) => {
  console.log("running get business event images");
  if (!uid) return null;
  try {
    const images = await firestore
      .doc(`businessAccounts/${uid}/CurrentEvent/${eventId}/images/images`)
      .get()
      .then((theImages) => {
        // console.log(theImages);
        // console.log(theImages.data());
        return theImages.data();
      });
    return { ...images };
  } catch (error) {
    //TODO: Proper error handling. here would be an ideal spot to send logs too
    console.error(
      "Error fetching Event Images for user: ",
      uid,
      " EventId: ",
      eventId,
      error
    );
  }
};

const uploadEventImage = async (image, eventId, uid, dispatch) => {
  try {
    const uploadTask = await storage
      .ref(
        `/businessUsers/eventImages/${uid}/${eventId}/${uuidv4().toUpperCase()}`
      ) //put in nested folder and rename it to a randome uuid
      .put(image);
    var progress = (uploadTask.bytesTransferred / uploadTask.totalBytes) * 100;
    dispatch(mediaUploadProgress(image, progress));
    // Chaining 'on' to observe state and get image upload status, not needed
    // .on("state_changed", (snapshot) => {
    //   var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //   console.log("Upload is " + progress + "% done");
    //   switch (snapshot.state) {
    //     case firebase.storage.TaskState.PAUSED: // or 'paused'
    //       console.log("Upload is paused");
    //       break;
    //     case firebase.storage.TaskState.RUNNING: // or 'running'
    //       console.log("Upload is running");
    //       break;
    //     default:
    //       console.log(
    //         "you seem to have reached the dfault case of this swithc sytatement. this is likely a bug in the code. contact support"
    //       );
    //   }
    // });

    const downloadURL = await uploadTask.ref.getDownloadURL();
    console.log(downloadURL);

    return downloadURL;
  } catch (error) {
    console.error("Failed to do image upload because: ", error);
  }
};

//Don't repeat yourself
const DRY = async (ref, uid) => {
  const tempArray = [];
  return await ref
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(async (doc) => {
        // doc.data() is never undefined for query doc snapshots

        console.log(doc.id, " => ", doc.data());
        tempArray.push({
          eventId: doc.id,
          images: await getEventImages(uid, doc.id), // No longer in use, spereading doc.data should overrite images if none exists
          ...doc.data(),
        });
      });
      return tempArray;
    })
    .catch((err) =>
      console.log("Error getting Past events for user: ", uid, err)
    );
};
