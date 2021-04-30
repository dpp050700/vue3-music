import { ref, computed, nextTick } from "vue";
export default function usePagination(props, getListFunc, scrollRef) {
  const page = ref({
    size: 50,
    current: 0,
  });
  const lock = ref(false);
  const list = ref([]);
  const isLast = ref(false);

  const pageParams = computed(() => {
    return {
      limit: page.value.size,
      offset: page.value.size * page.value.current,
    };
  });

  const ajaxRequest = async (data, config) => {
    const { isClear = false } = config || {};
    try {
      let params = Object.assign({}, pageParams.value, data);
      let { lists, more } = await getListFunc(params);
      isLast.value = !more;
      isClear ? (list.value = lists) : list.value.push(...lists);
      await nextTick();
      scrollRef.value.scroll.refresh();
      lock.value = false;
    } catch (error) {
      await nextTick();
      lock.value = false;
    }
  };

  const initPage = (data) => {
    page.value = {
      current: 0,
      size: 50,
    };
    ajaxRequest(data, { isClear: true });
  };
  const nextPage = (data) => {
    if (lock.value || isLast.value) return;
    lock.value = true;
    page.value.current += 1;
    ajaxRequest(data);
  };

  return {
    list,
    page,
    nextPage,
    initPage,
    isLast,
  };
}
