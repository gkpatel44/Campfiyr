/* eslint-disable import/no-anonymous-default-export */
import { uiTypes, authTypes } from "../types";

const defaultState = {
  updateAvalable: null,
  notifications: [],
  uiAlerts: {
    emailVerified: true, // this toggle needs to be true by default as firebase will be the tie breaker
    incompleteProfile: true, // also enabled by default
  },
  searching: false,
  searchResults: [],
  lastCall: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case uiTypes.SET_UPDATE_AVAILABLE: // this is all thayt maters tbh, the other two are whatever
      return {
        ...state,
        updateAvalable: action.payload,
      };
    case uiTypes.CHECK_UPDATE_AVAILABLE:
      return {
        ...state,
        updateAvalable: null,
      };
    case uiTypes.CLEAR_UPDATE_AVAILABLE:
      return {
        ...state,
        updateAvalable: null,
      };
    case uiTypes.ENQUEUE_SNACKBAR:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.key,
            ...action.notification,
          },
        ],
      };
    case uiTypes.CLOSE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          action.dismissAll || notification.key === action.key
            ? { ...notification, dismissed: true }
            : { ...notification }
        ),
      };

    case uiTypes.REMOVE_SNACKBAR:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.key !== action.key
        ),
      };
    case uiTypes.TOGGLE_ALERT: {
      return {
        ...state,
        uiAlerts: { ...state.uiAlerts, ...action.payload },
      };
    }
    case uiTypes.SEARCH_INITIAL:
      return {
        ...state,
        searching: true,
        searchResults: defaultState.searchResults,
        lastCall: null,
      };
    case uiTypes.SEARCH_ADVANCE:
      return {
        ...state,
        searching: true,
        lastCall: action.payload,
      };
    case uiTypes.SEARCH_BAR_COMPLETE:
      return {
        ...state,
        searching: false,
        lastCall: action.lastCall,
        searchResults:
          Array.isArray(action.results) &&
          mergeArray(state.searchResults, action.results),
      };
    case authTypes.LOGOUT_SUCCESS:
      return { ...defaultState, notifications: [] };

    default:
      return state;
  }
};

const mergeArray = (array1, array2) => {
  return arrayUnique(array1.concat(array2));
};

function arrayUnique(array) {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i].id === a[j].id) a.splice(j--, 1);
    }
  }

  return a;
}
