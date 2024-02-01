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
    path: "/",
    redirect: "/home"
  },
  {
    path: "/layout",
    name: "Layout",
    component: () => import("@/layout/index.vue"),
    redirect: "/",
    children: [
      {
        path: "/home",
        name: "Home",
        alias: "/home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          title: "首页"
        }
      },
      {
        path: "/article/details",
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
// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore();

//   // 1.NProgress 开始
//   NProgress.start();

//   // 2.动态标题
//   const title = import.meta.env.VITE_GLOB_APP_TITLE; // 路由标题
//   document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

//   // 3.是否访问的登录页
//   if (to.path.toLocaleLowerCase().startsWith("/login")) {
//     // 有Token就在当前页
//     if (userStore.access_token) return next(from.fullPath);
//     // 没有token重定向到登录页,
//     // 清空路由
//     return next();
//   }

//   // 4.判断访问页面是否在路由白名单地址(静态路由)中，如果存在直接放行
//   if (ROUTE_WHITE_LIST.includes(to.path)) return next();

//   // 5.判断是否有Token , 没有重定向到登录页
//   if (!userStore.access_token) return next({ path: "/login", replace: true });

//   // 6.正常访问页面
//   next();
// });
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
