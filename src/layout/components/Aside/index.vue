<template>
  <aside>
    <!-- 侧边栏 -->
    <BoxUser />
  </aside>
</template>

<script lang="ts" setup name="">
import BoxUser from "./BoxUser.vue";
</script>

<style lang="scss" scoped>
aside {
  flex-grow: 0;
  width: 300px;
  margin-left: 20px;
}

@media screen and (width <=1000px) {
  aside {
    display: none;
  }
}
</style>
