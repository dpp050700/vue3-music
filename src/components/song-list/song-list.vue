<template>
  <div class="song-list-wrapper">
    <div class="song-list-header">
      <i class="music-icon-video-play-line" @click="playAll"></i>随机播放
    </div>
    <ul>
      <li
        class="song-list-item"
        v-for="(item, index) in list"
        :key="index"
        @click="selectItem(item, index)"
      >
        <span class="song-index">{{ index + 1 }}</span>
        <div class="song-detail">
          <p class="song-name">{{ item.name }}</p>
          <div class="song-singer">
            {{ item.singers + " " }} - {{ " " + item.album.name }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    isIndex: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["select", "play-all"],
  data() {
    return {};
  },
  methods: {
    selectItem(item, index) {
      this.$emit("select", { item, index });
    },
    playAll() {
      this.$emit("play-all");
    },
  },
};
</script>

<style lang="scss" scoped>
.song-list-wrapper {
  background: #fff;
  .song-list-header {
    height: 24px;
    font-size: 16px;
    font-weight: 600;
    padding: 8px 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e4e4e4;
    i {
      font-size: 18px;
      font-weight: 600;
      margin-right: 4px;
    }
  }
  ul {
    .song-list-item {
      display: flex;
      .song-index {
        min-width: 60px;
        max-width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
      }
      .song-detail {
        padding: 5px 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        border-bottom: 1px solid rgb(228, 228, 228);
        overflow: hidden;
        .song-name {
          height: 16px;
          font-size: 14px;
          color: $color-text-d;
          @include no-wrap;
        }
        .song-singer {
          font-size: 12px;
          color: $color-text-l;
          @include no-wrap;
        }
      }
      &:last-child {
        .song-detail {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
