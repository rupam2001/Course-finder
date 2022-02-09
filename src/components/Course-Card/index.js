import React from "react";
import "./index.css";

export default function CourseCard(props) {
  const handleClick = () => {
    window.location = props["Url"];
  };
  return (
    <div className="main" onClick={handleClick}>
      <div className="head">
        <h5>{props["Course Id"]}</h5>
        <div>{props["Next Session Date"]}</div>
      </div>
      <div className="title-container">
        <span>Provider</span>
        <span> {props["Provider"]}</span>
      </div>

      <div className="title-container">
        <span>Course name</span>
        <span className="red big"> {props["Course Name"]}</span>
      </div>
      <div className="title-container">
        <span>Universities/Institutions</span>
        <span className=""> {props["Universities/Institutions"]} </span>
      </div>
      <div className="foot">
        <div className="title-container">
          <span>Parent subject</span>
          <p className=""> {props["Parent Subject"]} </p>
        </div>
        <div className="title-container">
          <span>Child subject</span>
          <p> {props["Child Subject"]} </p>
        </div>
      </div>
    </div>
  );
}
