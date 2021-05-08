<template>
  <div class="recommend" v-loading:[loadingConfig]="loading">
    <scroll class="recommend-content">
      <div>
        <div class="slider-container">
          <Slider :sliders="sliders" v-if="sliders.length" />
        </div>
        <div class="recommend-item">
          <h1 class="recommend-item_title">热门歌单</h1>
          <ul class="recommend-item_list">
            <li
              class="list-item"
              v-for="item in hotList"
              :key="item.id"
              @click="clickItem(item)"
            >
              <count-tag
                icon="headset"
                :count="item.playCountText"
                class="count-tag"
              ></count-tag>
              <img :src="item.picUrl" />
              <p class="list-item_name">{{ item.name }}</p>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
  <router-view></router-view>
</template>

<script>
import { getBanner, getHotRecommend } from "@/request/recommend";
import Slider from "@/components/base/slider/slider";
import CountTag from "@/components/base/countTag/countTag";
import Scroll from "@/components/base/scroll/scroll";
import LoadingImg from "@/assets/images/loading.gif";
export default {
  name: "Recommend",
  components: {
    Slider,
    CountTag,
    Scroll,
  },
  data() {
    return {
      sliders: [],
      hotList: [],
      loading: true,
      loadingConfig: {
        position: "center",
        title: "玩命加载中...",
        translateY: 10,
        image: LoadingImg,
        customIcon: true,
      },
      empty: true,
    };
  },
  async created() {
    this.sliders = await getBanner();
    this.hotList = await getHotRecommend();
    this.loading = false;
  },
  methods: {
    clickItem({ id }) {
      this.$router.push(`/recommend/${id}`);
    },
  },
};
</script>
<style lang="scss" scoped>
.recommend {
  position: fixed;
  width: 100%;
  top: 94px;
  bottom: 0;
  overflow: hidden;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .slider-container {
      position: relative;
      &::before {
        content: " ";
        left: 0;
        position: absolute;
        top: -300px;
        height: 400px;
        width: 100%;
        background: rgb(212, 68, 57);
      }
    }
    .recommend-item {
      .recommend-item_title {
        font-weight: 700;
        padding-left: 6px;
        font-size: 14px;
        line-height: 60px;
      }
      .recommend-item_list {
        display: flex;
        justify-content: space-around;
        flex-wrap: wrap;
        .list-item {
          width: 32vw;
          position: relative;
          margin-bottom: 15px;
          & > img {
            width: 32vw;
            height: 32vw;
            display: block;
          }
          .list-item_name {
            height: 32px;
            overflow: hidden;
            line-height: 16px;
            font-size: $font-size-small;
            @include more-line-ellipsis(2);
          }
          .count-tag {
            position: absolute;
            right: 0;
            top: 0;
            font-size: 10px;
            color: $color-text;
          }
        }
      }
    }
  }
}
</style>
