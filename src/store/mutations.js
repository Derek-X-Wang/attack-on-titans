/* eslint no-param-reassign: 0 */
import * as types from './mutation-types';

const mutations = {
  [types.INTERVIEW_START](state) {
    state.interviewState = '';
  },
  [types.INTERVIEW_PAUSE](state) {
    state.interviewState = '';
  },
  [types.INTERVIEW_STOP](state) {
    state.interviewState = '';
  },
};

export default mutations;
