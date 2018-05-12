import React from "react";
import ReactDOM from "react-dom";

import { Pipeline, Values, NoTracking, Provider } from "sajari-react";

const pipeline = new Pipeline(
  "sajariptyltd",
  "sajari-com",
  "website",
  new NoTracking()
);
const values = new Values();

const App = () => (
  <Provider pipeline={pipeline} values={values}>
    <h1>Hello World</h1>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
