<template>
  <scroll ref="scrollRef" direction="horizontal" class="scroll-shortcut">
    <ul ref="shortcutRef" class="horizon-shortcut">
      <li
        class="item"
        v-for="(item, index) in shortcutList"
        :key="item.name"
        :data-index="index"
        @click="clickItem"
      >
        {{ item.label }}
      </li>
    </ul>
  </scroll>
</template>

<script>
export const defaultList = [
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
import Scroll from "@/components/base/scroll/scroll";
export default {
  name: "Shortcut",
  components: { Scroll },
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
  methods: {
    clickItem(index) {
      this.$emit("change", index);
    },
  },
  computed: {
    shortcutList() {
      return this.isCustom ? this.list : defaultList;
    },
    wrapperClass() {
      return `shortcut-wrapper shortcut-${this.direction}`;
    },
  },
  mounted() {
    this.shortcutRef.style.width = "1350px";
    this.scrollRef.scroll.refresh();
  },
  setup() {
    const shortcutRef = ref(null);
    const scrollRef = ref(null);

    return {
      shortcutRef,
      scrollRef,
    };
  },
};
</script>

<style lang="scss" scoped>
.horizon-shortcut {
  display: flex;
  .item {
    padding: 0 5px;
    height: 16px;
    color: $color-text-l;
    font-size: $font-size-small;
    &.current {
      color: $color-theme;
    }
  }
}
</style>
