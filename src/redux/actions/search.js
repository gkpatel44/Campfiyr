import axios from "axios";
import { fbFunctionsEndpoints } from "../../util/keywords";
import { uiTypes } from "../types";

const requestSearchResults = (data) => {
  return {
    type: uiTypes.SEARCH_REQUEST,
    payload: data,
  };
};

const receiveSearchResults = (data) => {
  return {
    type: uiTypes.SEARCH_PAGE_COMPLETE,
    payload: data,
  };
};

const failedSearchResults = (data) => {
  return {
    type: uiTypes.SEARCH_FAILURE,
    payload: data,
  };
};

export const getSearchResults = (endpoint, queryParam) => (dispatch) => {
  switch (endpoint) {
    case "all":
      getSearchResult(fbFunctionsEndpoints.search.all, queryParam, dispatch);
      break;
    case "people":
      getSearchResult(fbFunctionsEndpoints.search.people, queryParam, dispatch);

      break;
    case "businesses":
      getSearchResult(
        fbFunctionsEndpoints.search.businesses,
        queryParam,
        dispatch
      );
      break;
    case "categories":
      getSearchResult(
        fbFunctionsEndpoints.search.category,
        queryParam,
        dispatch
      );
      break;
    case "events":
      break;

    default:
      console.log("ended up in default case");
      break;
  }
};

const getSearchResult = (endpoint, queryParam, dispatch) => {
  dispatch(requestSearchResults(queryParam));
  axios
    .get(endpoint, { params: { q: queryParam } })
    .then((resp) => {
      dispatch(receiveSearchResults(resp.data.data));
    })
    .catch((err) => {
      dispatch(failedSearchResults(err));
    });
};
