import { useStore } from "vuex";
import { getStoreGetter } from "@/common/utils/help.js";
import { computed } from "@vue/runtime-core";
export default function usePlayer() {
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
  return {
    isFull,
    playList,
    playMode,
    sequenceList,
    currentSong,
  };
}
