<template>
  <div class="singer">
    <index-list :list="singerList"></index-list>
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
