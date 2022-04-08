import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/analytics";
import "firebase/performance";

import * as geofirestore from "geofirestore";

import { config } from "../util/config";

export const firebaseInstance = firebase.initializeApp(config.firebaseConf);
export const firestore = firebaseInstance.firestore();
// const perf = firebase.performance();

// export const firebasePerformance = getPerformance(firebaseInstance);

export const firebaseAnalytics = firebaseInstance.analytics();

// Create a GeoFirestore reference
export const GeoFirestore = geofirestore.initializeApp(firestore);

export const gprovider = new firebase.auth.GoogleAuthProvider();
export const fprovider = new firebase.auth.FacebookAuthProvider();
export const storage = firebase.storage();
export const firestoreTimeStamp = firebase.firestore.Timestamp;

export const getBusinessCategories = async () => {
  const snapshot = await firestore.collection("BusinessCategories");
  return await snapshot.get().then((onesnap) => {
    const tempDoc = onesnap.docs.map((doc) => {
      return { id: doc.id, data: doc.data() };
    });
    // console.log(tempDoc);
    return tempDoc;
  });
};
