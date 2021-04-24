<template>
  <div class="top-item-list">
    <div class="top-item-list_cover">
      <img :src="cover" />
    </div>
    <div class="top-item-list_content">
      <ul class="top-item-list_content-info" v-if="type === 1">
        <li v-for="(item, index) in list" :key="index">
          <span>1</span>
          <span>{{ item.name }}</span>
        </li>
      </ul>
      <ul class="top-item-list_content-info" v-else>
        <li v-for="(item, index) in list" :key="index">
          <span>1</span>
          <span>{{ item.first }}</span>
          -
          <span>{{ item.second }}</span>
        </li>
      </ul>
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
    type: Number,
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
