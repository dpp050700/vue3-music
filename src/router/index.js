import { createRouter, createWebHashHistory } from "vue-router";
const Recommend = () =>
  import(/* webpackChunkName: "recommend" */ "@/views/recommend.vue");
const RecommendDetail = () =>
  import(/* webpackChunkName: "recommend" */ "@/views/album-detail.vue");
const Singer = () =>
  import(/* webpackChunkName: "singer" */ "@/views/singer.vue");
const SingerDetail = () =>
  import(/* webpackChunkName: "singer" */ "@/views/singer-detail.vue");
const Rank = () =>
  import(/* webpackChunkName: "hot-list" */ "@/views/rank.vue");
const RankDetail = () =>
  import(/* webpackChunkName: "recommend" */ "@/views/album-detail.vue");
const SingerIndexList = () =>
  import(/* webpackChunkName: "hot-list" */ "@/views/singer-index-list.vue");
const routes = [
  {
    path: "/",
    redirect: "/recommend",
  },
  {
    path: "/recommend",
    name: "Recommend",
    component: Recommend,
    children: [
      {
        path: ":id",
        name: "RecommendDetail",
        component: RecommendDetail,
      },
    ],
  },
  {
    path: "/singer",
    name: "Singer",
    component: Singer,
    children: [
      {
        path: ":id",
        name: "SingerDetail",
        component: SingerDetail,
      },
    ],
  },

  {
    path: "/rank",
    name: "Rank",
    component: Rank,
    children: [
      {
        path: ":id",
        name: "RankDetail",
        component: RankDetail,
      },
      {
        path: "singer-index-list",
        name: "SingerIndexList",
        component: SingerIndexList,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
