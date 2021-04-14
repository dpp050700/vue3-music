<template>
  <div class="headerWrap">
    <i class="music-icon-more"></i>
    <h1 class="title">音乐会</h1>
    <i class="music-icon-search"></i>
  </div>
</template>

<script>
export default {
  name: "MusicHeader",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.headerWrap {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background: $color-background-theme;
  color: $color-text;
  box-sizing: border-box;
  .title {
    flex: 1;
    text-align: center;
    font-size: 18px;
  }
  i {
    font-size: 20px;
  }
}
</style>
