<template>
  <!-- aside: 用于撑起侧边栏,当box fixed时用于占位 -->
  <aside>
    <!-- box: 用来fixed侧边栏 -->
    <div class="box" :class="{ 'fixed-aside': isFixed }">
      <slot :scroll-top="scrollTop"></slot>
    </div>
  </aside>
</template>

<script lang="ts" setup name="LayoutAside">
import { computed } from "vue";
import { usePageScroll } from "@/hooks/usePageScroll";
const { scrollTop } = usePageScroll();
const isFixed = computed(() => scrollTop.value > 467);
</script>

<style lang="scss" scoped>
aside {
  flex-shrink: 0;
  width: 300px;
  margin-left: 20px;
  .box {
    display: flex;
    flex-direction: column;
    row-gap: 20px;
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
