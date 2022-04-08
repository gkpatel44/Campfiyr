import { applyMiddleware, createStore, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { verifyAuth } from "./actions/";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import localStorage from "redux-persist/lib/storage"; // defaults to localStorage for web and AsyncStorage for react-native

const persistConfig = {
  key: "root",
  storage: localStorage,
  whitelist: ["auth", "events", "appInterface", "search"],
};

export default function configureStore(persistedState) {
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    // rootReducer,
    persistedReducer,
    persistedState,

    compose(
      applyMiddleware(thunkMiddleware),
      // window.__REDUX_DEVTOOLS_EXTENSION__ &&
      //   window.__REDUX_DEVTOOLS_EXTENSION__()
      //FIXME: remove these lines below  in production
      ...(window.__REDUX_DEVTOOLS_EXTENSION__ // allows application to function as expected even if  redux dev tools are no installed
        ? [window.__REDUX_DEVTOOLS_EXTENSION__()]
        : [])
    )
  );
  store.dispatch(verifyAuth());

  const persistor = persistStore(store);

  return { store, persistor };
}
