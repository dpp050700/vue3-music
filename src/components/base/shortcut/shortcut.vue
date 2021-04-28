<template>
  <ul
    ref="shortcutRef"
    class="shortcut-wrapper"
    @touchstart.stop.prevent="onTouchStart"
    @touchmove.stop.prevent="onTouchMove"
    @touchend.stop.prevent
  >
    <li
      class="item"
      v-for="(item, index) in shortcutList"
      :key="item"
      :data-index="index"
      :class="{ current: currentIndex === index }"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script>
const defaultList = [
  "#",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
import { ref } from "vue";
import useShortcut from "./use-shortcut";
export default {
  name: "Shortcut",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    // 是否自定义快捷按钮
    isCustom: {
      type: Boolean,
      default: false,
    },
    currentIndex: Number,
  },
  data() {
    return {};
  },
  emits: ["change"],
  methods: {},
  computed: {
    shortcutList() {
      return this.isCustom ? this.list : defaultList;
    },
    wrapperClass() {
      return `shortcut-wrapper shortcut-${this.direction}`;
    },
  },
  setup(props, { emit }) {
    const shortcutRef = ref(null);
    const { onTouchStart, onTouchMove } = useShortcut(shortcutRef, props, emit);

    return {
      shortcutRef,
      onTouchStart,
      onTouchMove,
    };
  },
};
</script>

<style lang="scss" scoped>
.shortcut-wrapper {
  width: 20px;
  padding: 20px 0;
  border-radius: 10px;
  text-align: center;
  .item {
    padding: 3px;
    line-height: 1;
    color: $color-text-l;
    font-size: $font-size-small;
    &.current {
      color: $color-theme;
    }
  }
}
</style>
