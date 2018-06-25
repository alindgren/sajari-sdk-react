import React from "react";
import { css } from "emotion";

export class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null, info: null };

  componentDidCatch(error, info) {
    this.setState(state => ({ ...state, hasError: true, error, info }));
  }

  render() {
    const { children } = this.props;
    const { hasError, error, info } = this.state;

    if (hasError) {
      return (
        <div>
          {error !== null ? <p>{error.message}</p> : null}
          <p className={css({ whiteSpace: "pre-wrap" })}>
            {info !== null ? info.componentStack : null}
          </p>
        </div>
      );
    }

    return children;
  }
}
