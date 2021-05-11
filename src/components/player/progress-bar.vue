<template>
  <div class="progress-bar">
    <div class="progress-inner">
      <div class="progress"></div>
      <div class="progress-btn-wrapper">
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    progress: Number,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.progress-bar {
  height: 30px;
  .progress-inner {
    height: 4px;
    position: relative;
    top: 13px;
    background: $color-theme-d;
    .progress {
      position: absolute;
      height: 100%;
      background: $color-theme;
      left: 0;
      top: 0;
    }
    .progress-btn-wrapper {
      position: absolute;
      left: -8px;
      top: -13px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: relative;
        top: 7px;
        left: 7px;
        box-sizing: border-box;
        width: 16px;
        height: 16px;
        border: 3px solid $color-text;
        border-radius: 50%;
        background: $color-theme;
      }
    }
  }
}
</style>
