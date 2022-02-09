import { SEARCH_COURSES } from "./types";

export const searchCourse = ({
  courseName,
  childSubject,
  date,
  isSelfPaced,
}) => {
  return {
    type: SEARCH_COURSES,
    filters: { courseName, childSubject, date, isSelfPaced },
  };
};
