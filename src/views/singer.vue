<template>
  <div class="singer">1</div>
</template>

<script>
import { getSingerList } from "@/request/singers";
export default {
  name: "Singer",
  components: {},
  data() {
    return {
      singerList: [],
    };
  },
  async created() {
    this.singerList = await getSingerList();
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
