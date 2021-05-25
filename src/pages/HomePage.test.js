import ReactDOM from "react-dom";
import HomePage from "./HomePage";

it("Renders page without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<HomePage />, div);
});
