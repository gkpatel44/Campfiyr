import { dashBoardTypes } from "../types";

const setEnteredLocation = (loc) => {
  return {
    type: dashBoardTypes.SET_DASHBOARD_LOCATION,
    payload: loc,
  };
};

export const setDashboardLocation = (loc) => (dispatch) => {
  dispatch(setEnteredLocation(loc));
};
