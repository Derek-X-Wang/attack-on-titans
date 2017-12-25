import * as types from './mutation-types';

const actions = {
  startInterview({ commit }) {
    commit({
      type: types.INTERVIEW_START,
    });
  },
  pauseInterview({ commit }) {
    commit({
      type: types.INTERVIEW_PAUSE,
    });
  },
  stopInterview({ commit }) {
    commit({
      type: types.INTERVIEW_STOP,
    });
  },
  nextInterview({ commit }) {
    commit({
      type: types.INTERVIEW_NEXT,
    });
  },
  showInterviewReport({ commit }, { records }) {
    commit({
      type: types.INTERVIEW_REPORT_SHOW,
      records,
    });
  },
  closeInterviewReport({ commit }) {
    commit({
      type: types.INTERVIEW_REPORT_CLOSE,
    });
  },
};

export default actions;
