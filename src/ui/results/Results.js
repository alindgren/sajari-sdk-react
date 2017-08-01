import React from "react";
import PropTypes from "prop-types";

import { Pipeline, responseUpdatedEvent } from "../../controllers";

import { Result } from "./";

class Results extends React.Component {
  /**
   * propTypes
   * @property {Pipeline} pipeline Pipeline object.
   */
  static get propTypes() {
    return {
      pipeline: PropTypes.instanceOf(Pipeline).isRequired
    };
  }

  constructor(props) {
    super(props);

    this.state = { response: props.pipeline.getResponse() };
  }

  componentDidMount() {
    this.removeResponseListener = this.props.pipeline.listen(
      responseUpdatedEvent,
      this.responseUpdated
    );
  }

  componentWillUnmount() {
    this.removeResponseListener();
  }

  responseUpdated = response => {
    this.setState({ response });
  };

  handleResultClicked = url => {
    this.props.pipeline.emitResultClicked(url);
  };

  render() {
    const { pipeline } = this.props;
    const { response } = this.state;

    if (response.isEmpty()) {
      return null;
    }

    return (
      <ResultsRenderer
        response={response}
        resultClicked={this.handleResultClicked}
        ResultRenderer={this.props.ResultRenderer}
      />
    );
  }
}

Results.defaultProps = {
  ResultRenderer: Result
};

const ResultsRenderer = ({ response, resultClicked, ResultRenderer }) => {
  if (response.isError()) {
    return (
      <div className="sj-result-error">An error occured while searching.</div>
    );
  }

  if (response.isEmpty()) {
    return null;
  }

  const renderedResults = response.getResults().map((r, index) => {
    const token = r.tokens && r.tokens.click && r.tokens.click.token;

    return (
      <ResultRenderer
        key={r.values._id || "" + index + r.values.url}
        values={r.values}
        token={token}
        resultClicked={resultClicked}
      />
    );
  });
  return (
    <div className="sj-result-list">
      {renderedResults}
    </div>
  );
};

export default Results;
