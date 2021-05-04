<template>
  <div class="singer-detail">
    <div class="music-list">
      <div class="header">
        <i class="music-icon-back"></i>
        <h1>{{ detail.name }}</h1>
      </div>
      <div class="bg-img" :style="bgImage" ref="bgImage">
        <div class="filter" :style="filterStyle"></div>
      </div>
      <scroll
        class="list"
        :style="scrollStyle"
        ref="scrollRef"
        :probe-type="3"
        @pull-up="pullUp"
        @scroll="onScrollHandler"
      >
        <song-list :list="list"></song-list>
      </scroll>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { getSingerDetail, getSingerSongs } from "@/request/singers";
import Scroll from "@/components/base/scroll/scroll.vue";
import SongList from "@/components/song-list/song-list.vue";
import usePagination from "@/hooks/use-pagination.js";

const RESERVED_HEIGHT = 40;
export default {
  name: "",
  components: {
    Scroll,
    SongList,
  },
  data() {
    return {
      detail: {},
      imageHeight: 0,
      scrollY: 0,
    };
  },
  async created() {
    this.id = this.$route.params.id;
    this.singerDetail();
    await this.initPage({ id: this.id });
  },
  computed: {
    bgImage() {
      const scrollY = this.scrollY;
      let zIndex = 0;
      let paddingTop = "70%";

      let scale = 1;
      if (scrollY > 0) {
        scale = 1 + Math.abs(scrollY / this.imageHeight);
      }

      if (-scrollY > this.maxTranslateY) {
        zIndex = 10;
        paddingTop = `${RESERVED_HEIGHT}px`;
      }

      return {
        zIndex,
        paddingTop,
        backgroundImage: `url("${this.detail.cover}")`,
        transform: `scale(${scale})translateZ(0px)`,
      };
    },
    filterStyle() {
      let blur = 0;
      const { scrollY, imageHeight } = this;
      if (scrollY <= 0) {
        blur =
          Math.min(this.maxTranslateY / imageHeight, -scrollY / imageHeight) *
          20;
      }
      return {
        backdropFilter: `blur(${blur}px)`,
      };
    },
    scrollStyle() {
      return {
        top: `${this.imageHeight}px`,
        bottom: 0,
      };
    },
  },

  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight;
    this.maxTranslateY = this.imageHeight - RESERVED_HEIGHT;
  },
  methods: {
    async singerDetail() {
      this.detail = await getSingerDetail(this.id);
    },
    async pullUp() {
      await this.nextPage({ id: this.id });
    },
    onScrollHandler(pos) {
      this.scrollY = pos.y;
    },
  },
  setup(props) {
    const scrollRef = ref(null);
    const { initPage, nextPage, list, isLast } = usePagination(
      props,
      getSingerSongs,
      scrollRef
    );
    return {
      scrollRef,
      initPage,
      nextPage,
      list,
      isLast,
    };
  },
};
</script>

<style lang="scss" scoped>
.singer-detail {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: #fff;
  .music-list {
    position: relative;
    height: 100%;
  }
  .bg-img {
    padding-top: 70%;
    background-size: cover;
    position: relative;
    height: 0;
    transform-origin: top;
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: fixed;
    width: 100%;
    left: 0;
  }
  .header {
    position: absolute;
    height: 40px;
    top: 0;
    width: 100%;
    text-align: center;
    line-height: 40px;
    color: #fff;
    z-index: 20;
    i {
      position: absolute;
      left: 10px;
      font-size: 28px;
    }
  }
}
</style>
