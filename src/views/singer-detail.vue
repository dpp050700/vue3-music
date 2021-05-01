<template>
  <div class="singer-detail">
    <div class="bg-img" :style="bgImage" ref="bgImage"></div>
    <scroll
      class="list"
      :style="scrollStyle"
      ref="scrollRef"
      :probe-type="3"
      @pull-up="pullUp"
    >
      <song-list :list="list"></song-list>
    </scroll>
  </div>
</template>

<script>
import { ref } from "vue";
import { getSingerDetail, getSingerSongs } from "@/request/singers";
import Scroll from "@/components/base/scroll/scroll.vue";
import SongList from "@/components/song-list/song-list.vue";
import usePagination from "@/hooks/use-pagination.js";
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
    };
  },
  async created() {
    this.id = this.$route.params.id;
    this.singerDetail();
    await this.initPage({ id: this.id });
  },
  computed: {
    bgImage() {
      return {
        backgroundImage: `url("${this.detail.cover}")`,
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
    console.log(this.imageHeight);
  },
  methods: {
    async singerDetail() {
      this.detail = await getSingerDetail(this.id);
    },
    async pullUp() {
      await this.nextPage({ id: this.id });
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
  .bg-img {
    padding-top: 70%;
    background-size: cover;
  }
  .list {
    position: fixed;
    width: 100%;
    left: 0;
  }
}
</style>
