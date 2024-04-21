<template>
  <main class="main">
    <!-- TODO: 跳转动画 -->
    <router-view></router-view>
  </main>
</template>

<script lang="ts" setup name="Main"></script>

<style lang="scss">
.main {
  padding-bottom: 50px;
  > div[class$="container"] {
    display: flex;
    max-width: 1400px;
    margin: 20px auto 0;
  }
}

// @media screen and (width >=1400px) {
//   .main {
//     max-width: 1400px;
//   }
// }
</style>
