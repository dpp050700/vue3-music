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
  },
  data() {
    return {};
  },
  methods: {},
  setup(props) {
    const scrollWrapper = ref(null);
    useScroll(scrollWrapper, props);

    return {
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
