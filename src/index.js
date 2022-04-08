import React from "react";
import ReactDOM from "react-dom";
// import "./styles.css";
import "./index.css";
// import App from './App';
import Root from "./Root";
import * as serviceWorker from "./serviceWorker";
import "typeface-nunito";
import "typeface-roboto";
import { SnackbarProvider } from "notistack";
import axios from "axios";
import { firebaseInstance } from "./firebase/firebase";

firebaseInstance.auth().onAuthStateChanged(async function (user) {
  if (user) {
    // User is signed in.
    console.log("Axios config found a user ");
    axios.interceptors.request.use(
      async (config) => {
        config.headers["Access-Control-Allow-Origin"] = "*";
        config.headers.authorization = `Bearer ${await user.getIdToken()}`;
        config.headers["Auth-Token"] =
          window.localStorage.getItem("Auth-Token") || "";
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  } else {
    // No user is signed in.
    console.log("Axios config did not find a user ");
  }
});

ReactDOM.render(
  <React.StrictMode>
    {/* maybe replace this with material uis snackbar? */}
    {/* This is quite robust tho so might not need to https://iamhosseindhv.com/notistack/demos */}
    <SnackbarProvider>
      <Root />
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
