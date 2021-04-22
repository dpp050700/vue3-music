<template>
  <div class="topList">
    <top-item-list
      v-for="item in list"
      :cover="item.coverImgUrl"
      :key="item.id"
    ></top-item-list>
  </div>
</template>

<script>
import { getTopList } from "@/request/toplist";
import TopItemList from "@/components/top-item-list/top-item-list.vue";
export default {
  name: "TopList",
  components: {
    TopItemList,
  },
  data() {
    return {
      list: [],
      artistToplist: {},
    };
  },
  async created() {
    let { list, artistToplist } = await getTopList();
    this.list = list;
    this.artistToplist = artistToplist;
  },
};
</script>
