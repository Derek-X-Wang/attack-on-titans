/* eslint no-param-reassign: 0 */
import * as types from './mutation-types';

const mutations = {
  [types.INTERVIEW_START](state) {
    state.interviewState = 'start';
  },
  [types.INTERVIEW_PAUSE](state) {
    state.interviewState = 'pause';
  },
  [types.INTERVIEW_STOP](state) {
    state.interviewState = 'stop';
  },
  [types.INTERVIEW_NEXT](state) {
    state.interviewState = 'next';
  },
  [types.INTERVIEW_REPORT_SHOW](state, { records }) {
    state.records = records;
    state.report = true;
  },
  [types.INTERVIEW_REPORT_CLOSE](state) {
    state.report = false;
  },
};

export default mutations;
