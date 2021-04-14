<template>
  <div class="countTag-wrap">
    <i :class="iconClass" v-if="icon"></i>
    <span>{{ count }}</span>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    count: {
      type: Number,
      default: 0,
    },
    icon: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  computed: {
    iconClass() {
      return `music-icon-${this.icon}`;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.countTag-wrap {
  display: flex;
  align-items: center;
  padding: 2px 4px;
  border-radius: 2px;
  & > i {
    margin-right: 4px;
  }
}
</style>
