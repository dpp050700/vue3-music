import { nextTick, ref, watch, computed } from "vue";
export default function useFixed(props) {
  const scrollY = ref(0);
  const groupRef = ref(null);
  const groupItemHeights = ref([]);
  const currentIndex = ref(0);
  const distance = ref(0);
  const TITLE_HEIGHT = 30;

  watch(
    () => props.list,
    async () => {
      await nextTick();
      calculateHeight();
    }
  );

  watch(scrollY, (newY) => {
    const heightList = groupItemHeights.value;
    for (let index = 0; index < heightList.length - 1; index++) {
      const topHeight = heightList[index];
      const bottomHeight = heightList[index + 1];
      if (newY >= topHeight && newY < bottomHeight) {
        currentIndex.value = index;
        distance.value = bottomHeight - newY;
      }
    }
  });

  const fixedTitle = computed(() => {
    if (scrollY.value < 0) {
      return "";
    }
    const currentGroup = props.list[currentIndex.value];
    return currentGroup ? currentGroup.initial : "";
  });

  const fixedTranslate = computed(() => {
    const distanceVal = distance.value;
    const diff =
      distanceVal > 0 && distanceVal < TITLE_HEIGHT
        ? distanceVal - TITLE_HEIGHT
        : 0;
    return {
      transform: `translateY(${diff}px)`,
    };
  });

  function calculateHeight() {
    let groupHeightList = groupItemHeights.value;
    const list = groupRef.value.children;
    groupHeightList.length = 0;
    let height = 0;
    groupHeightList.push(0);
    for (let index = 0; index < list.length; index++) {
      height += list[index].clientHeight;
      groupHeightList.push(height);
    }
  }

  function onScrollHandler(pos) {
    scrollY.value = -pos.y;
  }
  return {
    onScrollHandler,
    groupRef,
    currentIndex,
    fixedTitle,
    fixedTranslate,
  };
}
