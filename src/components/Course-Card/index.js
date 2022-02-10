import React from "react";
import "./index.css";

export default function CourseCard(props) {
  const handleClick = () => {
    window.location = props["Url"];
  };
  return (
    <div className="main" onClick={handleClick} data-testid="coursecard">
      <div className="head">
        <h5 data-testid="courseid">{props["Course Id"]}</h5>
        <div data-testid="nextsessiondate">{props["Next Session Date"]}</div>
      </div>
      <div className="title-container">
        <span>Provider</span>
        <span data-testid="provider"> {props["Provider"]}</span>
      </div>

      <div className="title-container">
        <span>Course name</span>
        <span className="red big" data-testid="coursename">
          {props["Course Name"]}
        </span>
      </div>
      <div className="title-container">
        <span>Universities/Institutions</span>
        <span className="" data-testid="university">
          {" "}
          {props["Universities/Institutions"]}{" "}
        </span>
      </div>
      <div className="foot">
        <div className="title-container">
          <span>Parent subject</span>
          <p className="" data-testid="parentsubject">
            {" "}
            {props["Parent Subject"]}{" "}
          </p>
        </div>
        <div className="title-container">
          <span>Child subject</span>
          <p data-testid="childsubject"> {props["Child Subject"]} </p>
        </div>
      </div>
    </div>
  );
}
