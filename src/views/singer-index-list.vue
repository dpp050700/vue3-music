<template>
  <div class="singer">
    <div class="header">
      <i class="music-icon-back" @click="goBack"></i>
      <h1>歌手榜</h1>
    </div>
    <div class="list-wrap">
      <index-list :list="singerList"></index-list>
    </div>
  </div>
</template>

<script>
import { getSingerTopList } from "@/request/singers";
import IndexList from "@/components/base/index-list/index-list";
export default {
  name: "SingerTopList",
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
  methods: {
    goBack() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 0;
  bottom: 0;
  overflow: hidden;
  background: $color-background;
  .header {
    position: absolute;
    height: 40px;
    top: 0;
    width: 100%;
    text-align: center;
    line-height: 40px;
    color: #fff;
    z-index: 20;
    background: $color-theme;
    i {
      position: absolute;
      left: 10px;
      font-size: 28px;
    }
  }
  .list-wrap {
    position: absolute;
    top: 40px;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>
