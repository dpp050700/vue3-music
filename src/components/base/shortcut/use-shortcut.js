export default function useShortcut(shortcutRef, props, emit) {
  const ANCHOR_HEIGHT = 18;
  const touch = {};

  const onTouchStart = (e) => {
    const startIndex = parseInt(e.target.dataset.index);
    touch.startY = e.touches[0].pageY;
    touch.startIndex = startIndex;
    if (isNaN(startIndex)) {
      return;
    }
    emit("change", touch.startIndex);
    emit("update:currentIndex", touch.startIndex);
  };

  const onTouchMove = (e) => {
    touch.currentY = e.touches[0].pageY;
    const delta = ((touch.currentY - touch.startY) / ANCHOR_HEIGHT) | 0;
    touch.currentIndex = touch.startIndex + delta;
    if (isNaN(touch.currentIndex)) {
      return;
    }
    emit("change", touch.currentIndex);
    emit("update:currentIndex", touch.currentIndex);
  };

  return {
    onTouchStart,
    onTouchMove,
  };
}
