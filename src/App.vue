<template>
  <music-header></music-header>
  <tabs />
  <router-view />
  <player />
</template>

<script>
import MusicHeader from "@/components/header/header";
import Tabs from "@/components/tabs/tabs";
import Player from "./components/player/player.vue";

export default {
  components: {
    MusicHeader,
    Tabs,
    Player,
  },
  data: function () {
    return {};
  },
};
</script>

<style></style>
