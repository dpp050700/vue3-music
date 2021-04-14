<template>
  <div class="slider-wrapper" ref="wrapperRef">
    <div class="slider-group">
      <div v-for="item in sliders" class="slider-page" :key="item.id">
        <img :src="item.imageUrl" />
      </div>
    </div>
    <div class="dots-wrapper">
      <span
        class="dot"
        v-for="(item, index) in sliders"
        :key="item.id"
        :class="{ active: currentIndex === index }"
      ></span>
    </div>
  </div>
</template>

<script>
import useSlider from "./use-slider";
import { ref } from "vue";
export default {
  name: "Slider",
  props: {
    sliders: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  methods: {},
  setup() {
    const wrapperRef = ref(null);
    const { currentIndex } = useSlider(wrapperRef);
    return {
      wrapperRef,
      currentIndex,
    };
  },
};
</script>

<style lang="scss" scoped>
.slider-wrapper {
  min-height: 1px;
  font-size: 0;
  touch-action: pan-y;
  position: relative;
  .slider-group {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    .slider-page {
      display: inline-block;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      a {
        display: block;
        width: 100%;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots-wrapper {
    position: absolute;
    left: 50%;
    bottom: 12px;
    line-height: 12px;
    transform: translateX(-50%);
    .dot {
      display: inline-block;
      margin: 0 4px;
      width: 8px;
      height: 8px;
      transform: translateZ(1px);
      border-radius: 50%;
      background: $color-text-l;
      &.active {
        width: 20px;
        border-radius: 5px;
        background: $color-text-ll;
      }
    }
  }
}
</style>
