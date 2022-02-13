import { Pagination } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../../components/Course-Card";
import SearchBar from "../../components/SearchBar";
import { fetchCourses } from "../../redux/actions/fetchCourseAction";
import "./index.css";

const cardsPerPage = 6;

export default function Home() {
  const courses = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    dispatch(fetchCourses());
  }, []);
  useEffect(() => {}, [courses.searchCourses]);
  const handlePageChange = (e) => {
    const _page = cardsPerPage * (parseInt(e.target.innerText) - 1);
    setPage(_page);
  };
  return (
    <div className="home-main">
      <div className="header">
        <h2>Course Finder</h2>
        <h5>
          Courses Found:{" "}
          <span>
            {isSearching
              ? courses.searchCourses.length
              : courses.courses.length}
          </span>
        </h5>
      </div>
      <div className="searchbar-container">
        <SearchBar
          coursesList={courses.courses}
          setIsSearching={setIsSearching}
        />
      </div>
      <div className="searchresult-container">
        {isSearching
          ? courses.searchCourses
              .slice(page, page + cardsPerPage)
              .map((_courses) => (
                <div className="course-container" key={_courses["Course Id"]}>
                  <CourseCard {..._courses} />
                </div>
              ))
          : courses.courses.slice(page, page + cardsPerPage).map((_courses) => (
              <div className="course-container" key={_courses["Course Id"]}>
                <CourseCard {..._courses} />
              </div>
            ))}
      </div>
      <div className="paggignation">
        {(courses.searchCourses.length != 0 || courses.courses.length != 0) && (
          <Pagination
            count={
              isSearching
                ? Math.ceil(courses.searchCourses.length / cardsPerPage)
                : Math.ceil(courses.courses.length / cardsPerPage)
            }
            onChange={handlePageChange}
            hidePrevButton
            hideNextButton
          />
        )}
      </div>
    </div>
  );
}
