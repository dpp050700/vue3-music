<template>
  <div class="player" v-show="playList.length">
    <div class="full-player" v-show="isFull">
      <div class="bg-wrapper">
        <img :src="currentSong.album?.picUrl" />
      </div>
      <div class="top">
        <div class="back">
          <i class="icon-back"></i>
        </div>
        <div class="name">{{ currentSong.name }}</div>
        <div class="singers">{{ currentSong.singers }}</div>
      </div>
      <div class="middle"></div>
      <div class="bottom">
        <div class="dot-wrapper">
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
        <div class="progress-wrapper">
          <span class="time time-left"></span>
          <span class="progress-bar-wrapper">
            <progress-bar></progress-bar>
          </span>
          <span class="time time-right"></span>
        </div>
        <div class="operate-wrapper">
          <div class="icon">
            <i class="icon-loop"></i>
          </div>
          <div class="icon">
            <i class="icon-prev" @click="prev"></i>
          </div>
          <div class="icon">
            <i :class="playIcon" @click="togglePlay"></i>
          </div>
          <div class="icon">
            <i class="icon-next" @click="next"></i>
          </div>
          <div class="icon">
            <i class="icon-favorite"></i>
          </div>
        </div>
      </div>
    </div>
    <mini-player :progress="progress"></mini-player>
    <audio ref="audioRef"></audio>
  </div>
</template>

<script>
import usePlayer from "./use-player";
import MiniPlayer from "./mini-player";
import ProgressBar from "./progress-bar";
import { ref, watch } from "vue";
export default {
  name: "",
  components: {
    MiniPlayer,
    ProgressBar,
  },
  data() {
    return {
      progress: 0.3,
    };
  },
  methods: {},
  setup() {
    const audioRef = ref();
    const songReady = ref(false);
    const {
      playList,
      isFull,
      currentSong,
      playIcon,
      togglePlay,
      next,
      prev,
    } = usePlayer(audioRef);

    watch(currentSong, (newSong) => {
      const audioEl = audioRef.value;
      audioEl.src = newSong.url;
      audioEl.play();
      togglePlay(true);
    });

    return {
      playList,
      isFull,
      currentSong,
      playIcon,
      togglePlay,
      next,
      prev,
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
    .bg-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      opacity: 0.6;
      filter: blur(20px);

      img {
        width: 100%;
        height: 100%;
      }
    }
    .top {
      position: relative;
      margin-bottom: 20px;
      .back {
        position: absolute;
        top: 0px;
        left: 6px;
        .icon-back {
          padding: 10px;
          transform: rotate(-90deg);
          font-size: 20px;
          display: block;
        }
      }
      .name {
        height: 40px;
        line-height: 40px;
        text-align: center;
      }
      .singers {
        height: 20px;
        line-height: 20px;
        text-align: center;
      }
    }
    .middle {
      position: fixed;
      width: 100%;
      top: 80px;
      bottom: 170px;
      white-space: nowrap;
      font-size: 0;
    }
    .bottom {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .dot-wrapper {
        text-align: center;
        font-size: 0;
        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: $color-text-l;
          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-text-ll;
          }
        }
      }
      .progress-wrapper {
        width: 80%;
        margin: 0px auto;
        display: flex;
        align-items: center;
        padding: 10px 0;
        .time {
          color: $color-text-d;
          font-size: $font-size-small;
          flex: 0 0 40px;
          line-height: 30px;
          width: 40px;
          &.time-left {
            text-align: left;
          }
          &.time-right {
            text-align: right;
          }
        }
        .progress-bar-wrapper {
          flex: 1;
        }
      }
      .operate-wrapper {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: $color-theme;
          &.disable {
            color: $color-theme-d;
          }
          i {
            font-size: 30px;
          }
        }
      }
    }
  }
}
</style>
