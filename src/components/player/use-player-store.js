import { useStore } from "vuex";
import { getStoreGetter } from "@/common/utils/help.js";
import { computed } from "vue";

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
      return "icon-pause";
    }
    return "icon-play";
  });

  const currentIndex = computed(() =>
    getStoreGetter(store, "currentIndex", "player")
  );

  return {
    isFull,
    playList,
    playMode,
    sequenceList,
    currentSong,
    playing,
    playIcon,
    currentIndex,
  };
}
