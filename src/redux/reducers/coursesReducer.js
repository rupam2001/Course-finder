import { dateFormatter } from "../../utils";
import { FETCH_COURSES, SEARCH_COURSES } from "../actions/types";

const intialState = {
  courses: [],
  searchCourses: [
    // {
    //   "Course Id": 301,
    //   "Course Name": "Introduction to Artificial Intelligence",
    //   Provider: "Udacity",
    //   "Universities/Institutions": "Stanford University",
    //   "Parent Subject": "Computer Science",
    //   "Child Subject": "Artificial Intelligence",
    //   Url: "https://www.ai-class.com/",
    //   "Next Session Date": "Oct, 2011",
    //   Length: 10,
    //   "Video(Url)":
    //     "https://www.youtube.com/watch?feature=player_embedded&v=BnIJ7Ba5Sr4",
    // },
  ],
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
      //filter by self paced
      if (action.filters.isSelfPaced)
        courses = courses.filter((c) => c["Next Session Date"] == "Self paced");
      console.log(courses);
      //filter by date
      if (!action.filters.date == null) {
        courses = courses.filter((c) => {
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
          const d = new Date(dateFormatter(c["Next Session Date"]));
          return d.getTime() == new Date(action.filters.date).getTime();
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
