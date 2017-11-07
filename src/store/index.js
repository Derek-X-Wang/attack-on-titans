import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

Vue.use(Vuex);

const state = {
  interviewType: 'unknown',
  interviewState: 'none',
  interviewMode: 'MODE_SM',
};

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations,
});
