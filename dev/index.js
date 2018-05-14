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
  Paginator,
  Filter,
  Tabs
} from "sajari-react";

const pipeline = new Pipeline(
  "sajariptyltd",
  "sajari-com",
  "website",
  new NoTracking()
);
const values = new Values();

const filter = new Filter({ All: "" });

const App = () => (
  <Provider pipeline={pipeline} values={values}>
    <Input autocomplete="dropdown" />
    <Tabs filter={filter} tabs={[{ name: "all", display: "All" }]} />
    <Summary />
    <Results />
    <Paginator />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));
