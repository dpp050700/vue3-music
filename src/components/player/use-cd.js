import { computed, ref, nextTick } from "vue";
import { removeClass, addClass } from "@/common/utils/dom.js";
export default function useCd(playing) {
  const cdRef = ref(null);

  const cdClass = computed(() => {
    return playing.value ? "" : " pause";
  });

  async function initTransform() {
    // await nextTick();
    removeClass(cdRef.value, "playing");
    await nextTick();
    addClass(cdRef.value, "playing");
    // addClass(cdRef.value, "playing");
  }

  return {
    cdRef,
    cdClass,
    initTransform,
  };
}
