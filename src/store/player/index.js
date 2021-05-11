import { PLAY_MODE } from "@/common/config/index";
import * as mutationsType from "./mutation-type";
import { shuffle } from "@/common/utils/help";
export default {
  namespaced: true,
  state: {
    mode: PLAY_MODE.sequence,
    sequenceList: [],
    playList: [],
    currentIndex: 0,
    fullScreen: false,
    playing: false,
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
    [mutationsType.SET_PLAYING_STATE](state, playingState) {
      state.playing = playingState;
    },
  },
  actions: {
    selectPlay({ commit }, { list, index }) {
      commit(mutationsType.SET_PLAYER_MODE, PLAY_MODE.sequence);
      commit(mutationsType.SET_FULL_SCREEN, true);
      commit(mutationsType.SET_SEQUENCE_LIST, list);
      commit(mutationsType.SET_PLAY_LIST, list);
      commit(mutationsType.SET_PLAYING_STATE, true);
      commit(mutationsType.SET_CURRENT_INDEX, index);
    },
    randomPlay({ commit }, list) {
      commit(mutationsType.SET_PLAYER_MODE, PLAY_MODE.random);
      commit(mutationsType.SET_FULL_SCREEN, true);
      commit(mutationsType.SET_SEQUENCE_LIST, list);
      commit(mutationsType.SET_PLAY_LIST, shuffle(list));
      commit(mutationsType.SET_PLAYING_STATE, true);
      commit(mutationsType.SET_CURRENT_INDEX, 0);
    },
  },
  getters: {
    mode: (state) => state.mode,
    playing: (state) => state.playing,
    sequenceList: (state) => state.sequenceList,
    playList: (state) => state.playList,
    fullScreen: (state) => state.fullScreen,
    currentIndex: (state) => state.currentIndex,
    currentSong: (state) => state.playList[state.currentIndex] || {},
  },
};
