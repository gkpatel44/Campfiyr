import { dashBoardTypes } from "../types";

const defaultState = {
  location: {
    // Default to Toronto
    lat: 43.6487,
    lng: -79.38544,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  switch (action.type) {
    case dashBoardTypes.SET_DASHBOARD_LOCATION:
      return {
        ...state,
        location: action.payload,
      };
    default:
      return state;
  }
};
