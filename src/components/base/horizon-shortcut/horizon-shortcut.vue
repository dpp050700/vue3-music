<template>
  <scroll ref="scrollRef" direction="horizontal" class="scroll-shortcut">
    <ul ref="shortcutRef" class="horizon-shortcut">
      <li
        class="item"
        v-for="(item, index) in shortcutList"
        :key="item.name"
        :data-index="index"
        @click="clickItem(index, item)"
        :class="{ current: currentIndex === index }"
      >
        {{ item.label }}
      </li>
    </ul>
  </scroll>
</template>

<script>
export const defaultList = [
  "热",
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
    clickItem(index, item) {
      this.$emit("change", index, item);
      this.$emit("update:currentIndex", index);
    },
  },
  computed: {
    shortcutList() {
      return this.isCustom
        ? this.list
        : defaultList.map((item) => ({ label: item }));
    },
    wrapperClass() {
      return `shortcut-wrapper shortcut-${this.direction}`;
    },
  },
  mounted() {
    const list = this.shortcutRef.children;
    let totalWidth = 0;
    list.forEach((ele) => {
      totalWidth += ele.offsetWidth;
    });
    this.shortcutRef.style.width = `${totalWidth}px`;
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
  height: 30px;
  padding: 3px 0;
  box-sizing: border-box;
  .item {
    padding: 0 5px;
    height: 24px;
    color: $color-text-d;
    font-size: $font-size-small;
    flex: 0 0 auto;
    line-height: 24px;
    &.current {
      color: $color-theme;
      border: 1px solid $color-theme;
      border-radius: 8px;
    }
  }
}
</style>
