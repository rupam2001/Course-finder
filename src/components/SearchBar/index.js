import {
  Autocomplete,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { DatePicker } from "@mui/lab";
import "./index.css";
import { useDispatch } from "react-redux";
import { searchCourse } from "../../redux/actions/searchCourseAction";

export default function SearchBar({ coursesList }) {
  const [course, setCourse] = useState("");
  const [childSubject, setChildSubject] = useState("");
  const [date, setDate] = useState(null);
  const [isSelfPaced, setIsSelfPaced] = useState(false);

  const [childSubjects, setChildSubjects] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    // preprocess the data
    const _childSubjects = Array.from(
      new Set(coursesList.map((_courses) => _courses["Child Subject"])) // removes duplicate
    ).map((_c) => {
      return { label: _c };
    });

    setChildSubjects(_childSubjects);
    //pressing enter performs searching
    window.addEventListener("keyup", (e) => {
      if (e.key == "13") handleSearch();
    });
  }, [coursesList]);

  const handleSearch = () => {
    if (course == "" || childSubject == "") return;
    dispatch(
      searchCourse({ courseName: course, childSubject, date, isSelfPaced })
    );
  };

  return (
    <div className="container">
      <div className="field">
        <TextField
          id="outlined-basic"
          label="Course"
          variant="outlined"
          sx={{ width: 300 }}
          onChange={(e) => setCourse(e.target.value)}
        />
      </div>
      <div className="field">
        <Autocomplete
          options={childSubjects}
          sx={{ width: 300 }}
          value={childSubject}
          onChange={(e) => {
            setChildSubject(e.target.innerText);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Child subject" />
          )}
        />
      </div>
      <div className="field">
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Session"
            value={date}
            onChange={(v) => {
              setDate(v);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>
      <div className="field">
        <FormControlLabel
          control={
            <Checkbox
              checked={isSelfPaced}
              onChange={(e) => {
                setIsSelfPaced(!isSelfPaced);
              }}
            />
          }
          label="Self Paced"
        />
      </div>
      <div className="field">
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </div>
    </div>
  );
}
