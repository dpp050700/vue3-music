import { ref, computed, nextTick } from "vue";
export default function usePagination(props, getListFunc) {
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
      isClear
        ? (list.value = getIndex(lists))
        : list.value.push(...getIndex(lists));
      await nextTick();
      lock.value = false;
    } catch (error) {
      await nextTick();
      lock.value = false;
    }
  };

  const initPage = async (data) => {
    page.value = {
      current: 0,
      size: 50,
    };
    await ajaxRequest(data, { isClear: true });
  };
  const nextPage = async (data) => {
    if (lock.value || isLast.value) return;
    lock.value = true;
    page.value.current += 1;
    await ajaxRequest(data);
  };

  const getIndex = (list) => {
    return list.map((item, index) => {
      return {
        ...item,
        indexNumber: page.value.current * page.value.size + index + 1,
      };
    });
  };

  return {
    list,
    page,
    nextPage,
    initPage,
    isLast,
    lock,
  };
}
