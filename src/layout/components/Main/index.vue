<template>
  <main class="main">
    <!-- 视图区域 -->
    <article>
      <router-view></router-view>
    </article>
    <!-- 侧边栏 -->
    <Aside />
  </main>
</template>

<script lang="ts" setup name="Main">
import Aside from "@/layout/components/Aside/index.vue";
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  max-width: 1400px;
  margin: 20px auto 0;
  padding-bottom: 50px;
  article {
    flex: 1;
  }
}

// @media screen and (width >=1400px) {
//   .main {
//     max-width: 1400px;
//   }
// }
</style>
