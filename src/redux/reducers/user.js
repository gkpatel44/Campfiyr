/* eslint-disable import/no-anonymous-default-export */
import {
  VERIFY_USER_TYPE_REQUEST,
  VERIFY_USER_TYPE_SUCCESS,
  VERIFY_USER_TYPE_FAILURE,
  ADD_FRIEND_FOLLOW_REQUEST,
  ADD_FRIEND_FOLLOW_SUCCESS,
  ADD_FRIEND_FOLLOW_FAILURE,
  CLEAR_USER,
  BAD_SEARCH,
  authTypes,
} from "../types";

export default (
  state = {
    isRetrievingUserData: false,
    errorRetrievingUserData: false,
    isUserABusiness: null,
    isAlreadyFriend: null,
    isAlreadyFollowing: null,
    userData: [{}],
  },
  action
) => {
  switch (action.type) {
    case VERIFY_USER_TYPE_REQUEST:
      return {
        ...state,
        isRetrievingUserData: true,
        userData: [{}],
        isUserABusiness: null,
      };
    case VERIFY_USER_TYPE_SUCCESS:
      return {
        ...state,
        isRetrievingUserData: false,
        errorRetrievingUserData: false,
        userData: action.payload,
        isUserABusiness: action.payload.type === "business",
      };
    case VERIFY_USER_TYPE_FAILURE:
      return {
        ...state,
        isRetrievingUserData: false,
        errorRetrievingUserData: false,
        error: action.payload,
        isUserABusiness: null,
        userData: [{}],
      };
    case CLEAR_USER:
      return { ...state, userData: [{}] };
    case ADD_FRIEND_FOLLOW_REQUEST:
      return {
        ...state,
        isAlreadyFriend: true,
        isAlreadyFollowing: true,
        userData: [{}],
      };
    case ADD_FRIEND_FOLLOW_SUCCESS:
      return {
        ...state,
        isAlreadyFriend: true,
        isAlreadyFollowing: true, // this might come back to bite me in the ass
        error: "",
      };
    case ADD_FRIEND_FOLLOW_FAILURE:
      return {
        ...state,
        isAlreadyFriend: null,
        isAlreadyFollowing: null,
        error: action.payload,
      };
    case BAD_SEARCH:
      return {
        ...state,
        allUsersAndBusinesses: action.payload,
        allUsersAndBusinessesLastPull: new Date(),
      };
    case authTypes.LOGOUT_SUCCESS:
      return {
        isRetrievingUserData: false,
        errorRetrievingUserData: false,
        isUserABusiness: null,
        isAlreadyFriend: null,
        isAlreadyFollowing: null,
        userData: [{}],
      };
    default:
      return state;
  }
};
