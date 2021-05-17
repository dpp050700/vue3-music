<template>
  <div class="player" v-show="playList.length">
    <div class="full-player" v-show="isFull">
      <div class="bg-wrapper">
        <img :src="currentSong.album?.picUrl" />
      </div>
      <div class="top">
        <div
          class="back"
          @click="
            () => {
              toggleFullScreen(false);
            }
          "
        >
          <i class="icon-back"></i>
        </div>
        <div class="name">{{ currentSong.name }}</div>
        <div class="singers">{{ currentSong.singers }}</div>
      </div>
      <div class="middle"></div>
      <div class="bottom">
        <div class="dot-wrapper">
          <div class="dot active"></div>
          <div class="dot"></div>
        </div>
        <div class="progress-wrapper">
          <span class="time time-left">{{ formatTime(currentTime) }}</span>
          <span class="progress-bar-wrapper">
            <progress-bar
              :progress="progress"
              @progress-changed="onProgressChanged"
              @progress-changing="onProgressChanging"
            ></progress-bar>
          </span>
          <span class="time time-right">{{ formatTime(currentSong.dt) }}</span>
        </div>
        <div class="operate-wrapper">
          <div class="icon">
            <i :class="modeIcon" @click="changeMode"></i>
          </div>
          <div class="icon">
            <i class="icon-prev" @click="prev"></i>
          </div>
          <div class="icon">
            <i
              :class="playIcon"
              @click="
                () => {
                  togglePlay();
                }
              "
            ></i>
          </div>
          <div class="icon">
            <i class="icon-next" @click="next"></i>
          </div>
          <div class="icon">
            <i
              :class="getFavoriteIcon(currentSong)"
              @click="toggleFavorite(currentSong)"
            ></i>
          </div>
        </div>
      </div>
    </div>
    <mini-player
      :progress="progress"
      @toggle-screen="
        () => {
          toggleFullScreen(true);
        }
      "
      @toggle-play="
        () => {
          togglePlay();
        }
      "
    ></mini-player>
    <audio
      ref="audioRef"
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script>
import usePlayer from "./use-player";
import useMode from "./use-mode";
import useFavorite from "./use-favorite";
import MiniPlayer from "./mini-player";
import ProgressBar from "./progress-bar";
import { ref, watch, computed } from "vue";
import { getSongUrl, formatTime } from "@/common/utils/help.js";
import { PLAY_MODE } from "@/common/config";
export default {
  name: "",
  components: {
    MiniPlayer,
    ProgressBar,
  },
  data() {
    return {};
  },
  methods: {},
  setup() {
    const audioRef = ref();
    const songReady = ref(false);
    const currentTime = ref(0);
    let progressChanging = false;
    const {
      playList,
      isFull,
      currentSong,
      playIcon,
      playing,
      playMode,
      toggleFullScreen,
      togglePlay,
      next,
      prev,
      loop,
    } = usePlayer(audioRef, songReady);

    const { changeMode, modeIcon } = useMode();

    const { getFavoriteIcon, toggleFavorite } = useFavorite();

    const progress = computed(() => {
      return currentTime.value / currentSong.value.dt;
    });

    watch(currentSong, (newSong) => {
      if (!newSong.id) {
        return;
      }
      songReady.value = false;
      const audioEl = audioRef.value;
      audioEl.src = getSongUrl(newSong.id);
      audioEl.play();
      togglePlay(true);
    });

    watch(playing, (newPlaying) => {
      if (!songReady.value) {
        return;
      }
      const audioEl = audioRef.value;
      if (newPlaying) {
        audioEl.play();
      } else {
        audioEl.pause();
      }
    });

    function ready() {
      if (songReady.value) {
        return;
      }
      songReady.value = true;
    }

    function error() {
      songReady.value = true;
      next();
    }

    function end() {
      currentTime.value = 0;
      if (playMode.value === PLAY_MODE.loop) {
        loop();
      } else {
        next();
      }
    }

    function updateTime(e) {
      if (!progressChanging) {
        currentTime.value = e.target.currentTime;
      }
    }

    function onProgressChanged(progress) {
      progressChanging = false;
      audioRef.value.currentTime = currentTime.value =
        currentSong.value.dt * progress;
      if (!playing.value) {
        togglePlay(true);
      }
    }

    function onProgressChanging(progress) {
      progressChanging = true;
      currentTime.value = currentSong.value.dt * progress;
    }

    return {
      audioRef,
      ready,
      error,
      end,
      currentTime,
      progress,
      updateTime,
      formatTime,
      onProgressChanged,
      onProgressChanging,
      // use-player
      playList,
      isFull,
      currentSong,
      playIcon,
      togglePlay,
      toggleFullScreen,
      next,
      prev,
      // use-mode
      changeMode,
      modeIcon,
      // use-favorite
      getFavoriteIcon,
      toggleFavorite,
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
    background: #222;
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
          color: $color-theme;
        }
      }
      .name {
        height: 40px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        padding: 0 52px;
        @include no-wrap;
      }
      .singers {
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #fff;
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
          color: #fff;
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
          &:nth-child(1),
          &:nth-child(2) {
            text-align: right;
          }
          &:nth-child(4),
          &:nth-child(5) {
            text-align: left;
          }
          &:nth-child(3) {
            text-align: center;
            padding: 0 20px;
            i {
              font-size: 40px;
            }
          }
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
