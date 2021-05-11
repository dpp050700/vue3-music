import { useStore } from "vuex";
import { getStoreGetter } from "@/common/utils/help.js";
import { computed } from "vue";
import {
  SET_PLAYING_STATE,
  SET_CURRENT_INDEX,
} from "@/store/player/mutation-type.js";
export default function usePlayer(audioRef) {
  const store = useStore();

  const isFull = computed(() => getStoreGetter(store, "fullScreen", "player"));
  const playList = computed(() => getStoreGetter(store, "playList", "player"));
  const playMode = computed(() => getStoreGetter(store, "mode", "player"));
  const sequenceList = computed(() =>
    getStoreGetter(store, "sequenceList", "player")
  );
  const currentSong = computed(() =>
    getStoreGetter(store, "currentSong", "player")
  );
  const playing = computed(() => getStoreGetter(store, "playing", "player"));

  const playIcon = computed(() => {
    if (playing.value) {
      return "icon-pause";
    }
    return "icon-play";
  });

  const currentIndex = computed(() =>
    getStoreGetter(store, "currentIndex", "player")
  );

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
    togglePlay(false);
  }

  function prev() {
    const list = playList.value;
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
  };
}
