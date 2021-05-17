<template>
  <div class="singer">
    <div class="horizon-container">
      <div class="horizon-item">
        <label>分类:</label>
        <div class="horizon-content">
          <horizon-shortcut
            is-custom
            :list="cayegory"
            @change="changeCategory"
            v-model:currentIndex="categoryIndex"
          ></horizon-shortcut>
        </div>
      </div>
      <div class="horizon-item">
        <label>首字母:</label>
        <div class="horizon-content">
          <horizon-shortcut
            @change="changeInitial"
            v-model:currentIndex="initialIndex"
          ></horizon-shortcut>
        </div>
      </div>
    </div>
    <div class="singer-list" v-loading="loading">
      <scroll
        class="list-scroll"
        ref="scrollRef"
        :probe-type="3"
        @pull-up="pullUp"
      >
        <div v-loading:[bottomLoadingConfig]="!isLast && list.length">
          <singer-list :list="list" @click-item="clickItem"></singer-list>
          <div class="no-more-bottom" v-if="isLast">已经到底啦～</div>
        </div>
      </scroll>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import { ref } from "vue";
import HorizonShortcut from "@/components/base/horizon-shortcut/horizon-shortcut";
import { getSingerList } from "@/request/singers";
import Scroll from "@/components/scroll-wrap";
import SingerList from "../components/singer-list/singer-list.vue";
import usePagination from "@/hooks/use-pagination.js";
export default {
  name: "Singer",
  components: { HorizonShortcut, Scroll, SingerList },
  data() {
    return {
      cayegory: [
        {
          label: "全部",
          type: "-1",
          area: "-1",
        },
        {
          label: "华语男歌手",
          type: "1",
          area: "7",
        },
        {
          label: "华语女歌手",
          type: "2",
          area: "7",
        },
        {
          label: "华语组合",
          type: "3",
          area: "7",
        },
        {
          label: "欧美男歌手",
          type: "1",
          area: "96",
        },
        {
          label: "欧美女歌手",
          type: "2",
          area: "96",
        },
        {
          label: "欧美组合",
          type: "3",
          area: "96",
        },
        {
          label: "日本男歌手",
          type: "1",
          area: "8",
        },
        {
          label: "日本女歌手",
          type: "2",
          area: "8",
        },
        {
          label: "日本组合",
          type: "3",
          area: "8",
        },
        {
          label: "韩国男歌手",
          type: "1",
          area: "16",
        },
        {
          label: "韩国女歌手",
          type: "2",
          area: "16",
        },
        {
          label: "韩国组合",
          type: "3",
          area: "16",
        },
      ],
      categoryIndex: 0,
      initialIndex: 0,
      initial: -1,
      bottomLoadingConfig: {
        position: "bottom",
      },
      bottomLoading: true,
      loading: true,
    };
  },
  async created() {
    await this.initPage(this.params);
    this.loading = false;
  },
  computed: {
    params() {
      const currentCategory = this.cayegory[this.categoryIndex];
      return {
        type: currentCategory.type,
        area: currentCategory.area,
        initial: this.initial,
      };
    },
  },
  methods: {
    async changeCategory() {
      this.loading = true;
      await this.initPage(this.params);
      this.scrollTop();
      this.loading = false;
    },
    async changeInitial(index, item) {
      this.loading = true;
      this.initial = item.key;
      await this.initPage(this.params);
      this.scrollTop();
      this.loading = false;
    },
    scrollTop() {
      this.scrollRef.scroll.scrollTo(0, 0);
    },
    async pullUp() {
      await this.nextPage(this.params);
    },
    clickItem(item) {
      this.$router.push(`/singer/${item.id}`);
    },
  },
  setup(props) {
    const scrollRef = ref(null);

    const { initPage, nextPage, list, isLast } = usePagination(
      props,
      getSingerList,
      scrollRef
    );
    return {
      scrollRef,
      initPage,
      nextPage,
      list,
      isLast,
    };
  },
};
</script>
<style lang="scss" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 94px;
  bottom: 0;
  overflow: hidden;
  .horizon-container {
    padding: 5px;
    .horizon-item {
      display: flex;
      align-items: center;
      font-size: 12px;
      color: $color-text-l;
      & > label {
        margin-right: 5px;
      }
    }
    .horizon-content {
      flex: 1;
      overflow: hidden;
    }
  }

  .singer-list {
    position: fixed;
    top: 164px;
    left: 0;
    bottom: 0;
    width: 100%;
    .list-scroll {
      overflow: hidden;
      height: 100%;
    }
  }
  .no-more-bottom {
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    text-align: center;
    color: $color-text-l;
  }
}
</style>
