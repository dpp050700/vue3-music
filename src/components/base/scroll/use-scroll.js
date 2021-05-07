import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
import { onMounted, ref } from "vue";
import { debounce } from "@/common/utils/util";

BScroll.use(ObserveDOM);

export default function useScroll(wrapperRef, options, emit) {
  const {
    direction,
    pullUpDistance,
    bounceTop,
    bounceBottom,
    ...otherOptions
  } = options;
  const scroll = ref(null);

  const scrollEvent = function () {
    scroll.value.on("scroll", (pos) => {
      emit("scroll", pos);
    });
  };

  const scrollEndEvent = function () {
    const func = debounce((pos) => {
      const distance = pos.y - scroll.value.maxScrollY;
      if (distance <= pullUpDistance) {
        emit("pull-up");
      }
    }, 500);
    scroll.value.on("scrollEnd", func);
  };

  onMounted(() => {
    scroll.value = new BScroll(wrapperRef.value, {
      observeDOM: true,
      scrollX: direction === "horizontal",
      scrollY: direction === "vertical",
      bounce: {
        top: bounceTop,
        bottom: bounceBottom,
      },
      ...otherOptions,
    });

    if (options.probeType > 0) {
      scrollEvent();
      scrollEndEvent();
    }
  });
  return scroll;
}
