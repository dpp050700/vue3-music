import { ref } from "vue";
export default (props, groupRef) => {
  const scrollRef = ref(null);

  const scrollToElement = (index) => {
    if (index) {
      const scroll = scrollRef.value.scroll;
      const targetEl = groupRef.value.children[index];
      scroll.scrollToElement(targetEl, 0);
    }
  };
  return { scrollRef, scrollToElement };
};
