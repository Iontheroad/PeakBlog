<template>
  <aside>
    <!-- TODO: 侧边栏滚动一定位置固定定位 -->
    <!-- 侧边栏 -->
    <BoxUser v-if="path.startsWith('/home')" />
    <ArticleCatalogue v-if="path.startsWith('/article')" />
  </aside>
</template>

<script lang="ts" setup name="LayoutAside">
import { computed } from "vue";
import { useRoute } from "vue-router";
import BoxUser from "./BoxUser.vue";
import ArticleCatalogue from "./ArticleCatalogue.vue";

const route = useRoute();
const path = computed(() => route.path);
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
