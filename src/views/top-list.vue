<template>
  <div class="topList">
    <top-item-list
      @click="toSingerIndex"
      :cover="singerTopCover"
      :list="artistToplist"
      :type="1"
    ></top-item-list>
    <top-item-list
      v-for="item in list"
      :cover="item.coverImgUrl"
      :key="item.id"
      :list="item.tracks"
    ></top-item-list>
  </div>
</template>

<script>
import { getTopList } from "@/request/toplist";
import { getSingerTopDetail } from "@/request/singers";
import TopItemList from "@/components/top-item-list/top-item-list.vue";
import singerTopCover from "@/assets/images/singerTop.png";
export default {
  name: "TopList",
  components: {
    TopItemList,
  },
  data() {
    return {
      list: [],
      artistToplist: {},
      singerTopCover,
    };
  },
  async created() {
    let list = await getTopList();
    let artistToplist = await getSingerTopDetail();
    this.list = list;
    this.artistToplist = artistToplist;
  },
  methods: {
    toSingerIndex() {
      this.$router.push("/singer-top-list");
    },
  },
};
</script>
