// import { ImageAspectRatioOutlined } from "@material-ui/icons";
// import firebase from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";
// import "firebase/storage";
// // import { functions } from "firebase";
// import { firebaseConf } from "./util/config";

// //Init Firebase
// firebase.initializeApp(firebaseConf);

// export const auth = firebase.auth();
// export const firestore = firebase.firestore();

// const gprovider = new firebase.auth.GoogleAuthProvider();
// const fprovider = new firebase.auth.FacebookAuthProvider();

// export const signInWithGoogle = () => {
//   auth.signInWithPopup(gprovider);
// };
// export const signInWithFacebook = () => {
//   auth.signInWithPopup(fprovider);
// };

// // https://blog.logrocket.com/user-authentication-firebase-react-apps/

// export const generateUserDocument = async (user, additionalData) => {
//   if (!user) return;

//   const userRef = firestore.doc(`users/${user.uid}`);
//   const snapshot = await userRef.get();

//   if (!snapshot.exists) {
//     // if user not found, create
//     const { firstname, lastname, displayname, email } = user;
//     try {
//       await userRef.set({
//         firstname,
//         lastname,
//         displayname,
//         email,
//         ...additionalData,
//       });
//     } catch (error) {
//       console.error("Error creating user document", error);
//     }
//   }
//   return getUserDocument(user.uid);
// };

// const getUserDocument = async (uid) => {
//   if (!uid) return null;
//   try {
//     const userDocument = await firestore.doc(`users/${uid}`).get();

//     return {
//       uid,
//       ...userDocument.data(),
//     };
//   } catch (error) {
//     console.error("Error fetching user", error);
//   }
// };

// const getBusinessDocument = async (uid) => {
//   if (!uid) return null;
//   try {
//     const businessDoc = await firestore.doc(`businessAccounts/${uid}`).get();

//     return {
//       uid,
//       ...businessDoc.data(),
//     };
//   } catch (error) {
//     console.error("Error fetching user", error);
//   }
// };

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

// // export const getBusinessCategories = () => {
// //   // try {
// //   const result = [{ Category: "Placeholder", Data: "haha" }];
// //   const cats = firestore
// //     .collection(`BusinessCategories`)
// //     .get()
// //     .then((snapshot) => {
// //       snapshot.forEach((doc) => {
// //         // console.log(doc.id, " => ", doc.data());
// //         var cat = {};
// //         cat.Category = doc.id;
// //         cat.Data = doc.data();
// //         result.push(cat);
// //       });
// //     })
// //     .catch((err) => {
// //       console.log("You have failed as a developer because:", err);
// //     });

// //   // return result;
// //   return result;
// //   // } catch (error) {
// //   // console.error("Error fetching business categories", error);
// //   // }
// // };

// const storage = firebase.storage();

// export const businessAccountImageUpload = async (image, user) => {
//   const uploadTask = storage.ref(`/users/profileimages/${user.uid}`).put(image);
//   uploadTask.on(
//     "state_changed",
//     (snapshot) => {
//       // progrss function ....
//       const progress = Math.round(
//         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//       );
//       // this.setState({progress});
//     },
//     (error) => {
//       // error function ....
//       console.log("Error durign image uplaod", error);
//     },
//     (url) => {
//       // complete function ....
//       storage
//         .ref("images")
//         .child(image.name)
//         .getDownloadURL()
//         .then((url) => {
//           console.log(url);
//           // this.setState({url});
//           return url;
//         });
//       // return url;
//     }
//   );
// };

// export const generateBusinessAccount = async (business, extraData) => {
//   if (!business) return;

//   const businessRef = firestore.doc(`/businessAccounts/${business.uid}`);
//   const snapshot = await businessRef.get();

//   if (!snapshot.exists) {
//     // if user not found, create
//     const { image, email } = business;
//     try {
//       await businessRef.set({
//         email,
//         imageDownloadURL: businessAccountImageUpload(image, business.uid),
//         ...extraData,
//       });
//     } catch (error) {
//       console.error("Error creating business document", error);
//     }
//   }
//   return getBusinessDocument(business.uid);
// };
