import axios from "axios";
import firebase from "firebase/app";
import {
  firebaseInstance,
  firebaseAnalytics,
  fprovider,
  gprovider,
  firestore,
  storage,
  firestoreTimeStamp,
} from "../../firebase/firebase";
import { purgeItWithFire } from "../../Root";
import {
  authEndpoints,
  DB_ENDPOINTS,
  fbFunctionsEndpoints,
  HAPPENIN_API_SECRET,
} from "../../util/keywords";
import {
  isEmptyString,
  isFileOrBlob,
  minsTo_HourMin,
  toDatabaseTimeFormat,
} from "../../util/util";
import { authTypes } from "../types";

import { getBusinessFollowers, getUserFriends } from "./user";
// import { pullCurrentEvent } from "./events";

const requestLogin = () => {
  return {
    type: authTypes.LOGIN_REQUEST,
  };
};

const receiveLogin = (user) => {
  return {
    type: authTypes.LOGIN_SUCCESS,
    user,
  };
};

const loginError = (errors) => {
  return {
    type: authTypes.LOGIN_FAILURE,
    payload: errors,
  };
};

const requestSignup = () => {
  return {
    type: authTypes.SIGNUP_REQUEST,
  };
};

const signupError = (errors) => {
  return {
    type: authTypes.SIGNUP_FAILURE,
    payload: errors,
  };
};

const requestLogout = () => {
  return {
    type: authTypes.LOGOUT_REQUEST,
  };
};

const receiveLogout = () => {
  return {
    type: authTypes.LOGOUT_SUCCESS,
  };
};

const authDataRequest = () => {
  return {
    type: authTypes.AUTH_DATA_REQUEST,
  };
};

const authDataSuccess = (data) => {
  return {
    type: authTypes.AUTH_DATA_SUCCESS,
    payload: data,
  };
};

const authDataFailure = (data) => {
  return {
    type: authTypes.AUTH_DATA_FAILURE,
    payload: data,
  };
};

const requestEmailVerification = () => {
  return {
    type: authTypes.WANT_VERIFICATION_LINK,
  };
};
const receiveEmailVerification = () => {
  return {
    type: authTypes.SENT_VERIFICATION_LINK,
  };
};
const errorSendingEmailVerification = () => {
  return {
    type: authTypes.FAIL_VERIFICATION_LINK,
  };
};
const logoutError = () => {
  return {
    type: authTypes.LOGOUT_FAILURE,
  };
};

const verifyRequest = () => {
  return {
    type: authTypes.VERIFY_REQUEST,
  };
};

const verifySuccess = () => {
  return {
    type: authTypes.VERIFY_SUCCESS,
  };
};

// verifying password when making account changes
const verifyCredRequest = () => {
  return {
    type: authTypes.VERIFY_CRED_REQUEST,
  };
};

const verifyCredSuccess = (data) => {
  return {
    type: authTypes.VERIFY_CRED_SUCCESS,
    payload: data,
  };
};

const verifyCredFailure = (err) => {
  return {
    type: authTypes.VERIFY_CRED_FAILURE,
    payload: err,
  };
};

const applyPromoCodeRequest = () => {
  return {
    type: authTypes.APPLY_PROMOCODE_REQUEST,
  };
};

const applyPromoCodeSuccess = (data) => {
  return {
    type: authTypes.APPLY_PROMOCODE_SUCCESS,
    payload: data,
  };
};

const applyPromoCodeFailure = (err) => {
  return {
    type: authTypes.APPLY_PROMOCODE_FAILURE,
    payload: err,
  };
};

const setUserData = (data) => {
  return {
    type: authTypes.SET_USER_DATA,
    payload: data,
  };
};

const setUserType = (data) => {
  return {
    type: authTypes.SET_USER_TYPE,
    payload: data,
  };
};

const setError = (userInQuestion) => {
  return {
    type: authTypes.SET_ERRORS,
    payload: userInQuestion,
  };
};

const updateProfileReq = () => {
  return {
    type: authTypes.PROFILE_UPDATE_REQUEST,
  };
};

const updateProfileSucess = () => {
  return {
    type: authTypes.PROFILE_UPDATE_SUCCESS,
  };
};
const updateProfileFail = () => {
  return {
    type: authTypes.PROFILE_UPDATE_ERROR,
  };
};

const deactivateAccRequest = () => {
  return {
    type: authTypes.DEACTIVATE_ACCOUNT_REQUEST,
  };
};

const deactivateAccFailure = (err) => {
  return {
    type: authTypes.DEACTIVATE_ACCOUNT_FAILURE,
    payload: err,
  };
};

const deactivateAccSuccess = () => {
  return {
    type: authTypes.DEACTIVATE_ACCOUNT_SUCCESS,
  };
};

const axiosConfig = (targetPath) => {
  // with proxy
  // cors bypass, by passing through firebase functions - improve this . properly secure the
  //digital ocean cors policy to only allow the happenin.ca ( or whatever it will be) domain
  return {
    headers: {
      "App-Secret": HAPPENIN_API_SECRET,
      "Content-Type": "application/json",
      "Target-URL": targetPath,
      // "Auth-Token": "not functional yet",
    },
  };
};

/*
  Creating promocode request
*/
const getPromoCodeRequest = (uid, promoCode, expirydate) => {
  var d = new Date();
  var tznOffset = d.getTimezoneOffset();
  var { asString } = minsTo_HourMin(tznOffset);
  return {
    business_id: uid,
    expiration_date: toDatabaseTimeFormat(expirydate),
    start_date: toDatabaseTimeFormat(d),
    time_zone: asString,
    promo_code: promoCode,
  };
};

/*
  Trigger API call if promocode is present
*/
const applyPromoCode = (userId, additionalData) => (dispatch) => {
  const { promoCode, expirydate } = additionalData;
  dispatch(applyPromoCodeRequest());
  axios
    .post(
      fbFunctionsEndpoints.cors_proxy,
      getPromoCodeRequest(userId, promoCode, expirydate),
      axiosConfig(authEndpoints.applyPromoCode)
    )
    .then((resp) => {
      if (resp.data.status === 1) {
        dispatch(applyPromoCodeSuccess(resp.data.msg));
      }
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        dispatch(applyPromoCodeFailure(err.response.data));
      }
      console.log("Fetch err", err);
    });
};

/*
  1.) Call to create a user subscription record.
  2.) If promocode is present than update record.
*/
export const postCustomerSignUp = (userId, additionalData) => (dispatch) => {
  dispatch(authDataRequest());
  const userData = { business_id: userId };
  axios
    .post(
      fbFunctionsEndpoints.cors_proxy,
      userData,
      axiosConfig(DB_ENDPOINTS.CUSTOMER_SIGNUP_ENDPOINT)
    )
    .then((res) => {
      if (res.data.status === 0) {
        dispatch(authDataFailure(res.data.msg));
      } else if (res.data.status === 1) {
        dispatch(authDataSuccess(res.data?.data));
        window.localStorage.setItem("Auth-Token", res.data?.data?.auth_token);
        if (!isEmptyString(additionalData.promoCode)) {
          dispatch(applyPromoCode(userId, additionalData));
        }
      }
    });
};

export const postLogin = (data) => (dispatch) => {
  dispatch(requestLogin());
  axios
    .post(
      fbFunctionsEndpoints.cors_proxy,
      data,
      axiosConfig(DB_ENDPOINTS.CUSTOMER_LOGIN_ENDPOINT)
    )
    .then((res) => {
      if (res.data.status === 0) {
        dispatch(authDataFailure(res.data.msg));
      } else if (res.data.status === 1) {
        dispatch(authDataSuccess(res.data.data));
        window.localStorage.setItem("Auth-Token", res.data?.data?.auth_token);
      }
    });
};

export const put_UploadSuggestedCategories = (data) => {
  // no need to dispatch as this doesn't really change application state
  axios.put(fbFunctionsEndpoints.updateSubcategories, data).catch((err) => {
    console.error(err);
  });
};

// Everything below here was created during the FIREBASE verstion of this application

export const loginUser = (email, password) => (dispatch) => {
  dispatch(requestLogin());
  firebaseInstance
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch(receiveLogin(user.user));
      dispatch(postLogin({ business_id: `${user.uid}` }));
      const method = user.credential.signInMethod;
      firebaseAnalytics.logEvent("login", { method });
    })
    .catch((error) => {
      dispatch(setError(error)); // i don't think this does anything?
      dispatch(loginError(error));
    });
};

export const loginWithGoogle = () => (dispatch) => {
  dispatch(requestLogin());
  firebaseInstance
    .auth()
    .signInWithPopup(gprovider)
    .then((user) => {
      dispatch(receiveLogin(user.user));
      let userData = {
        displayname: user.user.displayName,
        email: user.user.email,
        number: user.user.phoneNumber,
        imageDownloadURL: user.user.photoURL,
      };
      dispatch(generateUserData("client", userData));
      const method = user.credential.signInMethod;
      firebaseAnalytics.logEvent("login", { method });
    })
    .catch((error) => {
      dispatch(loginError(error));
    });
};
export const loginWithFacebook = () => (dispatch) => {
  dispatch(requestLogin());
  firebaseInstance
    .auth()
    .signInWithPopup(fprovider)
    .then((user) => {
      dispatch(receiveLogin(user.user));
      let userData = {
        displayname: user.user.displayName,
        email: user.user.email,
        number: user.user.phoneNumber,
        imageDownloadURL: user.user.photoURL,
      };
      dispatch(generateUserData("client", userData));
      const method = user.credential.signInMethod;
      firebaseAnalytics.logEvent("login", { method });
    })
    .catch((error) => {
      dispatch(loginError(error));
    });
};

export const signupUser = (email, password) => (dispatch) => {
  dispatch(requestSignup());
  firebaseInstance
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((user) => {
      dispatch(receiveLogin(user.user));
      dispatch(sendEmailVerification());
      const method = user.credential.signInMethod;
      firebaseAnalytics.logEvent("sign_up", { method });
    })
    .catch((error) => {
      dispatch(signupError(error));
      console.log(error);
    });
};

export const signupUserAndThen = (email, password) => {
  return (dispatch) => {
    dispatch(requestSignup());
    return new Promise((resolve, reject) => {
      firebaseInstance
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((user) => {
          dispatch(receiveLogin(user.user));
          dispatch(sendEmailVerification());
          // const method = user.credential.signInMethod;
          // firebaseAnalytics.logEvent("sign_up", { method });
          resolve();
        })
        .catch((error) => {
          dispatch(signupError(error));
          console.log(error);
          console.log(error.code);
          console.log(error.message);
          reject(error);
        });
    });
  };
};

export const sendEmailVerification = () => (dispatch) => {
  dispatch(requestEmailVerification());
  firebaseInstance
    .auth()
    .currentUser.sendEmailVerification()
    .then(() => {
      // Email Sent
      dispatch(receiveEmailVerification());
    })
    .catch((err) => {
      dispatch(errorSendingEmailVerification());
      console.log(err);
    });
};

export const verifyPassword = (password) => (dispatch) => {
  dispatch(verifyCredRequest());
  var user = firebaseInstance.auth().currentUser;
  var credential = firebase.auth.EmailAuthProvider.credential(
    firebase.auth().currentUser.email,
    password
  );

  // Prompt the user to re-provide their sign-in credentials
  user
    .reauthenticateWithCredential(credential)
    .then(function (data) {
      // User re-authenticated. if you need the data  see here https://firebase.google.com/docs/reference/js/firebase.auth#usercredential
      dispatch(verifyCredSuccess());
    })
    .catch(function (error) {
      // An error happened.
      console.log("error verifying password");
      dispatch(verifyCredFailure(error));
      console.error("Error verifying who you are ", error);
    });
};

export const assignUserType = (type) => (dispatch) => {
  dispatch(setUserType(type));
};

export const logoutUser = () => (dispatch) => {
  dispatch(requestLogout());
  firebaseInstance
    .auth()
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
      purgeItWithFire(); // clear all stored local data ( reset app )
    })
    .catch((error) => {
      //Do something with the error if you want!
      dispatch(logoutError(error));
    });
};

export const verifyAuth = () => (dispatch) => {
  dispatch(verifyRequest());
  firebaseInstance.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      dispatch(receiveLogin(user));
      dispatch(loadUserOrBusinessData());
    }
    dispatch(verifySuccess());
    // dispatch(pullCurrentEvent());
    //TODO: Expand this further, it should rehydrate userdata ( incase it has changed on firebase since last login) and pull event ata, and a bucnh of stuff
    // Or better still just pull when componenets mount lmao
  });
};

export const loadUserOrBusinessData = () => (dispatch) => {
  firebaseInstance.auth().onAuthStateChanged((user) => {
    if (user !== null) {
      console.log("USER IS CLEARLY NOT NULL");
      (async function () {
        const businessRef = firestore.doc(`businessAccounts/${user.uid}`);
        const snapshot = await businessRef.get();
        const userType = snapshot.exists ? "business" : "client"; // sometimes called client, sometime called user
        dispatch(setUserType(userType));
        if (snapshot.exists) {
          // i.e user is a business
          return {
            type: "business",
            "Operating Hours": await getBusinessHours(
              "businessAccounts",
              user.uid
            ),
            followersList: await getBusinessFollowers(user.uid),
            uid: user.uid,
            ...snapshot.data(),
          };
        } else {
          const userRef = firestore.doc(`users/${user.uid}`);
          const userSnapshot = await userRef.get();
          // console.log("Is user a regular degular user? ", userSnapshot.exists);
          // console.log(userSnapshot.data());
          return {
            type: "user",
            friends: await getUserFriends(user.uid),
            uid: user.uid,
            ...userSnapshot.data(),
          };
        }
      })().then((userOrBusinessData) => {
        dispatch(setUserData(userOrBusinessData));
      });
    }
  });
};

export const generateUserData = (userType, additionalData) => (dispatch) => {

  firebaseInstance.auth().onAuthStateChanged((user) => {

    console.log("userid addata", additionalData);

    if (user !== null) {
      dispatch(setUserType(userType));
      if (userType === "client") {
        additionalData.uid = user.uid;
        let imageDownloadURL = "";
        (async () => {
          if (additionalData.image && isFileOrBlob(additionalData.image)) {
            imageDownloadURL = await userProfileImageUpload(
              additionalData.image,
              user.uid
            );
            delete additionalData.image;
          }
          additionalData.imageDownloadURL = imageDownloadURL;

          await generateUserDocument("users", user, additionalData).then((res) => {
            dispatch(setUserData(res));
          });

        })();






      } else if (userType === "business") {

        dispatch(postCustomerSignUp(user.uid, additionalData));

        let imageDownloadURL = "";
        (async () => {
          if (additionalData.image && isFileOrBlob(additionalData.image)) {
            imageDownloadURL = await userProfileImageUpload(
              additionalData.image,
              user.uid
            );
            delete additionalData.image;
          }
          additionalData.imageDownloadURL = imageDownloadURL;

          await generateUserDocument(
            "businessAccounts",
            user,
            additionalData
          ).then((res) => {
            dispatch(setUserData(res));
          });
          //TODO: need to make ui wait before loading next page after here
        })(); // self executing function
      }
    }
  });
};

export const NukeUser = () => (dispatch) => {
  var user = firebaseInstance.auth().currentUser;
  dispatch(deactivateAccRequest());
  axios
    .delete(authEndpoints.nuke, { data: { uid: user.uid } })
    .then((resp) => {
      if (resp.data.status === 1) {
        console.log(resp.data);
        dispatch(logoutUser());
        dispatch(deactivateAccSuccess());
      }
    })
    .catch((err) => {
      if (err.response && err.response.data) {
        dispatch(deactivateAccFailure(err.response.data));
      }
      console.log("Fetch err", err);
    });
};

const generateUserDocument = async (who, user, additionalData) => {
  if (!user) return;

  const userRef = firestore.doc(`${who}/${user.uid}`);
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    // if user not found, create
    const { coordlat, coordlong } = additionalData;

    if (who === "users") {
      const { displayName, email, photoURL } = user;
      try {
        await userRef.set({
          displayname: displayName,
          email,
          imageDownloadURL: photoURL,
          ...additionalData,
        });
      } catch (error) {
        console.error("Error creating user document", error);
      }
    } else if (who === "businessAccounts") {
      const { email } = user;
      const {
        operatingHours,
        expirydate,
        main_category,
        sub_category1,
        sub_category2,
        sub_category3,
      } = additionalData;
      console.log(expirydate);
      console.log(additionalData.expirydate);
      delete additionalData.operatingHours;

      put_UploadSuggestedCategories({
        mainCategory: main_category[0],
        subCategory1: sub_category1[0],
        subCategory2: sub_category2[0],
        subCategory3: sub_category3[0],
      });

      try {
        await userRef.set({
          email,
          ...additionalData,
          expirydate: firestoreTimeStamp.fromDate(expirydate),
          l: new firebase.firestore.GeoPoint(coordlat, coordlong),
          category_array: [
            ...main_category,
            ...sub_category1,
            ...sub_category2,
            ...sub_category3,
          ],
          uid: user.uid,
        });
        // await userRef_geo.set({
        //   coordinates: new firebase.firestore.GeoPoint(coordlat, coordlong),
        // });
        // userRef_geo.
        var skipped = operatingHours?.hasOwnProperty("skipped");
        if (!skipped) {
          // check if operating hours was skipped
          await firestore
            .collection(`${who}`)
            .doc(`${user.uid}`)
            .collection("Operating Hours")
            .doc("Operating Hours")
            .set(operatingHours["Operating Hours"]);
        }
      } catch (error) {
        console.log("Error Creating Business account document", error);
      }
    }
  }
  return getUserDocument(who, user.uid);
};

const getUserDocument = async (who, uid) => {
  if (!uid) return null;
  if (who === "businessAccounts") {
    try {
      const userDocument = await firestore.doc(`${who}/${uid}`).get();
      return {
        "Operating Hours": await getBusinessHours(who, uid),
        followersList: await getFriendsOrFollowers(who, uid),
        uid,
        ...userDocument.data(),
      };
    } catch (error) {
      //TODO: Proper error handling. here would be an ideal spot to send logs too
      console.error("Error fetching user document", error);
    }
  } else if (who === "users") {
    try {
      const userDocument = await firestore.doc(`${who}/${uid}`).get();

      return {
        friendsList: await getFriendsOrFollowers(who, uid),
        uid,
        ...userDocument.data(),
      };
    } catch (error) {
      //TODO: Proper error handling. here would be an ideal spot to send logs too
      console.error("Error fetching user document", error);
    }
  }
};

const getBusinessHours = async (who, uid) => {
  if (!uid) return null;
  if (who !== "businessAccounts") return null;
  try {
    const operatingHours = await firestore
      .doc(`${who}/${uid}`)
      .collection("Operating Hours")
      .doc("Operating Hours")
      .get();
    return { ...operatingHours.data() };
  } catch (error) {
    //TODO: Proper error handling. here would be an ideal spot to send logs too
    console.error("Error fetching operating hours for ", uid, error);
  }
};
//FIXME:
const getFriendsOrFollowers = async (who, uid) => {
  if (!uid) return null;
  if (who === "businessAccounts") {
    try {
      console.log("Getting Followers");
      const allFollowers = [];
      const followers = await firestore
        .doc(`${who}/${uid}`)
        .collection("followers")
        .get();

      followers.forEach((doc) => {
        allFollowers.push({ id: doc.id }); // we only really need the id
      });
      return allFollowers;
    } catch (error) {
      //TODO: Proper error handling. here would be an ideal spot to send logs too
      console.log("Error Getting users followers, ", error);
    }
  } else if (who === "users") {
    try {
      const friends = await firestore
        .doc(`users/${uid}`)
        .collection("Friend Requests")
        .doc("Friends")
        .get();
      return { ...friends.data() };
    } catch (error) {
      //TODO: Proper error handling. here would be an ideal spot to send logs too
      console.log("Error Getting users friends, ", error);
    }
  }
};

export const updateProfile = (userType, uid, additionalData) => (dispatch) => {
  dispatch(updateProfileReq());
  if (!uid) {
    dispatch(updateProfileFail());
    return;
  }
  if (userType === "client") {
    let imageDownloadURL = "";
    (async function () {
      if (additionalData.image && isFileOrBlob(additionalData.image)) {
        imageDownloadURL = await userProfileImageUpload(
          additionalData.image,
          uid
        );
        additionalData.imageDownloadURL = imageDownloadURL;
      }
      delete additionalData.image;
      console.log("now pushing update to  user document");
      updateUserDocument("users", uid, additionalData).then((res) => {
        dispatch(setUserData(res));
      });
      //TODO: need to make ui wait before loading next page after here
    })(); // self executing function
  } else if (userType === "business") {
    let imageDownloadURL = "";
    (async function () {
      if (additionalData.image && isFileOrBlob(additionalData.image)) {
        imageDownloadURL = await userProfileImageUpload(
          additionalData.image,
          uid
        );
        additionalData.imageDownloadURL = imageDownloadURL;
      }
      delete additionalData.image;
      updateUserDocument("businessAccounts", uid, additionalData).then(
        (res) => {
          dispatch(setUserData(res));
        }
      );
      //TODO: need to make ui wait before loading next page after here
    })(); // self executing function
  }
  dispatch(updateProfileSucess());
};

const updateUserDocument = async (who, uid, additionalData) => {
  if (!uid) return;

  const userRef = firestore.doc(`${who}/${uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) return;
  else {
    try {
      await userRef.update({
        ...additionalData,
      });
    } catch (error) {
      //TODO: Proper Error handling
      console.error("Error updating user document", error);
    }
  }

  return getUserDocument(who, uid);
};

const userProfileImageUpload = async (image, uid) => {
  try {
    const uploadTask = await storage
      .ref(`/users/profileimages/${uid}`)
      .put(image);

    const downloadURL = await uploadTask.ref.getDownloadURL();
    return downloadURL;
  } catch (error) {
    console.error("Failed to do image upload because: ", error);
  }
  //TODO: dispatch =(done or something here -- for ui? )

  // async function getTheURL() {
  //   await uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
  //     console.log(downloadURL);
  //     return downloadURL;
  //   });
  // }

  // uploadTask.on(
  //   "state_changed",
  //   (snapshot) => {
  //     // progrss function ....
  //     const progress = Math.round(
  //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  //     );
  //     // this.setState({progress});
  //   },
  //   (error) => {
  //     // error function ....
  //     console.log("Error durign image uplaod", error);
  //   },
  //   (thisPartGetsTheUrl) => {
  //     return getTheURL();
  //     // complete function ....

  //     //  storage
  //     //   .ref(`/users/profileimages/`)
  //     //   .child(user.uid)
  //     //   .getDownloadURL()
  //     //   .then((url) => {
  //     //     console.log(url);
  //     //     // this.setState({url});
  //     //     return url;
  //     //   });
  //     // return url;
  //
  //   }
  // );
};
