<template>
  <ul class="singer-list-wrapper">
    <li
      class="singer-list-item"
      v-for="(item, index) in list"
      :key="index"
      @click="clickItem(item)"
    >
      <img v-lazy="item.picUrl" />
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
  methods: {
    clickItem(item) {
      this.$emit("click-item", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.singer-list-wrapper {
  .singer-list-item {
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
