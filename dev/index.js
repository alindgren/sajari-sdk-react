import React from "react";
import ReactDOM from "react-dom";

import { Pipeline, Values, NoTracking } from "sajari-react";

const pipeline = new Pipeline(
  "sajariptyltd",
  "sajari-com",
  "website",
  new NoTracking()
);
const values = new Values();

const App = () => (
  <div>
    <h1>Hello World</h1>
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
