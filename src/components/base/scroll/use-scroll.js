import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
import { onMounted, ref } from "vue";

BScroll.use(ObserveDOM);

export default function useScroll(wrapperRef, options, emit) {
  const { direction, ...otherOptions } = options;
  const scroll = ref(null);
  onMounted(() => {
    scroll.value = new BScroll(wrapperRef.value, {
      observeDOM: true,
      scrollX: direction === "horizontal",
      scrollY: direction === "vertical",
      ...otherOptions,
    });

    if (options.probeType > 0) {
      scroll.value.on("scroll", (pos) => {
        emit("scroll", pos);
      });
    }
  });
  return scroll;
}
