import React, { Fragment } from "react";
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
  <Fragment>
    <Input autocomplete="dropdown" />
    <Tabs filter={filter} tabs={[{ name: "all", display: "All" }]} />

    <Summary />
    <Results />
    <Paginator />
  </Fragment>
);

ReactDOM.render(
  <Provider search={{ pipeline, values }}>
    <App />
  </Provider>,
  document.getElementById("root")
);
