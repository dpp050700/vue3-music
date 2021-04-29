<template>
  <div class="singer">
    <div class="horizon-container">
      <div class="horizon-item">
        <label>分类:</label>
        <div class="horizon-content">
          <horizon-shortcut
            is-custom
            :list="cayegory"
            @change="refeshSinger"
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
    <div class="singer-list">
      <scroll class="list-scroll" ref="scrollRef">
        <singer-list :list="singerList"></singer-list>
      </scroll>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import HorizonShortcut from "@/components/base/horizon-shortcut/horizon-shortcut";
import { getSingerList } from "@/request/singers";
import Scroll from "@/components/base/scroll/scroll.vue";
import SingerList from "../components/singer-list/singer-list.vue";
export default {
  name: "Singer",
  components: { HorizonShortcut, Scroll, SingerList },
  data() {
    return {
      singerList: [],
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
    };
  },
  async created() {
    this.getList();
  },
  methods: {
    refeshSinger() {
      this.getList();
      this.scrollTop();
    },
    changeInitial(index, item) {
      if (index === -1) {
        this.initial = -1;
      } else {
        this.initial = item.label;
      }
      this.getList();
      this.scrollTop();
    },
    scrollTop() {
      this.scrollRef.scroll.scrollTo(0, 0);
    },
    async getList() {
      const currentCategory = this.cayegory[this.categoryIndex];
      this.singerList = await getSingerList({
        type: currentCategory.type,
        area: currentCategory.area,
        initial: this.initial,
      });
    },
  },
  setup() {
    const scrollRef = ref(null);
    return {
      scrollRef,
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
}
</style>
