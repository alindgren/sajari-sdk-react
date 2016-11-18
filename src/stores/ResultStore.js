import { fromJS, List as list } from 'immutable';
import equal from 'deep-equal';

import { ChangeEmitter } from '../utils/ChangeEmitter.js';
import AppDispatcher from '../dispatcher/AppDispatcher';
import SearchConstants from '../constants/SearchConstants.js';
import RequestStore from './RequestStore.js';

const nameDefault = 'default';

// let protectFacets = false; // switch to keep facets from original search around for rendering

let data = fromJS({
  default: {
    results: [],
    page: 1,
    response: {
      reads: 0,
      totalResults: 0,
      time: 0,
      statusCode: 0,
      queryID: '',
      error: '',
      searchRequest: {},
    },
    facets: {},
    fuzzy: '',
    aggregates: {},
  },
});

function setResults(namespace, r) {
  data = data.setIn([namespace, 'results'], r);
}

function getResults(namespace) {
  return data.getIn([namespace, 'results']);
}

function setError(namespace, msg) {
  data = data.setIn([namespace, 'response', 'error'], msg)
}

function getError(namespace) {
  return data.getIn([namespace, 'response', 'error'])
}

function setAggregates(namespace, a) {
  data = data.setIn([namespace, 'aggregates'], a);
}

function getAggregates(namespace) {
  return data.getIn([namespace, 'aggregates']);
}

function setReads(namespace, r) {
  data = data.setIn([namespace, 'response', 'reads'], r);
}

function getReads(namespace) {
  return data.getIn([namespace, 'response', 'reads']);
}

function setTotalResults(namespace, t) {
  data = data.setIn([namespace, 'response', 'totalResults'], t);
}

function getTotalResults(namespace, ) {
  return data.getIn([namespace, 'response', 'totalResults']);
}

function setTime(namespace, m) {
  data = data.setIn([namespace, 'response', 'time'], m);
}

function getTime(namespace,) {
  return data.getIn([namespace, 'response', 'time']);
}

function setStatusCode(namespace, c) {
  data = data.setIn([namespace, 'response', 'statusCode'], c);
}

function getStatusCode(namespace) {
  return data.getIn([namespace, 'response', 'statusCode']);
}

function setQueryID(namespace, qid) {
  data = data.setIn([namespace, 'response', 'queryID'], qid);
}

function getQueryID(namespace) {
  return data.getIn([namespace, 'response', 'queryID']);
}

function setFuzzy(namespace, f) {
  data = data.setIn([namespace, 'response', 'fuzzy'], f || '');
}

function getFuzzy(namespace) {
  return data.getIn([namespace, 'response', 'fuzzy']);
}

function setRequest(namespace, r) {
  data = data.setIn([namespace, 'response', 'searchRequest'], r || {})
}

function updateResponse(namespace, result) {
  setTotalResults(namespace, Number(result.totalResults));
  setTime(namespace, result.time);
  setReads(namespace, Number(result.reads));
  setAggregates(namespace, result.aggregates);
  setRequest(namespace, result.searchRequest)
}

function getResponse(namespace, ) {
  return data.getIn([namespace, 'response']);
}

// Store for holding search results
class ResultStore extends ChangeEmitter {

  getResults(namespace) {
    return getResults(namespace);
  }

  getAggregates(namespace) {
    return getAggregates(namespace);
  }

  getResponse(namespace) {
    return getResponse(namespace);
  }

  getReads() {
    return getReads();
  }

  getTotalResults() {
    return getTotalResults();
  }

  getTime() {
    return getTime();
  }

  getStatusCode() {
    return getStatusCode();
  }

  getQueryID() {
    return getQueryID();
  }

  getFuzzy(namespace) {
    return getFuzzy(namespace);
  }
}

function setSearchResults(namespace, results) {
  setResults(namespace, list(results.searchResponse.results));
  const response = results.searchResponse || {}
  response.searchRequest = results.searchRequest
  updateResponse(namespace, response);
  setError(namespace, null)
}

function setSearchError(namespace, msg) {
  setError(namespace, msg)
}

const resultStore = new ResultStore();

function isLatestQuery(query, namespace) {
  return equal(query, RequestStore.getRequest(namespace))
}

resultStore.dispatchToken = AppDispatcher.register(payload => {
  const action = payload.action;
  const source = payload.source;

  if (source === 'SERVER_ACTION') {
    if (!action.actionData) {
      // Request was cancelled
      return
    }

    if (!isLatestQuery(action.searchQuery, action.namespace)) {
      // Results came back that didn't match the current query state, so we disregard them.
      // This is caused by results coming back out of order, usually due to networking issues.
      return
    }

    switch (action.actionType) {
      case SearchConstants.SEARCH: {
        setSearchResults(action.namespace, action.actionData);
        resultStore.emitChange();
        break;
      }
      case SearchConstants.SEARCH_ERROR: {
        setSearchError(action.namespace, action.actionData)
        resultStore.emitChange()
        break
      }
      default:
        break;
    }
  }

  if (source === 'VIEW_ACTION') {
    if (action.actionType === SearchConstants.CLEAR_RESULTS) {
      setResults(action.namespace, null)
      resultStore.emitChange()
    }
  }
});

export default resultStore;
