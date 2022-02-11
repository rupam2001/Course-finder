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
      let courses = state.courses.filter(
        (c) => c["Child Subject"] == action.filters.childSubject
      );

      //filter by date
      if (action.filters.date !== null || action.filters.date != "") {
        courses = courses.filter((c) => {
          if (
            c["Next Session Date"] == "" ||
            c["Next Session Date"] == "NA" ||
            (c["Next Session Date"] == "Self paced" &&
              !action.filters.isSelfPaced)
          )
            return false;
          // if self paced
          if (
            c["Next Session Date"] == "Self paced" &&
            action.filters.isSelfPaced
          )
            return true;
          console.log(c["Next Session Date"]);

          const d = new Date(dateFormatter(c["Next Session Date"].toString()));

          return (
            d.getTime() ==
            new Date(dateFormatter(action.filters.date.toString())).getTime()
          );
        });
      }
      // filter by name
      courses = courses.filter((c) => {
        return (
          c["Course Name"].match(new RegExp(action.filters.courseName, "i")) !=
          null
        );
      });

      return {
        ...state,
        searchCourses: courses,
      };

    default:
      return state;
  }
};

export default courseReducer;
