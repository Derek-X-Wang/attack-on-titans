/* eslint-disable */
import Vue from 'vue'

var store = {
  debug: true,
  bus: new Vue(),
  state: {
    message: 'Hello!',
  },
  setMessageAction(newValue) {
    this.debug && console.log('setMessageAction triggered with', newValue);
    this.state.message = newValue;
  },
  clearMessageAction() {
    this.debug && console.log('clearMessageAction triggered');
    this.state.message = '';
  }
};
export default store;
