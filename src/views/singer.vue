<template>
  <div class="singer">
    <!-- <div>
      <h1>热门歌手</h1>
      <span>更多</span>
    </div> -->
    <index-list :list="singerList"></index-list>
  </div>
</template>

<script>
import { getSingerTopList } from "@/request/singers";
import IndexList from "@/components/base/index-list/index-list";
export default {
  name: "Singer",
  components: {
    IndexList,
  },
  data() {
    return {
      singerList: [],
    };
  },
  async created() {
    this.singerList = await getSingerTopList();
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 94px;
  bottom: 0;
  overflow: hidden;
}
</style>
