import { combineReducers } from "redux";
import taskAction from "./actions";
import other from "./other";



export default combineReducers({
  first:taskAction,
  second:other,
  });
