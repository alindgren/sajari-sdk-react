import React from "react";
import ReactDOM from "react-dom";

import { Pipeline, Values, NoTracking, Provider, Input } from "sajari-react";

const pipeline = new Pipeline(
  "sajariptyltd",
  "sajari-com",
  "website",
  new NoTracking()
);
const values = new Values();

const App = () => (
  <Provider pipeline={pipeline} values={values}>
    <Input autocomplete="dropdown" />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
