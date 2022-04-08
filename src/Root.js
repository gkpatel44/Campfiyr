import React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router } from "react-router-dom";

import App from "./App";
import configureStore from "./redux/store";

import { PersistGate } from "redux-persist/integration/react";
require("dotenv").config();

const { store, persistor } = configureStore();

/**Clear local storage of persisted REDUX data
 *
 */
export const purgeItWithFire = () => {
  persistor.purge();
};

function Root() {
  return (
    <Provider store={store}>
      <Router>
        <PersistGate persistor={persistor}>
          <App />
        </PersistGate>
      </Router>
    </Provider>
  );
}
export default Root;
