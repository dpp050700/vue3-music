import { useStore } from "vuex";
// import { getStoreGetter } from "@/common/utils/help.js";
// import { computed } from "vue";
import usePlayerStore from "./use-player-store";
import {
  SET_PLAYING_STATE,
  SET_CURRENT_INDEX,
} from "@/store/player/mutation-type.js";
export default function usePlayer(audioRef, songReady) {
  const store = useStore();

  const {
    isFull,
    playList,
    playMode,
    sequenceList,
    currentSong,
    playing,
    playIcon,
    currentIndex,
    toggleFullScreen,
  } = usePlayerStore();

  function togglePlay(isPlaying) {
    if (isPlaying === undefined) {
      isPlaying = !playing.value;
    }
    store.commit(`player/${SET_PLAYING_STATE}`, isPlaying);
  }

  function loop() {
    const audioEl = audioRef.value;
    audioEl.currentTime = 0;
    audioEl.play();
    togglePlay(true);
  }

  function prev() {
    const list = playList.value;
    if (!songReady.value || list.length === 0) {
      return;
    }
    if (list.length === 1) {
      loop();
    } else {
      let index = currentIndex.value - 1;
      if (index === -1) {
        index = list.length - 1;
      }
      store.commit(`player/${SET_CURRENT_INDEX}`, index);
    }
  }

  function next() {
    const list = playList.value;
    if (!songReady.value || list.length === 0) {
      return;
    }
    if (list.length === 1) {
      loop();
    } else {
      let index = currentIndex.value + 1;
      if (index === list.length) {
        index = 0;
      }
      store.commit(`player/${SET_CURRENT_INDEX}`, index);
    }
  }

  return {
    isFull,
    playList,
    playMode,
    sequenceList,
    currentSong,
    playing,
    playIcon,
    currentIndex,
    togglePlay,
    prev,
    next,
    loop,
    toggleFullScreen,
  };
}
