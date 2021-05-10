<template>
  <div class="player" v-show="playList.length">
    <div class="full-player" v-show="isFull"></div>
    <mini-player :progress="progress"></mini-player>
  </div>
</template>

<script>
import usePlayer from "./use-player";
import MiniPlayer from "./mini-player";
export default {
  name: "",
  components: {
    MiniPlayer,
  },
  data() {
    return {
      progress: 0.3,
    };
  },
  methods: {},
  setup() {
    const { playList, isFull } = usePlayer();
    return {
      playList,
      isFull,
    };
  },
};
</script>

<style lang="scss" scoped>
.player {
  .full-player {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: #fff;
  }
}
</style>
