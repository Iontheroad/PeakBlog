<template>
  <header class="header">
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
      <!-- 头像 -->
      <div class="avatar">头像</div>
    </div>
  </header>
</template>

<script lang="ts" setup name="Header">
import { ref, reactive } from "vue";
// import { useRouter } from "vue-router";
// const router = useRouter();

const navList = reactive([
  { name: "首页", path: "/home" },
  { name: "文章", path: "/about" },
  { name: "留言板", path: "/doc" },
  { name: "关于我", path: "/login" }
]);

let path = ref("/home");
const toPath = (e: any) => {
  e = e || window.event;
  const _path = e.target.getAttribute("path");
  if (!_path) return;
  path.value = _path;
  // router.push(_path);
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  padding: 0 20px;
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
