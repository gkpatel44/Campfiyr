import isDev from "./devDetect";
export const dev = isDev();

// Database Keys
export const BUSINESSNAME = "business name";
export const FOLLOWERS = "followers";
export const EVENTNAME = "Event Name";
export const EVENT_ID = "event_id";
export const EVENTDESCRIPTION = "Event Description";
export const EVENT_COLLECTIONS = "Event Collections";
export const Album = "Album";

// Url Endpoints http://142.93.144.14/
export const DB_URL = "https://happenininfo.ca";
export const REACT_DB_PROXY = `/DB_Server`; /* /DB_Server gets redirected to https://happenininfo.ca/ . see setupProxy.js  -- only works in dev, not in production*/
export const SERVER_URL =
  // isDev()
  //   ? `${REACT_DB_PROXY}/happenin/dev`
  //   :
  `${DB_URL}/happenin/dev`;
export const CUSTOMER_LOGIN_ENDPOINT = `${SERVER_URL}/Service.php?Service=login&show_error=false`;
export const CUSTOMER_SIGNUP_ENDPOINT = `${SERVER_URL}/Service.php?Service=registration&show_error=false`;
// export const CUSTOMER_SIGNUP_ENDPOINT =
//   "http://142.93.144.14/happenin/dev/Service.php?Service=login&show_error=false";
export const GET_ALL_EVENTS_ENDPOINT = `${SERVER_URL}/Service.php?Service=getAllEvent&show_error=false`;
export const GET_SPECIFIC_EVENT_ENDPOINT = `${SERVER_URL}/Service.php?Service=getEventWithID&show_error=false`;
export const EDIT_EVENT_ENDPOINT = `${SERVER_URL}/Service.php?Service=editEvent&show_error=false`;
export const CREATE_EVENT_ENDPOINT = `${SERVER_URL}/Service.php?Service=create_event&show_error=false`;
export const GET_SURPRISE_EVENT_ENDPOINT = `${SERVER_URL}/Service.php?Service=getSurpriseEvent&show_error=false`;
// product
export const GET_USER_PRODUCT_CATEGORIES_ENDPOINT = `${SERVER_URL}/Service.php?Service=getProductCategory&show_error=false`;
export const GET_USER_PRODUCT_BYID_ENDPOINT = `${SERVER_URL}/Service.php?Service=getAllUserProduct&show_error=false`;
export const GET_USER_PRODUCT_ALL_SIZE_ID = `${SERVER_URL}/Service.php?Service=getProductSize&show_error=true`;

// report product
export const REPORT_PRODUCT = `${SERVER_URL}/Service.php?Service=reportProduct&show_error=false`;
export const HANDLE_PRODUCT_LIKE_DISLIKE = `${SERVER_URL}/Service.php?Service=likeUnlikeProduct&show_error=true`;
// cart
export const ADD_PRODUCT_To_CART = `${SERVER_URL}/Service.php?Service=addCart&show_error=false`;
export const GET_CART_LIST_DATA = `${SERVER_URL}/Service.php?Service=getCartList&show_error=false`;
export const DELETE_CART_ITEM_BY_ID = `${SERVER_URL}/Service.php?Service=deleteCart&show_error=false`;
export const UPDATE_CART_QUANTITY_BY_CART_ID = `${SERVER_URL}/Service.php?Service=updateQtyCart&show_error=false`;
export const APPLY_PROMOCODE_TO_CART = `${SERVER_URL}/Service.php?Service=validateProductPromoCode&show_error=false`;
export const GET_CART_ADDRESS_FOR_CHECKOUT = `${SERVER_URL}/Service.php?Service=getAddress&show_error=false`;
export const GET_PAYMENT_CARD_DETAILS_FOR_CHECKOUT = `${SERVER_URL}/Service.php?Service=getCardList&show_error=false`;
export const HANDLE_PRODUCT_CHECKOUT = `${SERVER_URL}/Service.php?Service=placeOrder&show_error=false`;







export const DB_ENDPOINTS = {
  CUSTOMER_LOGIN_ENDPOINT: `${SERVER_URL}/Service.php?Service=login&show_error=false`,
  CUSTOMER_SIGNUP_ENDPOINT: `${SERVER_URL}/Service.php?Service=registration&show_error=false`,
};
export const HAPPENIN_API_SECRET = process.env.HAPPENIN_API_SECRET;

export const FIREBASE_FUNCTIONS_ENDPOINT =
  // isDev()
  //   ? `http://127.0.0.1:5001/happening-82070/us-central1/webApi/api/v1/`
  //   :
  `https://us-central1-happening-82070.cloudfunctions.net/webApi/api/v1`;
export const FB_FUNCTIONS_VALIDATE_PROMO = `${FIREBASE_FUNCTIONS_ENDPOINT}/validate`;
export const authEndpoints = {
  nuke: `${FIREBASE_FUNCTIONS_ENDPOINT}/user/nuke`,
  //validatePromocode: `${FIREBASE_FUNCTIONS_ENDPOINT}/validate`,
  applyPromoCode: `${SERVER_URL}/Service.php?Service=promoCodeValidation&show_error=false`,
};
/**
 * This endpoint is set up to allow CORS for whatever target-url is specified to the path
 * it proxys the incoming request, adds cors headers and forwards to the target-url specified in the original request
 */
export const FB_FUNCTIONS_CORS_PROXY = `${FIREBASE_FUNCTIONS_ENDPOINT}/addCors/dontperceiveme`; // SEE HERE https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe/43881141#43881141
export const fbFunctionsEndpoints = {
  cors_proxy: FB_FUNCTIONS_CORS_PROXY,
  search: {
    all: `${FIREBASE_FUNCTIONS_ENDPOINT}/search/all`,
    people: `${FIREBASE_FUNCTIONS_ENDPOINT}/search/people`,
    businesses: `${FIREBASE_FUNCTIONS_ENDPOINT}/search/businesses`,
    category: `${FIREBASE_FUNCTIONS_ENDPOINT}/search/category`,
  },
  validatePromoCode: FB_FUNCTIONS_VALIDATE_PROMO,
  updateSubcategories: `${FIREBASE_FUNCTIONS_ENDPOINT}/businessCategories/updateSubCat`,
};
export const GEOLOCATIONDB_ENDPOINT = `https://geolocation-db.com/json/`;
