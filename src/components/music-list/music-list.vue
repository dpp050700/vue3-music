<template>
  <div class="music-detail">
    <div class="music-list">
      <div class="header">
        <i class="music-icon-back" @click="goBack"></i>
        <h1>{{ name }}</h1>
      </div>
      <div class="bg-img" :style="bgImage" ref="bgImage">
        <div class="collect-wrapper" :style="collectBtnStyle">
          <div class="collect-btn">
            <i class="collect-icon music-icon-circle-plus-outline"></i>
            <span class="collect-text">收藏</span>
          </div>
        </div>
        <div class="filter" :style="filterStyle"></div>
      </div>
      <scroll
        class="list"
        :style="scrollStyle"
        ref="scrollRef"
        :probe-type="3"
        @pull-up="onPullUp"
        @scroll="onScrollHandler"
      >
        <song-list :list="list"></song-list>
      </scroll>
    </div>
  </div>
</template>

<script>
import { nextTick, ref } from "vue";
import Scroll from "@/components/base/scroll/scroll.vue";
import SongList from "@/components/song-list/song-list.vue";

const RESERVED_HEIGHT = 40;
export default {
  name: "",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    name: {
      type: String,
      default: "",
    },
    cover: {
      type: String,
      default: "",
    },
  },
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
  emits: ["pull-up"],
  async created() {
    this.maxTranslateY = 0;
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
        backgroundImage: `url("${this.cover}")`,
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
    collectBtnStyle() {
      let display = "";
      if (-this.scrollY > this.maxTranslateY) {
        display = "none";
      }
      return {
        display,
      };
    },
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight;
    this.maxTranslateY = this.imageHeight - RESERVED_HEIGHT;
  },
  watch: {
    list: {
      async handler() {
        await nextTick();
        this.scrollRef.scroll.refresh();
      },
      deep: true,
    },
  },
  methods: {
    onPullUp() {
      this.$emit("pull-up");
    },
    onScrollHandler(pos) {
      this.scrollY = pos.y;
    },
    goBack() {
      this.$router.back();
    },
  },
  setup() {
    const scrollRef = ref(null);
    return {
      scrollRef,
    };
  },
};
</script>

<style lang="scss" scoped>
.music-detail {
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
    .collect-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 10;
      width: 100%;
      .collect-btn {
        box-sizing: border-box;
        width: 120px;
        padding: 10px 0;
        margin: 0 auto;
        text-align: center;
        border-radius: 100px;
        font-size: 14px;
        background-color: $color-background-theme;
        display: flex;
        align-items: center;
        justify-content: center;
        .collect-icon {
          color: #fff;
          margin-right: 4px;
          font-size: 14px;
        }
        .collect-text {
          color: #fff;
        }
      }
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
