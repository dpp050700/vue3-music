<template>
  <ul class="singer-list-wrapper">
    <li class="singer-list-item" v-for="(item, index) in list" :key="index">
      <img :src="item.picUrl" />
      {{ item.name }}
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
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.singer-list-wrapper {
  .singer-list-item {
    display: flex;
    align-items: center;
    img {
      width: 42px;
      height: 42px;
      display: block;
      border-radius: 50%;
    }
  }
}
</style>
