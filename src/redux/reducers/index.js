import { combineReducers } from "redux";
import auth from "./auth";
import events from "./events";
import user from "./user";
import appInterface from "./appInterface";
import dashboard from "./dashboard";
import search from "./search";
import product from"./product";
export default combineReducers({
  auth,
  events,
  user,
  appInterface,
  dashboard,
  search,
  product
});
