<template>
  <scroll
    direction="horizontal"
    class="scroll"
    v-if="direction === 'horizontal'"
  >
    <ul
      ref="shortcutRef"
      :class="wrapperClass"
      @touchstart.stop.prevent="onTouchStart"
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
  </scroll>
  <ul
    v-else
    ref="shortcutRef"
    :class="wrapperClass"
    @touchstart.stop.prevent="onTouchStart"
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
import Scroll from "@/components/base/scroll/scroll";
import useShortcut from "./use-shortcut";
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
    // 方向
    direction: {
      type: String,
      default: "vertical", // horizontal vertical
    },
    // 何时触发 move or end or start
    probeType: {
      type: [Number, Array], // 0, 1, 2
      default: 0,
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
  mounted() {
    console.log(this.shortcutRef);
    // this.shortcutRef.style.width = "400px";
  },
  setup(props, { emit }) {
    const shortcutRef = ref(null);
    const { onTouchStart } = useShortcut(shortcutRef, props, emit);

    return {
      shortcutRef,
      onTouchStart,
      // onTouchMove,
      // onTouchEnd,
    };
  },
};
</script>

<style lang="scss" scoped>
.scroll {
  width: 300px;
}
.shortcut-wrapper {
  width: 1500px;
  &.shortcut-horizontal {
    display: flex;
    .item {
      padding: 0 5px;
      height: 100px;
      min-width: 50px;
      line-height: 100px;
      color: $color-text-l;
      font-size: $font-size-small;
      &.current {
        color: $color-theme;
      }
    }
  }
  &.shortcut-vertical {
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
}
</style>
