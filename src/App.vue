<template>
  <music-header></music-header>
  <tabs />
  <router-view :style="viewStyle" v-slot="{ Component }">
    <component :is="Component" />
  </router-view>
  <player />
</template>

<script>
import MusicHeader from "@/components/header/header";
import Tabs from "@/components/tabs/tabs";
import Player from "./components/player/player.vue";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  components: {
    MusicHeader,
    Tabs,
    Player,
  },
  data: function () {
    return {};
  },
  setup() {
    const store = useStore();
    const playList = computed(() => {
      return store.getters["player/playList"];
    });
    const viewStyle = computed(() => {
      const bottom = playList.value.length ? "60px" : "0";
      return {
        bottom,
      };
    });
    return {
      playList,
      viewStyle,
    };
  },
};
</script>

<style></style>
