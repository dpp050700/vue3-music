<template>
  <div class="top-list-wrap" v-loading:[loadingConfig]="loading">
    <scroll class="top-list-scroll">
      <div>
        <h1 class="top-list-title">官方榜</h1>
        <top-item-list
          @click="toSingerIndex"
          :cover="singerTopCover"
          :list="artistToplist"
          :type="1"
        ></top-item-list>
        <top-item-list
          v-for="item in officialList"
          :cover="item.coverImgUrl"
          :key="item.id"
          :list="item.tracks"
          @click="toAlbumDetail(item)"
        ></top-item-list>
        <h1 class="top-list-title">全球榜</h1>
        <div class="global-wrapper">
          <div
            class="global-item"
            v-for="item in globalList"
            :key="item.id"
            @click="toAlbumDetail(item)"
          >
            <div class="global-img-wrapper">
              <img :src="item.coverImgUrl" />
              <div class="decorate"></div>
              <div class="updateInfo">{{ item.updateFrequency }}</div>
            </div>
          </div>
        </div>
      </div>
    </scroll>
  </div>
  <router-view></router-view>
</template>

<script>
import Scroll from "@/components/base/scroll/scroll";
import { getTopList } from "@/request/toplist";
import { getSingerTopDetail } from "@/request/singers";
import TopItemList from "@/components/top-item-list/top-item-list.vue";
import singerTopCover from "@/assets/images/singerTop.png";
import LoadingImg from "@/assets/images/loading.gif";
export default {
  name: "TopList",
  components: {
    TopItemList,
    Scroll,
  },
  data() {
    return {
      officialList: [],
      globalList: [],
      artistToplist: [],
      singerTopCover,
      loading: true,
      loadingConfig: {
        position: "center",
        title: "正在加载...",
        image: LoadingImg,
        customIcon: true,
      },
    };
  },
  async created() {
    let { officialList, globalList } = await getTopList();
    let artistToplist = await getSingerTopDetail();
    this.officialList = officialList;
    this.globalList = globalList;
    this.artistToplist = artistToplist;
    this.loading = false;
  },
  methods: {
    toSingerIndex() {
      this.$router.push("/rank/singer-index-list");
    },
    toAlbumDetail({ id }) {
      this.$router.push(`/rank/${id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.top-list-wrap {
  position: fixed;
  width: 100%;
  top: 94px;
  bottom: 0;
  overflow: hidden;
  padding: 0 5px;
  box-sizing: border-box;
  .top-list-scroll {
    height: 100%;
    overflow: hidden;
    .top-list-title {
      font-size: 14px;
      font-weight: 700;
      padding: 12px 0;
    }
    .global-wrapper {
      display: flex;
      flex-flow: row wrap;
      justify-content: space-between;
      .global-item {
        width: 32vw;
        height: 32vw;
        border-radius: 5px;
        padding: 3px 0;
        overflow: hidden;
        .global-img-wrapper {
          position: relative;
          height: 100%;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
          .decorate {
            position: absolute;
            bottom: 0px;
            width: 100%;
            height: 35px;
            border-radius: 3px;
            background: linear-gradient(
              rgba(255, 255, 255, 0),
              rgba(110, 110, 110, 0.4)
            );
          }
          .updateInfo {
            position: absolute;
            left: 7px;
            bottom: 7px;
            font-size: 10px;
            color: rgb(241, 241, 241);
          }
        }
      }
      &::after {
        content: "";
        display: block;
        width: 32vw;
      }
    }
  }
}
</style>
