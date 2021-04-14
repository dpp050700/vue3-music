<template>
  <music-header></music-header>
  <tabs />
  <router-view />
</template>

<script>
import MusicHeader from "@/components/header/header";
import Tabs from "@/components/tabs/tabs";
export default {
  components: {
    MusicHeader,
    Tabs,
  },
  data: function () {
    return {};
  },
};
</script>

<style></style>
