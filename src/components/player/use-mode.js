import usePlayerStore from "./use-player-store";
import { useStore } from "vuex";
import { computed } from "vue";
import { PLAY_MODE } from "@/common/config/index";
export default function useMode() {
  const store = useStore();
  const { playMode } = usePlayerStore();

  const modeIcon = computed(() => {
    const playModeVal = playMode.value;
    return playModeVal === PLAY_MODE.random
      ? "icon-random"
      : playModeVal === PLAY_MODE.sequence
      ? "icon-sequence"
      : "icon-loop";
  });

  const modeText = computed(() => {
    const playModeVal = playMode.value;
    return playModeVal === PLAY_MODE.random
      ? "随机播放"
      : playModeVal === PLAY_MODE.sequence
      ? "顺序播放"
      : "列表循环";
  });

  function changeMode() {
    const mode = (playMode.value + 1) % 3;
    store.dispatch("player/changeMode", mode);
  }
  return { changeMode, modeIcon, modeText };
}
