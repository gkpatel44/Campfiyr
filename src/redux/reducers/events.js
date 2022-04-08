/* eslint-disable import/no-anonymous-default-export */
import {
  CLEAN_EVENT_STATE,
  EVENTS_PULL_REQUEST,
  EVENTS_PULL_SUCCESS,
  EVENTS_PULL_FAILURE,
  // LOGIN_SUCCESS,
  authTypes,
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
  EVENTS_BY_LOCATION_PULL_REQUEST,
  EVENTS_BY_LOCATION_PULL_SUCCESS,
  EVENTS_BY_LOCATION_PULL_FAILURE,
  USER_EVENTS_BY_LOCATION_PULL_SUCCESS,
  USER_EVENTS_BY_LOCATION_PULL_FAILURE,
  USER_EVENTS_BY_LOCATION_PULL_REQUEST,
  CLEAR_LOCATION_EVENT_DATA,
  CLEAR_USER_LOCATION_EVENT_DATA,
  CLEAR_ON_SUCCESSFUL_CREATE,
  CLEAR_ON_SUCCESSFUL_UPDATE,
  MEDIA_UPLOAD_REQUEST,
  MEDIA_UPLOAD_PROCESSING,
  MEDIA_UPLOAD_COMPLETE,
  MEDIA_UPLOAD_FAILURE,
} from "../types";

export default (
  state = {
    isRetrievingEvents: false,
    isRetrievingEventFB: false,
    isRetrievingEventDB: false,
    errorRetrievingEvents: false,
    errorRetrievingEventFB: false,
    errorRetrievingEventDB: false,

    isCreatingEventDB: false,
    isCreatingEventFB: false,
    errorCreatingEventDB: null,
    errorCreatingEventFB: null,
    isEventSuccessfullyCreatedDB: null,
    isEventSuccessfullyCreatedFB: null,

    isUpdatingEventFB: null,
    isUpdatingEventDB: null,
    errorUpdatingEventFB: null,
    errorUpdatingEventDB: null,
    isEventSuccessfullyUpdatedDB: null,
    isEventSuccessfullyUpdatedFB: null,

    currUserEvents: [],
    isRetrievingUserLocationEvents: null,
    errorRetrievingUserLocationEvents: null,
    userLocationEvents: [],

    specificEventFB: {},
    specificEventDB: {},
    updatedEvent: null,
    error: "",

    events: [{}],
    allEvents: {
      pastEvents: [],
      activeEvents: [],
      /* Decommisioned 2021-03-28
      weeklyEvents: [],
      dailyEvents: [],
      */
      repeatingEvents: [],
      eventsCancelled: [],
    },

    newEvent: {},
    locationEvents: [],

    isUploadingMedia: null,
    errorUploadingMedia: null,
    progress: {
      media: null, //can be file name
      percentage: 0,
    },
  },
  action
) => {
  switch (action.type) {
    case CLEAN_EVENT_STATE: //maybe rename this to be more specific if it is only used for updating event state
      return {
        ...state, // add more here as time passes
        isUpdatingEventFB: null,
        isUpdatingEventDB: null,
        errorUpdatingEventFB: null,
        errorUpdatingEventDB: null,
        isEventSuccessfullyUpdatedDB: null,
        isEventSuccessfullyUpdatedFB: null,
        specificEventFB: {},
        specificEventDB: {},
      };

    case EVENTS_PULL_REQUEST:
      return {
        ...state,
        isRetrievingEvents: true,
        errorRetrievingEvents: false,
        allEvents: {
          pastEvents: [],
          activeEvents: [],
          weeklyEvents: [],
          dailyEvents: [],
          repeatingEvents: [],
          cancelledEvents: [],
        },
      };
    case EVENTS_PULL_SUCCESS:
      return {
        ...state,
        isRetrievingEvents: false,
        errorRetrievingEvents: false,
        allEvents: action.payload,
      };
    case EVENTS_PULL_FAILURE:
      return {
        ...state,
        isRetrievingEvents: false,
        errorRetrievingEvents: true,
        allEvents: {
          pastEvents: [],
          activeEvents: [],
          weeklyEvents: [],
          dailyEvents: [],
          repeatingEvents: [],
          eventsCancelled: [],
        },
      };
    case EVENTS_BY_LOCATION_PULL_REQUEST:
      return {
        ...state,
        isRetrievingLocationEvents: true,
        errorRetrievingLocationEvents: false,
        locationEvents: [],
        error: "",
      };
    case EVENTS_BY_LOCATION_PULL_SUCCESS:
      return {
        ...state,
        isRetrievingLocationEvents: false,
        errorRetrievingLocationEvents: false,
        locationEvents: action.payload,
        error: "",
      };
    case EVENTS_BY_LOCATION_PULL_FAILURE:
      return {
        ...state,
        isRetrievingLocationEvents: false,
        errorRetrievingLocationEvents: true,
        error: action.payload,
        locationEvents: [],
      };
    case CLEAR_LOCATION_EVENT_DATA:
      return {
        ...state,
        isRetrievingLocationEvents: false,
        errorRetrievingLocationEvents: false,
        locationEvents: [],
      };
    case USER_EVENTS_BY_LOCATION_PULL_REQUEST:
      return {
        ...state,
        isRetrievingUserLocationEvents: true,
        errorRetrievingUserLocationEvents: false,
        userLocationEvents: [],
      };
    case USER_EVENTS_BY_LOCATION_PULL_SUCCESS:
      return {
        ...state,
        isRetrievingUserLocationEvents: false,
        errorRetrievingUserLocationEvents: false,
        userLocationEvents: action.payload,
      };
    case USER_EVENTS_BY_LOCATION_PULL_FAILURE:
      return {
        ...state,
        isRetrievingUserLocationEvents: false,
        errorRetrievingUserLocationEvents: true,
        userLocationEvents: [],
      };
    case CLEAR_USER_LOCATION_EVENT_DATA:
      return {
        ...state,
        isRetrievingUserLocationEvents: null,
        errorRetrievingUserLocationEvents: null,
        userLocationEvents: [],
      };
    case CURRENT_EVENT_PULL_REQUEST:
      return {
        ...state,
        isRetrievingEvents: true,
        errorRetrievingEvents: false,
        events: [{}],
      };
    case CURRENT_EVENT_PULL_SUCCESS:
      return {
        ...state,
        isRetrievingEvents: false,
        errorRetrievingEvents: false,
        events: action.payload,
      };
    case CURRENT_EVENT_PULL_FAILURE:
      return {
        ...state,
        isRetrievingEvents: false,
        errorRetrievingEvents: true,
        events: [{}],
      };
    case SPECIFIED_EVENT_PULL_REQUEST_FB:
      return {
        ...state,
        isRetrievingEventFB: true,
        errorRetrievingEventFB: false,
        specificEventFB: {},
      };
    case SPECIFIED_EVENT_PULL_SUCCESS_FB:
      return {
        ...state,
        isRetrievingEventFB: false,
        errorRetrievingEventFB: false,
        specificEventFB: action.payload,
      };
    case SPECIFIED_EVENT_PULL_FAILURE_FB:
      return {
        ...state,
        isRetrievingEventFB: false,
        errorRetrievingEventFB: true,
        specificEventFB: {},
      };
    case SPECIFIED_EVENT_PULL_REQUEST_DB:
      return {
        ...state,
        isRetrievingEventDB: true,
        errorRetrievingEventDB: false,
        specificEventDB: {},
      };
    case SPECIFIED_EVENT_PULL_SUCCESS_DB:
      return {
        ...state,
        isRetrievingEventDB: false,
        errorRetrievingEventDB: false,
        specificEventDB: action.payload,
        error: {},
      };
    case SPECIFIED_EVENT_PULL_FAILURE_DB:
      return {
        ...state,
        isRetrievingEventDB: false,
        errorRetrievingEventDB: true,
        specificEventDB: {},
        error: action.payload,
      };
    case USER_EVENT_PULL_REQUEST:
      return {
        ...state,
        isRetrievingEvent: true,
        errorRetrievingEvent: false,
        currUserEvents: [],
      };
    case USER_EVENT_PULL_SUCCESS:
      return {
        isRetrievingEvent: false,
        errorRetrievingEvent: false,
        currUserEvents: action.payload,
      };
    case USER_EVENT_PULL_FAILURE:
      return {
        isRetrievingEvent: false,
        errorRetrievingEvent: true,
        currUserEvents: [],
      };
    case CREATE_EVENT_REQUEST_FB:
      return {
        ...state,
        isCreatingEventFB: true,
        errorCreatingEventFB: false,
        isEventSuccessfullyCreatedFB: false,
        newEvent: {},
        error: "",
      };
    case CREATE_EVENT_SUCCESS_FB:
      return {
        ...state,
        isCreatingEventFB: false,
        errorCreatingEventFB: false,
        isEventSuccessfullyCreatedFB: true,
        newEvent: action.payload,
        error: "",
      };
    case CREATE_EVENT_FAILURE_FB:
      return {
        ...state,
        isCreatingEventFB: false,
        errorCreatingEventFB: true,
        isEventSuccessfullyCreatedFB: false,
        newEvent: {},
        error: action.payload,
      };

    case CREATE_EVENT_REQUEST_DB:
      return {
        ...state,
        isCreatingEventDB: true,
        errorCreatingEventDB: false,
        isEventSuccessfullyCreatedDB: false,
        msg: "",
        error: "",
      };
    case CREATE_EVENT_SUCCESS_DB:
      return {
        ...state,
        isCreatingEventDB: false,
        errorCreatingEventDB: false,
        isEventSuccessfullyCreatedDB: true,
        msg: action.payload,
        error: "",
      };
    case CREATE_EVENT_FAILURE_DB:
      return {
        ...state,
        isCreatingEventDB: false,
        errorCreatingEventDB: true,
        isEventSuccessfullyCreatedDB: false,
        msg: null,
        error: action.payload,
      };
    case CLEAR_ON_SUCCESSFUL_CREATE:
      return {
        ...state,
        isCreatingEventDB: null,
        isCreatingEventFB: null,
        errorCreatingEventDB: null,
        errorCreatingEventFB: null,
        isEventSuccessfullyCreatedDB: null,
        isEventSuccessfullyCreatedFB: null,
        msg: "",
        error: "",
      };
    case CLEAR_ON_SUCCESSFUL_UPDATE:
      return {
        ...state,
        isUpdatingEventDB: null,
        isUpdatingEventFB: null,
        errorUpdatingEventDB: null,
        errorUpdatingEventFB: null,
        isEventSuccessfullyUpdatedDB: null,
        isEventSuccessfullyUpdatedFB: null,
        msg: "",
        error: "",
      };
    case UPDATE_EVENT_REQUEST_FB:
      return {
        ...state,
        isUpdatingEventFB: true,
        errorUpdatingEventFB: null,
        isEventSuccessfullyUpdatedFB: null,
        updatedEvent: null,
        error: "",
      };
    case UPDATE_EVENT_SUCCESS_FB:
      return {
        ...state,
        isUpdatingEventFB: false,
        errorUpdatingEventFB: false,
        isEventSuccessfullyUpdatedFB: true,
        updatedEvent: action.payload,
        error: "",
      };
    case UPDATE_EVENT_FAILURE_FB:
      return {
        ...state,
        isUpdatingEventFB: false,
        errorUpdatingEventFB: true,
        isEventSuccessfullyUpdatedFB: false,
        updatedEvent: null,
        error: action.payload,
      };
    case UPDATE_EVENT_REQUEST_DB:
      return {
        ...state,
        isUpdatingEventDB: true,
        errorUpdatingEventDB: null,
        isEventSuccessfullyUpdatedDB: null,
        msg: null,
        error: "",
      };
    case UPDATE_EVENT_SUCCESS_DB:
      return {
        ...state,
        isUpdatingEventDB: false,
        errorUpdatingEventDB: false,
        isEventSuccessfullyUpdatedDB: true,
        msg: action.payload,
        error: "",
      };
    case UPDATE_EVENT_FAILURE_DB:
      return {
        ...state,
        isUpdatingEventDB: false,
        errorUpdatingEventDB: true,
        isEventSuccessfullyUpdatedDB: false,
        msg: null,
        error: action.payload,
      };
    case MEDIA_UPLOAD_REQUEST:
      return {
        ...state,
        isUploadingMedia: true,
        errorUploadingMedia: false,
        progress: {
          media: null, //can be file name .. maybe expand this to store state of multiple files being uploaded array?
          percentage: 0,
        },
      };
    case MEDIA_UPLOAD_PROCESSING:
      return {
        ...state,
        isUploadingMedia: true,
        errorUploadingMedia: false,
        progress: {
          media: action.payload.media, //can be file name
          percentage: action.payload.percentage,
        },
      };
    case MEDIA_UPLOAD_COMPLETE:
      return {
        ...state,
        isUploadingMedia: false,
        errorUploadingMedia: false,
        // progress: {
        //   media: null,
        //   percentage: 0,
        // },
      };
    case MEDIA_UPLOAD_FAILURE:
      return {
        ...state,
        isUploadingMedia: false,
        errorUploadingMedia: true,
        mediaError: action.payload,
        progress: {
          media: null,
          percentage: 0,
        },
      };
    case authTypes.LOGOUT_SUCCESS:
      return {
        isRetrievingEvents: false,
        isRetrievingEvent: false,
        isCreatingEvent: false,
        errorRetrievingEvents: false,
        errorRetrievingEvent: false,
        errorCreatingEventFB: null,
        errorCreatingEventDB: null,
        isEventSuccessfullyCreated: false,

        error: "",
        events: [{}],
        newEvent: {},
        // no need to update/ clear locationEvents on logout
        locationEvents: [...state.locationEvents],
      };
    default:
      return state;
  }
};
