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
      <img class="loading-image" v-else :src="image" />
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
      translateY: 0,
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
      let translateY = this.position === "bottom" ? 0 : this.translateY;
      return {
        transform: `translateY(${translateY}px)`,
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
  &:not(.loading-bottom) {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background: #fff;
    .loading-content {
      .loading-line {
        margin-bottom: 8px;
      }
      .loading-image {
        margin: auto;
        display: block;
        margin-bottom: 8px;
        width: 14px;
      }
    }
  }
  &.loading-top {
    align-items: flex-start;
  }
  &.loading-center {
    align-items: center;
  }
  &.loading-bottom {
    .loading-content {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
      .loading-line {
        margin-right: 6px;
      }
      .loading-image {
        margin-bottom: 0;
        margin-right: 6px;
        display: block;
        width: 14px;
      }
    }
  }
  .loading-content {
    font-size: 12px;
    .loading-line {
      height: 15px;
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
