<template>
  <div ref="scrollWrapper">
    <slot />
  </div>
</template>

<script>
import useScroll from "./use-scroll";
import { ref } from "vue";
export default {
  name: "",
  props: {
    click: {
      type: Boolean,
      default: true,
    },
    probeType: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  emits: ["scroll"],
  setup(props, { emit }) {
    const scrollWrapper = ref(null);
    const scroll = useScroll(scrollWrapper, props, emit);

    return {
      scroll,
      scrollWrapper,
    };
  },
};
</script>

<style lang="scss" scoped>
.scroll-wrapper {
  height: 100%;
  overflow: hidden;
}
</style>
