import { onMounted, onBeforeUnmount } from "vue";
export default function useShortcut(shortcutRef, props, emit) {
  let { probeType } = props;
  const ANCHOR_HEIGHT = 18;
  const touch = {};

  if (typeof probeType === "number") probeType = [probeType];

  const onTouchStart = (e) => {
    const startIndex = parseInt(e.target.dataset.index);
    touch.startY = e.touches[0].pageY;
    touch.startIndex = startIndex;
    if (isNaN(startIndex)) {
      return;
    }
    if (probeType.includes(0)) {
      emit("change", touch.startIndex);
      emit("update:currentIndex", touch.startIndex);
    }
  };

  const onTouchMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    touch.currentY = e.touches[0].pageY;
    const delta = ((touch.currentY - touch.startY) / ANCHOR_HEIGHT) | 0;
    touch.currentIndex = touch.startIndex + delta;
    if (isNaN(touch.currentIndex)) {
      return;
    }
    emit("move", touch.currentIndex);
    emit("update:currentIndex", touch.currentIndex);
  };

  const onTouchEnd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    touch.currentY = e.changedTouches[0].pageY;
    const delta = ((touch.currentY - touch.startY) / ANCHOR_HEIGHT) | 0;
    touch.currentIndex = touch.startIndex + delta;
    if (isNaN(touch.currentIndex)) {
      return;
    }
    emit("change", touch.currentIndex);
    emit("update:currentIndex", touch.currentIndex);
  };

  onMounted(() => {
    const shortcutRefValue = shortcutRef.value;
    if (probeType.includes(2)) {
      shortcutRefValue.addEventListener("touchmove", onTouchMove);
    }
    if (probeType.includes(1)) {
      shortcutRefValue.addEventListener("touchend", onTouchEnd);
    }
  });

  onBeforeUnmount(() => {
    const shortcutRefValue = shortcutRef.value;
    shortcutRefValue.removeEventListener("touchmove", onTouchMove);
    shortcutRefValue.removeEventListener("touchend", onTouchEnd);
  });

  return {
    onTouchStart,
  };
}
