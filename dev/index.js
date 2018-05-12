import React from "react";
import ReactDOM from "react-dom";

import { ui, controllers } from "@sajari/react";
const { Input } = ui.text;
const { Pipeline, Values, NoTracking } = controllers;

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
    <Input pipeline={pipeline} values={values} />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
