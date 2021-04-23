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
      <div class="top-item-list_content-more">查看全部</div>
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
    id: String,
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
  .top-item-list_content {
    flex: 1;
  }
  .top-item-list_content-info {
    height: 130px;
  }
  .top-item-list_content-more {
    height: 20px;
    line-height: 20px;
  }
}
</style>
