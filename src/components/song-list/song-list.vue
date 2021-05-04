<template>
  <ul class="song-list-wrapper">
    <li class="song-list-item" v-for="item in list" :key="item.indexNumber">
      <span class="song-index">{{ item.indexNumber }}</span>
      <div class="song-detail">
        <p class="song-name">{{ item.name }}</p>
        <div class="song-singer">
          {{ item.singers + " " }} - {{ " " + item.album }}
        </div>
      </div>
    </li>
  </ul>
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
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.song-list-wrapper {
  background: #fff;
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
        display: flex;
        .singer-album {
          flex: 1;
          @include no-wrap;
        }
      }
    }
    img {
      width: 42px;
      height: 42px;
      display: block;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
}
</style>
