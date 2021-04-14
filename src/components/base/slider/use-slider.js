import BScroll from "@better-scroll/core";
import Slide from "@better-scroll/slide";
import { onMounted, onUnmounted, ref } from "vue";

BScroll.use(Slide);

export default function useSlider(wrapperRef) {
  const slider = ref(null);
  const currentIndex = ref(0);
  let sliderVal;
  onMounted(() => {
    sliderVal = slider.value = new BScroll(wrapperRef.value, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true,
    });
    sliderVal.on("slideWillChange", (page) => {
      currentIndex.value = page.pageX;
    });
  });

  onUnmounted(() => {
    sliderVal.destroy();
  });

  return {
    slider,
    currentIndex,
  };
}
