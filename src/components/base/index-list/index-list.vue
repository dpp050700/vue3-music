<template>
  <scroll
    class="indexList"
    @scroll="onScrollHandler"
    :probe-type="3"
    ref="scrollRef"
  >
    <ul class="index-list-wrapper" ref="groupRef">
      <li v-for="group in list" :key="group.initial" class="index-list-group">
        <h1 class="index-list-group_initial">{{ group.initial }}</h1>
        <singer-list :list="group.list"></singer-list>
      </li>
    </ul>
    <shortcut
      @change="indexChange"
      @move="indexChange"
      :probe-type="[0, 2]"
      class="shortcut-content"
      :list="shortcutList"
      is-custom
    ></shortcut>
    <div class="fix-initial" v-if="fixedTitle" :style="fixedTranslate">
      {{ fixedTitle }}
    </div>
  </scroll>
</template>

<script>
import Scroll from "@/components/base/scroll/scroll";
import SingerList from "@/components/singer-list/singer-list";
import Shortcut from "@/components/base/shortcut/shortcut";
import useFixed from "./use-fixed";
import useShortcut from "./use-shortcut";
export default {
  name: "",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    SingerList,
    Shortcut,
    Scroll,
  },
  data() {
    return {};
  },
  methods: {
    indexChange(index) {
      this.scrollToElement(index);
    },
  },
  computed: {
    shortcutList() {
      let res = this.list.map((item) => item.initial);
      return res;
    },
  },
  setup(props) {
    const {
      onScrollHandler,
      groupRef,
      currentIndex,
      fixedTitle,
      fixedTranslate,
    } = useFixed(props);

    const { scrollRef, scrollToElement } = useShortcut(props, groupRef);

    return {
      onScrollHandler,
      groupRef,
      currentIndex,
      fixedTitle,
      fixedTranslate,
      scrollRef,
      scrollToElement,
    };
  },
};
</script>

<style lang="scss" scoped>
.indexList {
  height: 100%;
  overflow: hidden;
  position: relative;
  .shortcut-content {
    position: absolute;
    background: #fff;
    top: 50%;
    right: 5px;
    transform: translateY(-50%);
    z-index: 9;
  }
  .fix-initial {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    background: $color-background-theme;
    color: $color-text;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}
.index-list-wrapper {
  .index-list-group {
    padding-bottom: 30px;
  }
  .index-list-group_initial {
    height: 30px;
    line-height: 30px;
    padding-left: 20px;
    background: $color-background-theme;
    color: $color-text;
  }
}
</style>
