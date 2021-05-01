import { createRouter, createWebHashHistory } from "vue-router";
const Recommend = () =>
  import(/* webpackChunkName: "recommend" */ "@/views/recommend.vue");
const Singer = () =>
  import(/* webpackChunkName: "singer" */ "@/views/singer.vue");
const SingerDetail = () =>
  import(/* webpackChunkName: "singer" */ "@/views/singer-detail.vue");
const TopList = () =>
  import(/* webpackChunkName: "hot-list" */ "@/views/top-list.vue");
const SingerTopList = () =>
  import(/* webpackChunkName: "hot-list" */ "@/views/singer-top-list.vue");
const routes = [
  {
    path: "/",
    redirect: "/recommend",
  },
  {
    path: "/recommend",
    name: "Recommend",
    component: Recommend,
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
    path: "/top-list",
    name: "TopList",
    component: TopList,
  },
  {
    path: "/singer-top-list",
    name: "SingerTopList",
    component: SingerTopList,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
