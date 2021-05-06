<template>
  <div class="tabsWrap">
    <router-link
      class="tab-item"
      v-for="item in tabs"
      :key="item.path"
      :to="item.path"
    >
      <span class="tab-name">
        {{ item.name }}
      </span>
    </router-link>
  </div>
</template>

<script>
const tabs = [
  {
    name: "推荐",
    path: "/recommend",
  },
  {
    name: "歌手",
    path: "/singer",
  },
  {
    name: "榜单",
    path: "/rank",
  },
];
export default {
  name: "",
  data() {
    return {
      tabs,
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.tabsWrap {
  display: flex;
  height: 44px;
  line-height: 44px;
  font-size: $font-size-medium;
  background: $color-background-theme;
  .tab-item {
    flex: 1;
    text-align: center;

    .tab-name {
      padding-bottom: 5px;
      color: $color-text;
    }

    &.router-link-active {
      .tab-name {
        // color: $color-theme;
        border-bottom: 2px solid $color-text;
      }
    }
  }
}
</style>
