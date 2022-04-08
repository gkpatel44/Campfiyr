import { isString } from "formik";
import { uiTypes } from "../types";

const defaultState = {
  searchData: {},
  recentSearches: [],
  searchError: { error: false, msg: "" },
  isSearching: false,
};

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = defaultState, action) => {
  switch (action.type) {
    case uiTypes.SEARCH_REQUEST:
      return {
        ...state,
        searchData: defaultState.searchData,
        recentSearches: [
          ...new Set([
            ...state.recentSearches,
            isString(action.payload) && action.payload,
          ]),
        ],
        searchError: defaultState.searchError,
        isSearching: true,
      };
    case uiTypes.SEARCH_FAILURE:
      return {
        ...state,
        searchData: defaultState.searchData,
        searchError: { error: true, msg: action.payload },
        isSearching: false,
      };
    case uiTypes.SEARCH_PAGE_COMPLETE:
      return {
        ...state,
        searchData: action.payload,
        searchError: defaultState.searchError,
        isSearching: false,
      };
    default:
      return state;
  }
};
