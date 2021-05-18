<template>
  <div class="mini-player" v-show="!isFull">
    <div class="cd-wrapper">
      <div class="cd" @click="toggleScreen">
        <img
          ref="cdRef"
          class="playing"
          :class="cdClass"
          :src="currentSong.album?.picUrl"
        />
      </div>
    </div>
    <div class="play-list-slider">
      <div class="slider-page">
        <div class="name">{{ currentSong.name }}</div>
        <div class="singers">{{ currentSong.singers }}</div>
      </div>
    </div>
    <div class="control">
      <progress-circle :radius="32" :progress="progress">
        <i class="play-statu-icon" :class="playIcon" @click="togglePlay"></i>
      </progress-circle>
    </div>
    <div class="control">
      <i class="music-icon-list play-list-icon"></i>
    </div>
  </div>
</template>

<script>
import { watch } from "vue";
import ProgressCircle from "./progress-circle";
import usePlayerStore from "./use-player-store";
import useCd from "./use-cd";
export default {
  name: "",
  emits: ["toggle-screen", "toggle-play"],
  props: {
    progress: Number,
  },
  components: {
    ProgressCircle,
  },
  data() {
    return {};
  },
  computed: {
    picUrl() {
      return this.currentSong.album?.picUrl;
    },
  },
  methods: {
    toggleScreen() {
      this.$emit("toggle-screen");
    },
    togglePlay() {
      this.$emit("toggle-play");
    },
  },
  setup() {
    const {
      isFull,
      currentSong,
      playList,
      sequenceList,
      playMode,
      playIcon,
      playing,
    } = usePlayerStore();

    const { cdClass, cdRef, initTransform } = useCd(playing);

    watch(currentSong, (newSong) => {
      if (!newSong.id) {
        return;
      }
      initTransform();
    });

    return {
      isFull,
      currentSong,
      playList,
      playMode,
      sequenceList,
      playIcon,
      // use-cd
      cdClass,
      cdRef,
    };
  },
};
</script>

<style lang="scss" scoped>
.mini-player {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: #fff;
  display: flex;
  align-items: center;
  .cd-wrapper {
    flex: 0 0 40px;
    width: 40px;
    height: 40px;
    padding: 0 10px 0 20px;
    .cd {
      border-radius: 50%;
      overflow: hidden;
      img {
        display: block;
        width: 100%;
        &.playing {
          animation: rotate 10s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
  }
  .play-list-slider {
    flex: 1;
    height: 40px;
    overflow: hidden;
    .slider-page {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      .name {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        height: 20px;
        line-height: 20px;
        font-size: 14px;
      }
      .singers {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        height: 20px;
        line-height: 20px;
        font-size: 12px;
        color: $color-text-l;
      }
    }
  }
  .control {
    flex: 0 0 30px;
    padding: 0px 10px;
    position: relative;
    color: $color-theme;
    .play-statu-icon {
      position: absolute;
      left: 0;
      top: 0;
      font-size: 32px;
      color: $color-theme-d;
    }
    .play-list-icon {
      font-size: 30px;
    }
  }
}
</style>
