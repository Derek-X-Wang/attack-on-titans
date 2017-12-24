import * as types from './mutation-types';

const actions = {
  startInterview({ commit }, { selected, selectedIndex, orientation }) {
    commit({
      type: types.INTERVIEW_START,
      selected,
      selectedIndex,
      orientation,
    });
  },
  pauseInterview({ commit }, { scene }) {
    commit({
      type: types.INTERVIEW_PAUSE,
      scene,
    });
  },
  stopInterview({ commit }, { scene }) {
    commit({
      type: types.INTERVIEW_STOP,
      scene,
    });
  },
  nextInterview({ commit }, { scene }) {
    commit({
      type: types.INTERVIEW_NEXT,
      scene,
    });
  },
};

export default actions;
