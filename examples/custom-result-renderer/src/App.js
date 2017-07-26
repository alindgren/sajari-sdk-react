import React from "react";

import { Pipeline, Values, changeEvent } from "sajari-react/controllers";
import { AutocompleteInput } from "sajari-react/ui/text";
import { Response, Results, Summary, Paginator } from "sajari-react/ui/results";

import "sajari-react/ui/text/AutocompleteInput.css";
import "sajari-react/ui/results/Paginator.css";

import { Client, Tracking } from "sajari";

const project = "sajariptyltd";
const collection = "sajari-com";
const pipelineName = "website";

const values = new Values();
const client = new Client(project, collection);

const tracking = new Tracking();
tracking.clickTokens("url");
const pipeline = new Pipeline(client, pipelineName);

values.listen(changeEvent, (changes, set) => {
  if (!changes.page) {
    set({ page: "1" });
  }
});

const CustomResult = ({ values, token, onResultClicked }) =>
  <div>
    <h1>
      {values.title}
    </h1>
    <p>
      {values.description}
    </p>
  </div>;

const App = () =>
  <div className="searchApp">
    <AutocompleteInput
      values={values}
      pipeline={pipeline}
      tracking={tracking}
    />
    <Response pipeline={pipeline} className="sj-pipeline-response">
      <Summary values={values} pipeline={pipeline} tracking={tracking} />
      <Results pipeline={pipeline} ResultRenderer={CustomResult} />
      <Paginator values={values} pipeline={pipeline} tracking={tracking} />
    </Response>
  </div>;

export default App;
