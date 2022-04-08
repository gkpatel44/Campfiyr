import {
  VERIFY_USER_TYPE_REQUEST,
  VERIFY_USER_TYPE_SUCCESS,
  VERIFY_USER_TYPE_FAILURE,
  ADD_FRIEND_FOLLOW_REQUEST,
  ADD_FRIEND_FOLLOW_SUCCESS,
  ADD_FRIEND_FOLLOW_FAILURE,
  BAD_SEARCH,
  CLEAR_USER,
  uiTypes,
} from "../types";
import {
  // firebaseInstance,
  firestore,
  // firestoreTimeStamp,
  // storage,
} from "../../firebase/firebase";

const checkUserType = () => {
  return {
    type: VERIFY_USER_TYPE_REQUEST,
  };
};

const gotUserType = (data) => {
  return {
    type: VERIFY_USER_TYPE_SUCCESS,
    payload: data,
  };
};

const failedToGetUserType = (data) => {
  return {
    type: VERIFY_USER_TYPE_FAILURE,
    payload: data,
  };
};

const addNewFriend = () => {
  return {
    type: ADD_FRIEND_FOLLOW_REQUEST,
  };
};

const newFriendAdded = () => {
  return {
    type: ADD_FRIEND_FOLLOW_SUCCESS,
  };
};

const failedToAddNewFriend = () => {
  return {
    type: ADD_FRIEND_FOLLOW_FAILURE,
  };
};

const allUsersAndBusinesses = (data) => {
  return {
    type: BAD_SEARCH,
    payload: data,
  };
};

const searchInit = () => {
  return {
    type: uiTypes.SEARCH_INITIAL,
  };
};

const searchAdvance = (lastCall) => {
  return {
    type: uiTypes.SEARCH_ADVANCE,
    payload: lastCall,
  };
};

const searchComplete = (lastCall, results) => {
  return {
    type: uiTypes.SEARCH_BAR_COMPLETE,
    lastCall,
    results,
  };
};

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  };
};

export const pullUserOrBusinessData = (uid) => (dispatch) => {
  dispatch(checkUserType());
  getUserOrBusinessData(uid)
    .then((data) => {
      dispatch(gotUserType(data));
    })
    .catch((err) => {
      console.log("Failed to pull user data, ", err);
      dispatch(failedToGetUserType(err));
    });
};

export const addFriendOrFollow = (auth_uid, uid) => (dispatch) => {
  dispatch(addNewFriend());
  getUserOrBusinessData(uid)
    .then((data) => {
      dispatch(newFriendAdded());
    })
    .catch((err) => {
      console.log("Failed to pull user data, ", err);
      dispatch(failedToAddNewFriend(err));
    });
};

export const theWorstPossibleWayToSearch = () => (dispatch) => {
  // dispatch(pullingAFuckTonOfUserDataBAD_BAD_BAD())
  getAllUsersAndBusinesses().then((data) => {
    dispatch(allUsersAndBusinesses(data));
  });
};

export const searchBySearchArray = (lastCall, queryText) => (dispatch) => {
  // if this function is called for the first time, trat as a new request, otherwise use past results
  lastCall ? dispatch(searchAdvance(lastCall)) : dispatch(searchInit());
  const usersRef = firestore.collection("users");
  const businessesRef = firestore.collection("businessAccounts");
  console.log(queryText);
  var top5Users = usersRef
    .where("search_array", "array-contains", queryText)
    .limit(5);

  var top5Businesses = businessesRef
    .where("search_array", "array-contains", queryText)
    .limit(5);
  if (lastCall && lastCall.business && lastCall.user) {
    top5Businesses = top5Businesses
      .orderBy("business name")
      .startAfter(lastCall?.business);
    top5Users = top5Users.orderBy("displayname").startAfter(lastCall?.user);
  }

  (async () => {
    const usersRes = await top5Users.get().then((onesnap) => {
      const documents = onesnap.docs.map((doc) => {
        return { id: doc.id, data: doc.data() };
      });
      const lastUser = onesnap.docs[onesnap.docs.length - 1];
      return { documents, lastUser };
    });

    const businessRes = await top5Businesses.get().then((onesnap) => {
      const documents = onesnap.docs.map((doc) => {
        return { id: doc.id, data: doc.data() };
      });
      // take the last snapshot out to be reused in next query
      const lastBusiness = onesnap.docs[onesnap.docs.length - 1];
      return { documents, lastBusiness };
    });

    const usersAndBusinesses = usersRes.documents.concat(businessRes.documents);
    console.log(usersAndBusinesses);

    dispatch(
      searchComplete(
        { business: businessRes.lastBusiness, user: usersRes.lastUser },
        usersAndBusinesses
      )
    );
  })();
  // return { usersAndBusinesses, lastBusinessId, lastUserId };
};

const getAllUsersAndBusinesses = async () => {
  const users = firestore.collection("users");
  const usersCollection = await users.get().then((onesnap) => {
    const tempDoc = onesnap.docs.map((doc) => {
      return { id: doc.id, data: doc.data() };
    });
    return tempDoc;
  });

  const businesses = firestore.collection("businessAccounts");
  const businessesCollection = await businesses.get().then((onesnap) => {
    const tempDoc = onesnap.docs.map((doc) => {
      return { id: doc.id, data: doc.data() };
    });
    return tempDoc;
  });
  const usersAndBusinesses = usersCollection.concat(businessesCollection);
  return usersAndBusinesses;
};

export const getUserOrBusinessData = async (uid) => {
  // Changed this to an export to be accessible everywhere without needing Redux
  const businessRef = firestore.doc(`businessAccounts/${uid}`);
  const snapshot = await businessRef.get();
  /* This if statement brings me pain - Akin */
  if (snapshot.exists) {
    // i.e user is a business

    return {
      type: "business",
      "Operating Hours": await getBusinessHours("businessAccounts", uid),
      followersList: await getBusinessFollowers(uid),
      uid,
      "Event Collections": await getEventCollections(uid),
      ...snapshot.data(),
    };
  } else {
    const userRef = firestore.doc(`users/${uid}`);
    const userSnapshot = await userRef.get();

    return {
      type: "user",
      friends: await getUserFriends(uid),
      uid,
      ...userSnapshot.data(),
    };
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

export const getEventCollections = async (uid) => {
  if (!uid) return null;
  const stories = await firestore
    .doc(`businessAccounts/${uid}`)
    .collection("Event Collections")
    .get()
    .then((snapshot) => {
      const tempDoc = snapshot.docs.map((doc) => {
        return { album_name: doc.id, data: doc.data() };
      });
      return tempDoc;
    });
  return stories;
};

export const getStoryDetailsById = async (userId, storyId) => {
  if (!userId || !storyId) return null;
  try {
    const storyData = await firestore
      .doc(`users/${userId}`)
      .collection("stories")
      .doc(`${storyId}`)
      .get();
    return { ...storyData.data() };
  } catch (err) {
    console.log("Error pulling stories for user", err);
  }
};

/** Helper method, gets and stores business followers list
 *
 * @param {string} uid
 * @returns {Object} UserData
 */
export const getBusinessFollowers = async (uid) => {
  if (!uid) return null;
  try {
    const followers = await firestore
      .doc(`businessAccounts/${uid}`)
      .collection("followers")
      .get();

    return followers.docs.map((doc) => doc.data());
  } catch (error) {
    //TODO: Proper error handling. here would be an ideal spot to send logs too
    console.log("Error Getting users followers, ", error);
  }
};

/** Helper method, gets and stores users friends list
 *
 * @param {string} uid
 * @returns {Object} UserData
 */
export const getUserFriends = async (uid) => {
  if (!uid) return null;
  try {
    const friends = await firestore
      .doc(`users/${uid}`)
      .collection("Friend Requests")
      .doc("Friends")
      .get();
    return { ...friends.data() };
  } catch (error) {
    console.log("Error Getting users friends, ", error);
  }
};

// NEED FIREBASE TRIGGERS FOR NOTIFS

// const addUserAsFriend = async (auth_uid, uid) => {
//   const authUserRef = firestore.doc(
//     `users/${auth_uid}/Friend Requests/Sent Requests`
//   );
//   const userRef = firestore.doc(
//     `users/${uid}/Friend Requests/Recieved Requests`
//   );

//   var batch = firestore.batch(); //do a batched write
//   if ((await authUserRef.get()).exists) {
//     batch.update(authUserRef, { [uid]: auth_uid });
//   } else {
//     batch.set(authUserRef, { [uid]: auth_uid });
//   }

//   if ((await userRef.get()).exists) {
//     batch.update(userRef, { auth_uid });
//   } else {
//     batch.set(userRef, { auth_uid });
//   }

//   batch.commit();
// };

// const deleteCancelFriendRequest = async (auth_uid, uid) => {
//   const authUserRef = firestore.doc(
//     `users/${auth_uid}/Friend Requests/Sent Requests`
//   );
//   const userRef = firestore.doc(
//     `users/${uid}/Friend Requests/Recieved Requests`
//   );

//   const FieldValue = firebaseInstance.firestore.FieldValue;

//   var batch = firestore.batch(); //do a batched write
//   batch.update(authUserRef, { [uid]: FieldValue.delete() });

//   batch.update(userRef, { auth_uid: FieldValue.delete() });

//   batch.commit();
// };

// const deleteUserAsFriend = async (auth_uid, uid) => {
//   const authUserRef = firestore.doc(
//     `users/${auth_uid}/Friend Requests/Friends`
//   );
//   const userRef = firestore.doc(`users/${uid}/Friend Requests/Friends`);

//   const FieldValue = firebaseInstance.firestore.FieldValue;

//   var batch = firestore.batch(); //do a batched write
//   batch.update(authUserRef, { [uid]: FieldValue.delete() });

//   batch.update(userRef, { auth_uid: FieldValue.delete() });

//   batch.commit();
// };
