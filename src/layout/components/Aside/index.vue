<template>
  <!-- TODO: 侧边栏后期移入每个页面中 ,不在放入全局-->
  <!-- 侧边栏 -->
  <!-- aside: 用于撑起侧边栏,当box fixed时用于占位 -->
  <aside>
    <!-- box: 用来fixed侧边栏 -->
    <div class="box" :class="{ 'fixed-aside': isFixed }">
      <BoxUser v-if="path.startsWith('/home')" />
      <ArticleCatalogue v-if="path.startsWith('/article')" />
      <div class="blogroll" v-if="path.startsWith('/blogroll')">
        <button>添加</button>
      </div>
    </div>
  </aside>
</template>

<script lang="ts" setup name="LayoutAside">
import { computed } from "vue";
import { useRoute } from "vue-router";
import BoxUser from "./BoxUser.vue";
import ArticleCatalogue from "./ArticleCatalogue.vue";
import { usePageScroll } from "@/hooks/usePageScroll";

const route = useRoute();
const path = computed(() => route.path);
const { scrollTop } = usePageScroll();
const isFixed = computed(() => scrollTop.value > 467);
</script>

<style lang="scss" scoped>
aside {
  flex-grow: 0;
  width: 300px;
  margin-left: 20px;
  .box {
    width: inherit;
    &.fixed-aside {
      position: fixed;
      top: 80px;
    }
  }
}

@media screen and (width <=1000px) {
  aside {
    display: none;
  }
}
</style>
