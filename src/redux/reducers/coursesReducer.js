import { dateFormatter } from "../../utils";
import { FETCH_COURSES, SEARCH_COURSES } from "../actions/types";

const intialState = {
  courses: [],
  searchCourses: [],
};

const courseReducer = (state = intialState, action) => {
  switch (action.type) {
    case FETCH_COURSES:
      return {
        ...state,
        courses: action.payload,
      };
    case SEARCH_COURSES:
      //filter by child subject
      let courses = state.courses;

      if (action.filters.childSubject != "") {
        courses = state.courses.filter(
          (c) => c["Child Subject"] == action.filters.childSubject
        );
      }

      //filter by date
      courses = courses.filter((c) => {
        if (
          (action.filters.date == null || action.filters.date == "") &&
          !action.filters.isSelfPaced
        ) {
          return true;
        }
        if (
          c["Next Session Date"] == "" ||
          c["Next Session Date"] == "NA" ||
          (c["Next Session Date"] == "Self paced" &&
            !action.filters.isSelfPaced)
        )
          return false;
        if (
          c["Next Session Date"] == "Self paced" &&
          action.filters.isSelfPaced
        )
          return true;

        if (action.filters.date == null || action.filters.date == "")
          return false;

        const d = new Date(dateFormatter(c["Next Session Date"].toString()));

        return (
          d.getTime() ==
          new Date(dateFormatter(action.filters.date.toString())).getTime()
        );
      });

      // filter by name
      if (action.filters.courseName != "") {
        courses = courses.filter((c) => {
          return (
            c["Course Name"].match(
              new RegExp(action.filters.courseName, "i")
            ) != null
          );
        });
      }

      return {
        ...state,
        searchCourses: courses,
      };

    default:
      return state;
  }
};

export default courseReducer;
