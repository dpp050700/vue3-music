import { useStore } from "vuex";
import { getStoreGetter } from "@/common/utils/help.js";
import { computed } from "vue";
import { SET_FULL_SCREEN } from "@/store/player/mutation-type.js";

export default function usePlayerStore() {
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
      return isFull.value ? "icon-pause" : "icon-pause-mini";
    }
    return isFull.value ? "icon-play" : "icon-play-mini";
  });

  const currentIndex = computed(() =>
    getStoreGetter(store, "currentIndex", "player")
  );

  function toggleFullScreen(isFull) {
    store.commit(`player/${SET_FULL_SCREEN}`, isFull);
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
    toggleFullScreen,
  };
}
