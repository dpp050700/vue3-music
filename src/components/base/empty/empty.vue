<template>
  <div class="empty" :style="emptyStyle">
    <div class="empty-content">
      <img v-if="showIcon && icon" :src="icon" />
      <p>{{ title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      showIcon: false,
      icon: "",
      title: "暂无数据",
      height: "",
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
    emptyStyle() {
      return {
        height: this.height ? `${this.height}px` : "100%",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.empty {
  position: relative;
  height: 100%;
  min-height: 100px;
  .empty-content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: $color-text-l;
    img {
      width: 80px;
      margin-bottom: 8px;
    }
    p {
      font-size: 12px;
    }
  }
}
</style>
