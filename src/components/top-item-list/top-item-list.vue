<template>
  <div class="top-item-list">
    <div class="top-item-list_cover">
      <img :src="cover" />
    </div>
    <div class="top-item-list_content">
      <ul class="top-item-list_content-info" v-if="type === 1">
        <li v-for="(item, index) in list" :key="index">
          <span>{{ index + 1 }}. </span>
          <span>{{ item.name }}</span>
        </li>
      </ul>
      <ul class="top-item-list_content-info" v-else>
        <li v-for="(item, index) in list" :key="index">
          <span>{{ index + 1 }}. </span>
          <span>{{ item.first }}</span>
          -
          <span>{{ item.second }}</span>
        </li>
      </ul>
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
    type: Number, // 1 歌手榜
  },
  components: {},
};
</script>
<style lang="scss" scoped>
.top-item-list {
  display: flex;
  padding: 5px 0;
  border-bottom: 1px solid rgb(228, 228, 228);
  .top-item-list_cover {
    width: 100px;
    height: 100px;
    img {
      display: block;
      width: 100%;
    }
  }
  .top-item-list_content {
    flex: 1;
    padding: 10px;
  }
  .top-item-list_content-info {
    height: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    font-size: 12px;
    color: $color-text-l;
    line-height: 1.2;
    // height: 130px;
  }
}
</style>
