import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../../components/Course-Card";
import SearchBar from "../../components/SearchBar";
import { fetchCourses } from "../../redux/actions/fetchCourseAction";
import "./index.css";
export default function Home() {
  const courses = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(fetchCourses());
  }, []);
  return (
    <div>
      <div className="header">
        <h2>Course Finder</h2>
        <h5>
          Courses Found: <span>{courses.courses.length}</span>
        </h5>
      </div>
      <div className="searchbar-container">
        <SearchBar coursesList={courses.courses} />
      </div>
      <div className="searchresult-container">
        {courses.searchCourses.map((_courses) => (
          <div className="course-container">
            <CourseCard {..._courses} />
          </div>
        ))}
      </div>
    </div>
  );
}
