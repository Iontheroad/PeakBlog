import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css"; // 进度条样式
// import { useUserStore } from "@/store/modules/user";

// 进度条配置
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: true, // 是否显示加载icon
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
});

const routes: RouteRecordRaw[] = [
  {
    path: "/home",
    redirect: "/"
  },
  {
    path: "/layout",
    name: "Layout",
    component: () => import("@/layout/index.vue"),
    redirect: "/",
    children: [
      {
        path: "/",
        name: "Home",
        alias: "/home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页"
        }
      },
      {
        path: "/article/:article_id",
        name: "Article",
        component: () => import("@/views/article/index.vue"),
        meta: {
          title: "文章"
        }
      },
      {
        path: "/blogroll",
        name: "Blogroll",
        component: () => import("@/views/blogroll/index.vue"),
        meta: {
          title: "友链"
        }
      },
      {
        path: "/guestbook",
        name: "Guestbook",
        component: () => import("@/views/guestbook/index.vue"),
        meta: {
          title: "留言"
        }
      },
      {
        path: "/about",
        name: "About",
        component: () => import("@/views/about/index.vue"),
        meta: {
          title: "关于"
        }
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue")
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// const ROUTE_WHITE_LIST = ["/", "/home", "/500"]; // 白名单

/**
 * @description 路由拦截，登录拦截
 */
router.beforeEach((to, from, next) => {
  // NProgress 开始
  NProgress.start();

  // 动态标题
  const title = import.meta.env.VITE_GLOB_APP_TITLE; // 路由标题
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

  next();
});
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

/**
 * @description 路由跳转错误
 * */
router.onError((error) => {
  NProgress.done();
  console.warn("路由错误", error.message);
});

/**
 * @description 全局后置守卫
 */
router.afterEach(() => {
  NProgress.done();
});

export default router;
