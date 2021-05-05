<template>
  <music-list
    :name="detail.name"
    :cover="detail.cover"
    :list="detail.songs"
  ></music-list>
</template>

<script>
import { getPlayListDetail } from "@/request/album";
import MusicList from "@/components/music-list/music-list.vue";

export default {
  name: "",
  components: {
    MusicList,
  },
  data() {
    return {
      detail: { name: "", cover: "", songs: [] },
    };
  },
  async created() {
    this.id = this.$route.params.id;
    this.getPlayListDetail();
  },
  methods: {
    async getPlayListDetail() {
      this.detail = await getPlayListDetail(this.id);
    },
  },
};
</script>

<style lang="scss" scoped></style>
