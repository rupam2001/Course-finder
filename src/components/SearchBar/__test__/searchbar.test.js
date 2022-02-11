import ReactDOM from "react-dom";
import SearchBar from "..";
import { Provider } from "react-redux";
import store from "../../../redux/store";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <SearchBar coursesList={[]} />
    </Provider>,
    div
  );
});
