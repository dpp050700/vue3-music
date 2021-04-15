<template>
  <scroll class="indexList">
    <ul class="index-list-wrapper">
      <li v-for="group in list" :key="group.initial" class="index-list-group">
        <h1 class="index-list-group_initial">{{ group.initial }}</h1>
        <singer-list :list="group.list"></singer-list>
      </li>
    </ul>
    <shortcut
      @change="indexChange"
      @move="indexChange"
      :probe-type="[0, 2]"
    ></shortcut>
  </scroll>
</template>

<script>
import Scroll from "@/components/base/scroll/scroll";
import SingerList from "@/components/singer-list/singer-list";
import Shortcut from "@/components/base/shortcut/shortcut";
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
      console.log(index);
    },
  },
};
</script>

<style lang="scss" scoped>
.indexList {
  height: 100%;
  overflow: hidden;
}
.index-list-wrapper {
  .index-list-group {
  }
  .index-list-group_initial {
    height: 40px;
    line-height: 40px;
    padding-left: 20px;
    background: $color-background-theme;
    color: $color-text;
  }
}
</style>
