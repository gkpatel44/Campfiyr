import { uiTypes } from "../types";
//TODO: place all the code for firebase reads that you only wnana perform once here

// export const getBusinessCategories = async () => {
//   const snapshot = await firestore.collection("BusinessCategories");
//   return await snapshot.get().then((onesnap) => {
//     const tempDoc = onesnap.docs.map((doc) => {
//       return { id: doc.id, data: doc.data() };
//     });
//     console.log(tempDoc);
//     return tempDoc;
//   });
//   // docs.map((doc) => doc.data());
// };

const setUpdateAvailable = (bool) => {
  return {
    type: uiTypes.SET_UPDATE_AVAILABLE,
    payload: bool,
  };
};

const clearUpdateAvailable = () => {
  return {
    type: uiTypes.CLEAR_UPDATE_AVAILABLE,
  };
};

const checkUpdateAvailable = () => {
  return {
    type: uiTypes.CHECK_UPDATE_AVAILABLE,
  };
};

export const newAppVersionAvailable = (bool) => (dispatch) => {
  dispatch(setUpdateAvailable(bool));
};

export const newAppVersionInstalled = () => (dispatch) => {
  dispatch(clearUpdateAvailable());
};

export const checkNewAppVersionAvailable = () => (dispatch) => {
  dispatch(checkUpdateAvailable());
};

export const enqueueSnackbar = (notification) => {
  const key = notification.options && notification.options.key;

  return {
    type: uiTypes.ENQUEUE_SNACKBAR,
    notification: {
      ...notification,
      key: key || new Date().getTime() + Math.random(),
    },
  };
};

export const closeSnackbar = (key) => ({
  type: uiTypes.CLOSE_SNACKBAR,
  dismissAll: !key, // dismiss all if no key has been defined
  key,
});

export const removeSnackbar = (key) => ({
  type: uiTypes.REMOVE_SNACKBAR,
  key,
});

export const toggleAlert = (data) => {
  return {
    type: uiTypes.TOGGLE_ALERT,
    payload: data,
  };
};
