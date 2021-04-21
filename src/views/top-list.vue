<template>
  <div class="topList">
    <singer-top-list></singer-top-list>
  </div>
</template>

<script>
import SingerTopList from "@/components/singer-top-list/singer-top-list.vue";
export default {
  name: "TopList",
  components: {
    SingerTopList,
  },
};
</script>
