<template>
  <div class="progress-bar">
    <div class="progress-inner">
      <div class="progress" ref="progress" :style="progressStyle"></div>
      <div
        class="progress-btn-wrapper"
        :style="progressBtnStyle"
        @touchstart.prevent="onTouchStart"
        @touchmove.prevent="onTouchMove"
        @touchend.prevent="onTouchEnd"
      >
        <div class="progress-btn"></div>
      </div>
    </div>
  </div>
</template>

<script>
const progressBtnWidth = 16;
export default {
  name: "",
  props: {
    progress: Number,
  },
  emits: ["progress-changing", "progress-changed"],
  data() {
    return {
      offset: 0,
    };
  },
  created() {
    this.touch = {};
  },
  computed: {
    progressStyle() {
      return {
        width: `${this.offset}px`,
      };
    },
    progressBtnStyle() {
      return { transform: `translateX(${this.offset}px` };
    },
  },
  watch: {
    progress(val) {
      this.setOffset(val);
    },
  },
  methods: {
    onTouchStart(e) {
      this.touch.x1 = e.touches[0].pageX;
      this.touch.progressBeginWidth = this.$refs.progress.clientWidth;
    },
    onTouchMove(e) {
      console.log(e);
      const delta = e.touches[0].pageX - this.touch.x1;
      const progressWidth = this.touch.progressBeginWidth + delta;
      const progressBarWidth = this.$el.clientWidth - progressBtnWidth;
      const progress = Math.min(
        1,
        Math.max(progressWidth / progressBarWidth, 0)
      );
      this.offset = progressBarWidth * progress;
      this.$emit("progress-changing", progress);
    },
    onTouchEnd() {
      const progressBarWidth = this.$el.clientWidth - progressBtnWidth;
      const progress = this.$refs.progress.clientWidth / progressBarWidth;
      this.$emit("progress-changed", progress);
    },
    setOffset(progress) {
      const progressBarWidth = this.$el.clientWidth - progressBtnWidth;
      this.offset = progressBarWidth * progress;
    },
  },
};
</script>

<style lang="scss" scoped>
.progress-bar {
  height: 30px;
  .progress-inner {
    height: 4px;
    position: relative;
    top: 13px;
    background: rgba(0, 0, 0, 0.3);
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
