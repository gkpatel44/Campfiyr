export const config = {};

var dev = true;

if ((process.env.NODE_ENV || "").trim() === "production") {
  dev = false;
}

config.firebaseConf = {
  ...(dev && { apiKey: process.env.REACT_APP_DEV }),
  ...(!dev && { apiKey: process.env.REACT_APP_FIREBASE_PROD }),
  authDomain: "happening-82070.firebaseapp.com",
  databaseURL: "https://happening-82070.firebaseio.com",
  projectId: "happening-82070",
  storageBucket: "happening-82070.appspot.com",
  messagingSenderId: "1014166867010",
  appId: "1:1014166867010:web:10a144d53babfccf9c71db",
  measurementId: "G-5DJ300D4BL",
};

config.mapsPlacesApiKey = dev
  ? process.env.REACT_APP_DEV
  : process.env.REACT_APP_FIREBASE_PROD;

config.geolocation_DbAPIKey = "e4f42070-ad2d-11eb-adf1-cf51da9b3410";

export const firebaseConf = config.firebaseConf;
export const mapsPlacesApiKey = config.mapsPlacesApiKey;
export const geolocation_DbAPIKey = config.geolocation_DbAPIKey;
