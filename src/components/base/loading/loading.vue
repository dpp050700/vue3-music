<template>
  <div class="loading" :class="wrapClass">
    <div class="loading-content" :style="loadingContent">
      <ul class="loading-line" v-if="!customIcon">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      title: "加载中...",
      image: "",
      customIcon: false,
      position: "", // top center bottom
      translateY: 10,
    };
  },
  methods: {
    setConfig(config) {
      for (let key in config) {
        this[key] = config[key];
      }
    },
  },
  computed: {
    wrapClass() {
      return {
        [`loading-${this.position}`]: true,
      };
    },
    loadingContent() {
      return {
        transform: `translateY(${this.translateY}px)`,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@keyframes dance {
  0% {
    transform: scaleY(0.4);
    transform-origin: center 100%;
  }
  20% {
    transform: scaleY(1);
  }
  100% {
    transform: scaleY(0.4);
    transform-origin: center 100%;
  }
}
.loading {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background: #fff;
  &.loading-top {
    align-items: flex-start;
  }
  &.loading-center {
    align-items: center;
  }
  &.loading-bottom {
    align-items: flex-end;
  }
  .loading-content {
    font-size: 12px;
    // transform: translateY(10px);
    .loading-line {
      height: 15px;
      width: 100%;
      margin-bottom: 8px;
      text-align: center;
      & > li {
        display: inline-block;
        background-color: $color-background-theme;
        height: 100%;
        width: 1px;
        margin-right: 2px;
        animation: dance 1s infinite;
      }
      & > li:nth-child(2) {
        animation-delay: -0.4s;
      }
      & > li:nth-child(3) {
        animation-delay: -0.6s;
      }
      & > li:nth-child(4) {
        animation-delay: -0.5s;
      }
      & > li:nth-child(5) {
        animation-delay: -0.2s;
      }
    }
  }
}
</style>
