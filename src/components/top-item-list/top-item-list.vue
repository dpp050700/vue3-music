<template>
  <div class="top-item-list">
    <div class="top-item-list_cover">
      <img :src="cover" />
    </div>
    <div class="top-item-list_content">
      <div class="top-item-list_content-info">
        <span>1</span>
        <span>name</span>
        <span>singer</span>
      </div>
      <div>查看全部</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopItem",
  props: {
    cover: String,
    list: {
      type: Array,
      default: () => [],
    },
  },
  components: {},
};
</script>
<style lang="scss" scoped>
.top-item-list {
  display: flex;
  .top-item-list_cover {
    width: 150px;
    height: 150px;
    img {
      display: block;
      width: 100%;
    }
  }
}
</style>
