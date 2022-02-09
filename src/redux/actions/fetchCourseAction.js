import axios from "axios";
import { FETCH_COURSES } from "./types";

export const fetchCourses = () => (dispatch) =>
  axios
    .get("https://nut-case.s3.amazonaws.com/coursessc.json")
    .then((res) => dispatch({ type: FETCH_COURSES, payload: res.data }))
    .catch((err) => console.log(err));
