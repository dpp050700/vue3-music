import { PLAY_MODE } from "@/common/config/index";
import * as mutationsType from "./mutation-type";
export default {
  namespaced: true,
  state: {
    mode: PLAY_MODE.sequence,
    sequenceList: [],
    playList: [],
    currentIndex: 0,
    fullScreen: false,
  },
  mutations: {
    [mutationsType.SET_PLAYER_MODE](state, mode) {
      state.mode = mode;
    },
    [mutationsType.SET_SEQUENCE_LIST](state, list) {
      state.sequenceList = list;
    },
    [mutationsType.SET_PLAY_LIST](state, list) {
      state.playList = list;
    },
    [mutationsType.SET_CURRENT_INDEX](state, index) {
      state.currentIndex = index;
    },
    [mutationsType.SET_FULL_SCREEN](state, isFull) {
      state.fullScreen = isFull;
    },
  },
  actions: {},
  getters: {
    mode: (state) => state.mode,
    sequenceList: (state) => state.sequenceList,
    playList: (state) => state.playList,
    fullScreen: (state) => state.fullScreen,
    currentIndex: (state) => state.currentIndex,
  },
};
