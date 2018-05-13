import React from "react";
import ReactDOM from "react-dom";

import {
  Pipeline,
  Values,
  NoTracking,
  Provider,
  Input,
  Results,
  Summary,
  Paginator
} from "sajari-react";

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
    <Summary />
    <Results />
    <Paginator />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
