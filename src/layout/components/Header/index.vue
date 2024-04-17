<template>
  <header class="header" :class="{ 'fixed-header': isPageScroll }">
    <!-- 头部 导航 -->
    <div class="header-left">
      <div class="logo">OnTheRoad</div>
      <nav @click="toPath">
        <span
          v-for="item in navList"
          :key="item.path"
          :path="item.path"
          :class="{ 'nav-active': item.path === path }"
        >
          {{ item.name }}
        </span>
      </nav>
    </div>
    <div class="header-right">
      <div class="search">
        <el-input v-model.trim="searchKey" placeholder="搜索文章" />
      </div>
      <!-- <div class="avatar">头像</div> -->
    </div>
  </header>
</template>

<script lang="ts" setup name="Header">
import { reactive, computed, watch, ref } from "vue";
import { usePageScroll } from "@/hooks/usePageScroll";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();
const route = useRoute();
const { isPageScroll } = usePageScroll(); // 页面滚动

const navList = reactive([
  { name: "首页", path: "/home" },
  { name: "友链", path: "/blogroll" },
  { name: "留言", path: "/guestbook" },
  { name: "关于", path: "/about" }
]);

const path = computed(() => route.path);
const toPath = (e: any) => {
  e = e || window.event;
  const _path = e.target.getAttribute("path");
  if (!_path) return;
  router.push(_path);
};

let searchKey = ref("");
watch(searchKey, () => {});
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: $header-height;
  padding: 0 20px;
  transition: all 0.5s ease-in-out;
  &.fixed-header {
    background-color: hsl(0deg 0% 100% / 80%);
    backdrop-filter: saturate(5) blur(20px);
  }
  .header-left {
    display: flex;
    align-items: center;
    .logo {
      margin-right: 20px;
    }
    nav {
      span {
        padding: 2px 8px;
        border-radius: 3px;
        cursor: pointer;
        &.nav-active,
        &:hover {
          color: #409eff;
          box-shadow:
            inset 0 0 7px 0 rgb(0 0 0 / 10%),
            0 0 6px 0 rgb(0 0 0 / 10%);
        }
      }
    }
  }
}
</style>
