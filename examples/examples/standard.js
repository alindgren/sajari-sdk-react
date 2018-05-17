import React, { Fragment, Component } from "react";

import {
  Pipeline,
  Values,
  NoTracking,
  Provider,
  Input,
  Response,
  Results,
  Summary,
  Paginator,
  Tabs,
  Filter,
  EVENT_VALUES_UPDATED,
  EVENT_SELECTION_UPDATED
} from "sajari-react";

const pipeline = new Pipeline(
  "sajariptyltd",
  "sajari-com",
  "website",
  new NoTracking()
);
const values = new Values();

// Any change to values should reset the paginator back to page 1
values.listen(EVENT_VALUES_UPDATED, () => {
  const changes = values.get();
  if (!changes.page) {
    values.set({ page: "1" });
  }
});

const tabsFilter = new Filter(
  {
    All: "",
    Blog: "dir1='blog'",
    FAQ: "dir1='faq'"
  },
  "All"
);
values.set({ filter: () => tabsFilter.filter() });

const tabs = [
  { name: "All", display: "All" },
  { name: "Blog", display: "Blog" },
  { name: "FAQ", display: "FAQ" }
];

tabsFilter.listen(EVENT_SELECTION_UPDATED, () => {
  const current = values.get();
  if (current["q"]) {
    pipeline.search(current);
  }
});

export default () => (
  <Provider search={{ pipeline, values }}>
    <Input autocomplete />
    <Response>
      <Tabs tabs={tabs} filter={tabsFilter} />

      <Summary />
      <Results />
      <Paginator />
    </Response>
  </Provider>
);
