import { combineReducers } from "redux";
import courseReducer from "./coursesReducer";

const rootReducer = combineReducers({ courses: courseReducer });

export default rootReducer;
