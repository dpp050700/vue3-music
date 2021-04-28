<template>
  <div class="singer">
    <horizon-shortcut direction="horizontal"></horizon-shortcut>
  </div>
</template>

<script>
import HorizonShortcut from "@/components/base/horizon-shortcut/horizon-shortcut";
import { getSingerList } from "@/request/singers";
export default {
  name: "Singer",
  components: { HorizonShortcut },
  data() {
    return {
      singerList: [],
    };
  },
  async created() {
    this.singerList = await getSingerList({});
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
.scroll {
  overflow: hidden;
  width: 300px;
}
.test-wrap {
  width: 800px;
  // height: 500px;
}
.test {
  width: 800px;
  display: flex;
  .test-item {
    min-width: 40px;
    height: 140px;
    text-align: center;
  }
}
</style>
