import ReactDOM from "react-dom";
import CourseCard from "..";
import { cleanup, render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

afterEach(cleanup);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<CourseCard />, div);
});

it("renders coursecard correctly", () => {
  const { getByTestId } = render(<CourseCard {...demodata} />);
  expect(getByTestId("courseid")).toHaveTextContent(demodata["Course Id"]);
  expect(getByTestId("coursename")).toHaveTextContent(demodata["Course Name"]);
  expect(getByTestId("provider")).toHaveTextContent(demodata["Provider"]);
  expect(getByTestId("university")).toHaveTextContent(
    demodata["Universities/Institutions"]
  );
  expect(getByTestId("parentsubject")).toHaveTextContent(
    demodata["Parent Subject"]
  );
  expect(getByTestId("childsubject")).toHaveTextContent(
    demodata["Child Subject"]
  );
});

const demodata = {
  "Course Id": 301,
  "Course Name": "Introduction to Artificial Intelligence",
  Provider: "Udacity",
  "Universities/Institutions": "Stanford University",
  "Parent Subject": "Computer Science",
  "Child Subject": "Artificial Intelligence",
  Url: "https://www.ai-class.com/",
  "Next Session Date": "Oct, 2011",
  Length: 10,
  "Video(Url)":
    "https://www.youtube.com/watch?feature=player_embedded&v=BnIJ7Ba5Sr4",
};
