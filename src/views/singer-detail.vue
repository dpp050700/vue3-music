<template>
  <music-list
    :name="detail.name"
    :cover="detail.cover"
    :list="list"
    @pull-up="pullUp"
  ></music-list>
</template>

<script>
import { getSingerDetail, getSingerSongs } from "@/request/singers";
import usePagination from "@/hooks/use-pagination.js";
import MusicList from "@/components/music-list/music-list.vue";

export default {
  name: "",
  components: {
    MusicList,
  },
  data() {
    return {
      detail: {},
    };
  },
  async created() {
    this.id = this.$route.params.id;
    this.singerDetail();
    await this.initPage({ id: this.id });
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
    const { initPage, nextPage, list, isLast } = usePagination(
      props,
      getSingerSongs
    );
    return {
      initPage,
      nextPage,
      list,
      isLast,
    };
  },
};
</script>

<style lang="scss" scoped></style>
