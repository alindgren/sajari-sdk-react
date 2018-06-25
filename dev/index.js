import React, { Fragment } from "react";
import ReactDOM from "react-dom";

import { injectGlobal, css } from "emotion";

injectGlobal({
  // "*:focus": {
  //   border: "1px solid red !important"
  // }
});

import {
  Pipeline,
  Values,
  NoTracking,
  ClickTracking,
  Provider,
  Input,
  Response,
  Results,
  Summary,
  Paginator,
  TokenLink,
  Filter,
  FilterProvider,
  Tabs,
  Select,
  Checkbox,
  Radio,
  Consumer,
  EVENT_VALUES_UPDATED
} from "sajari-react";

import { ErrorBoundary } from "./ErrorBoundary";
import { SajariLogo } from "./SajariLogo";

const config = {
  project: "sajariptyltd",
  collection: "sajari-com"
};

const pipeline = new Pipeline(config, "website", new ClickTracking());
const values = new Values({
  resultsPerPage: 10,
  filter: ""
});

// Any change to values should reset the paginator back to page 1
values.listen(EVENT_VALUES_UPDATED, (changes, set) => {
  if (!changes.page) {
    set({ page: "1" });
  }
});

const filter = new Filter({
  All: "",
  FAQ: "dir1='faq'",
  Blog: "dir1='blog'"
});

const PoweredBySajari = ({ project, collection }) => (
  <div
    className={css({
      padding: "7px 20px",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-end",
      textDecoration: "none"
    })}
  >
    <a
      href={`https://www.sajari.com?utm=${encodeURIComponent(
        `${project}/${collection}`
      )}`}
      className={css({
        display: "inline-flex",
        alignItems: "center"
      })}
    >
      <span
        className={css({
          paddingRight: 7,
          fontSize: 11
        })}
      >
        Powered by Sajari
      </span>
      <SajariLogo />
    </a>
  </div>
);

const Result = (highlightedIndex, setHighlightedIndex) => ({
  resultClicked,
  values: { title, url },
  token,
  itemIndex
}) => {
  return (
    <TokenLink
      token={token}
      url={url}
      resultClicked={resultClicked}
      onMouseMove={() => {
        setHighlightedIndex(itemIndex + 1);
      }}
      styles={{
        "&:hover": {
          textDecoration: "none"
        }
      }}
    >
      <div
        className={css({
          padding: "0.5rem",
          backgroundColor:
            highlightedIndex === itemIndex + 1 ? "pink" : undefined
        })}
      >
        {title}
      </div>
    </TokenLink>
  );
};

class App extends React.Component {
  input = undefined;

  componentDidMount() {
    window.addEventListener("keydown", event => {
      if (event.keyCode === 191 && !event.shiftKey) {
        event.preventDefault();
        this.focusInput();
      }
    });
  }

  focusInput = () => {
    if (this.input !== undefined) {
      this.input.focus();
    }
  };

  render() {
    return (
      <Fragment>
        <Input
          inputRef={el => (this.input = el)}
          inputMode="typeahead"
          dropdownMode="results"
          placeholder="Type to search..."
          ResultsDropdownRenderer={({
            highlightedIndex,
            setHighlightedIndex
          }) => {
            return (
              <Response>
                <div
                  className={css({
                    backgroundColor: "#fff",
                    borderBottomLeftRadius: 2,
                    borderBottomRightRadius: 2,
                    boxSizing: "border-box",
                    boxShadow:
                      "0 3px 8px 0 rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.08)"
                  })}
                  onMouseLeave={() => {
                    setHighlightedIndex(0);
                  }}
                >
                  <Summary
                    styles={{
                      container: { marginBottom: 0, padding: "0.5em" }
                    }}
                  />
                  <Results
                    ResultRenderer={Result(
                      highlightedIndex,
                      setHighlightedIndex
                    )}
                    styles={{
                      item: {
                        marginBottom: 0
                      }
                    }}
                  />
                  <PoweredBySajari
                    project={config.project}
                    collection={config.collection}
                  />
                </div>
              </Response>
            );
          }}
        />
        {/* <Summary />
        <Select filter={filter} />
        <Results /> */}
      </Fragment>
    );
  }
}

const theme = {
  // layout: { type: "grid" },
  // colors: { brand: { primary: "orange" } }
};

ReactDOM.render(
  <ErrorBoundary>
    <Provider search={{ pipeline, values }} theme={theme}>
      <App />
    </Provider>
  </ErrorBoundary>,
  document.getElementById("root")
);
