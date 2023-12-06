<template>
  <div class="main">
    <!-- 视图区域 -->
    <article>
      <router-view></router-view>
    </article>
    <aside>
      <!-- 侧边栏 -->
      侧边栏
    </aside>
  </div>
</template>

<script lang="ts" setup name="Main"></script>

<style lang="scss" scoped>
.main {
  display: flex;
  max-width: 1400px;
  width: 100%;
  height: 100vh;
  margin: 20px auto;
}

// @media screen and (width >=1400px) {
//   .main {
//     max-width: 1400px;
//   }
// }
aside {
  width: 300px;
  margin-left: 20px;
  background-color: #ffffff;
}
</style>
