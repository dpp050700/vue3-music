<template>
  <ul class="song-list-wrapper">
    <li class="song-list-item" v-for="(item, index) in list" :key="index">
      <p>{{ item.name }}</p>
      <p>{{ item.name }}</p>
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
    align-items: center;
    padding-top: 20px;
    padding-left: 30px;
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
