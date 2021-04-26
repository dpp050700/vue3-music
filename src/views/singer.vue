<template>
  <div class="singer">
    <scroll direction="horizontal" class="scroll">
      <!-- <div class="test-wrap"> -->
      <ul class="test">
        <li class="test-item" v-for="item in 20" :key="item">{{ item }}</li>
      </ul>
      <!-- </div> -->
    </scroll>
    <shortcut direction="horizontal"></shortcut>
  </div>
</template>

<script>
import Scroll from "@/components/base/scroll/scroll";
import Shortcut from "@/components/base/shortcut/shortcut";
import { getSingerList } from "@/request/singers";
export default {
  name: "Singer",
  components: { Shortcut, Scroll },
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
