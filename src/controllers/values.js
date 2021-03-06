import { Listener } from "./";

export const valuesUpdatedEvent = "values-changed";

class Values {
  /**
   * Constructor for Values object.
   * @param {Object} values Initial values.
   */
  constructor(values = {}) {
    this.listeners = {
      [valuesUpdatedEvent]: new Listener()
    };
    this.values = values;
  }

  /**
   * Register a listener for a specific event.
   * @param {string} event Event to listen for
   * @param {Function} callback Callback to run when the event happens.
   */
  listen(event, callback) {
    if (event !== valuesUpdatedEvent) {
      throw new Error(`unknown event type "${event}"`);
    }
    return this.listeners[event].listen(callback);
  }

  /**
   * Emits an event to notify listener that the values have been updated.
   *
   * @param {Object} values
   * @private
   */
  emitUpdated(values = {}) {
    this.listeners[valuesUpdatedEvent].notify(listener => {
      listener(values, this._set.bind(this));
    });
  }

  /**
   * Sets values without triggering an event, internal use only.
   * @param {Object} values
   */
  _set(values) {
    Object.keys(values).forEach(k => {
      if (values[k] === undefined) {
        delete this.values[k];
      } else {
        this.values[k] = values[k];
      }
    });
  }

  /**
   * Merge values into the value map.
   *
   * Set a value to undefined to remove it.
   *
   * @param {Object} values
   */
  set(values) {
    this._set(values);
    this.emitUpdated(values);
  }

  /**
   * getValues returns the current values.
   */
  get() {
    const values = {};
    Object.keys(this.values).forEach(k => {
      if (typeof this.values[k] === "function") {
        values[k] = this.values[k]();
      } else {
        values[k] = this.values[k];
      }
    });
    return values;
  }
}

export default Values;
