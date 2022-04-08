/* eslint-disable import/no-anonymous-default-export */
import { authTypes } from "../types";

const defaultState = {
  isLoggingIn: false,
  isLoggingOut: false,
  isVerifying: false,
  isVerifyingCred: null,
  verifyingCredError: null,
  verifyingCredErrorObject: {},
  credVerified: null,

  loginError: false,
  signupError: false,
  verificationLinkStatus: {
    sending: null,
    sent: null,
    error: null,
    waiting: true,
  },

  logoutError: false,
  isAuthenticated: false,
  error: "",
  authError: "",
  user: {},
  userType: "",
  userData: { email: "email@email.com" },
  authData: {},
  authDataErr: null,
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case authTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        loginError: false,
        loginErrorObject: {},
      };
    case authTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        loginError: false,
        loginErrorObject: {},
        isAuthenticated: true,
        user: action.user,
      };
    case authTypes.LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        loginError: true,
        error: action.payload?.message || action.payload,
        loginErrorObject: action.payload,
      };

    case authTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        signupError: false,
        signupErrorObject: {},
      };
    case authTypes.SIGNUP_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        signupError: true,
        error: action.payload?.message || action.payload,
        signupErrorObject: action.payload,
      };
    case authTypes.AUTH_DATA_REQUEST:
      return {
        ...state,
        authData: {},
        authDataErr: null,
      };
    case authTypes.AUTH_DATA_SUCCESS:
      return {
        ...state,
        authData: action.payload,
        authDataErr: null,
      };
    case authTypes.AUTH_DATA_FAILURE:
      return {
        ...state,
        authData: {},
        authDataErr: action.payload,
      };
    case authTypes.LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        logoutError: false,
      };
    case authTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        user: {},
        userType: "",
        userData: { email: "email@email.com" },
      };
    case authTypes.LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        logoutError: true,
        error: action.payload,
      };
    case authTypes.WANT_VERIFICATION_LINK:
      return {
        ...state,
        verificationLinkStatus: {
          sending: true,
          sent: false,
          error: false,
          waiting: null,
        },
      };
    case authTypes.SENT_VERIFICATION_LINK:
      return {
        ...state,
        verificationLinkStatus: {
          sending: false,
          sent: true,
          error: false,
          waiting: null,
        },
      };
    case authTypes.FAIL_VERIFICATION_LINK:
      return {
        ...state,
        verificationLinkStatus: {
          sending: false,
          sent: false,
          error: true,
          waiting: true,
        },
      };
    case authTypes.VERIFY_REQUEST:
      return {
        ...state,
        isVerifying: true,
        verifyingError: false,
      };
    case authTypes.VERIFY_SUCCESS:
      return {
        ...state,
        isVerifying: false,
      };
    case authTypes.VERIFY_CRED_REQUEST:
      return {
        ...state,
        isVerifyingCred: true,
        verifyingCredError: false,
        credVerified: false,
      };
    case authTypes.VERIFY_CRED_SUCCESS:
      return {
        ...state,
        isVerifyingCred: false,
        verifyingCredError: false,
        credVerified: true,
      };
    case authTypes.VERIFY_CRED_FAILURE:
      return {
        ...state,
        isVerifyingCred: false,
        verifyingCredError: true,
        verifyingCredErrorObject: action.payload,
        credVerified: false,
      };
    case authTypes.SET_ERRORS:
      return {
        ...state,
        error: action.payload,
      };
    case authTypes.SET_USER_TYPE:
      return {
        ...state,
        userType: action.payload,
      };
    case authTypes.SET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    // ,
    // ,
    // ,
    case authTypes.PROFILE_UPDATE_REQUEST:
      return {
        ...state,
        profileUpdating: true,
      };
    case authTypes.PROFILE_UPDATE_SUCCESS:
      return {
        ...state,
        profileUpdating: false,
      };
    case authTypes.PROFILE_UPDATE_ERROR:
      return {
        ...state,
        profileUpdating: false,
        error: "Error updating user profile",
      };

    case authTypes.APPLY_PROMOCODE_REQUEST:
      return {
        ...state,
        isApplyingPromoCode: true,
        promoCodeApplied: false,
      };
    case authTypes.APPLY_PROMOCODE_SUCCESS:
      return {
        ...state,
        isApplyingPromoCode: false,
        promoCodeApplied: true,
        server_response: action.payload,
      };
    case authTypes.APPLY_PROMOCODE_FAILURE:
      return {
        ...state,
        isApplyingPromoCode: false,
        promoCodeApplied: false,
        promoCodeError: action.payload,
      };

    case authTypes.DEACTIVATE_ACCOUNT_REQUEST:
      return {
        ...state,
        //do something
      };
    case authTypes.DEACTIVATE_ACCOUNT_SUCCESS:
      return {
        ...state,
        //do something
      };
    case authTypes.DEACTIVATE_ACCOUNT_FAILURE:
      return {
        ...state,
        //do something
        nukeError: action.payload,
      };

    case authTypes.CLEAR_ERRORS:
      return {
        ...state,
        error: "",
      };
    default:
      return { ...defaultState, ...state };
  }
};
