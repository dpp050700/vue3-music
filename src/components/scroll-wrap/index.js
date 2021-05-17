import {
  h,
  mergeProps,
  withCtx,
  renderSlot,
  ref,
  computed,
  watch,
  nextTick,
} from "vue";
import Scroll from "../base/scroll/scroll";
import { useStore } from "vuex";
import { getStoreGetter } from "@/common/utils/help";
export default {
  name: "scroll-wrap",
  props: Scroll.props,
  emits: Scroll.emits,
  render(ctx) {
    const emitsEvent = {
      onScroll: (e) => {
        ctx.$emit("scroll", e);
      },
      onPullUp: (e) => {
        ctx.$emit("pull-up", e);
      },
    };
    const options = mergeProps({ ref: "scrollRef" }, ctx.$props, emitsEvent);
    return h(Scroll, options, {
      default: withCtx(() => {
        return [renderSlot(ctx.$slots, "default")];
      }),
    });
  },
  setup() {
    const scrollRef = ref(null);
    const scroll = computed(() => {
      return scrollRef.value.scroll;
    });

    const store = useStore();
    const playList = computed(() =>
      getStoreGetter(store, "playList", "player")
    );

    watch(playList, async () => {
      await nextTick();
      scroll.value.refresh();
    });

    return {
      scrollRef,
      scroll,
    };
  },
};
