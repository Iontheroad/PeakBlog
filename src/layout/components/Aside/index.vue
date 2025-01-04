<script lang="ts" setup name="LayoutAside">
import useFixed from '@/hooks/useFixed';

import { ref } from 'vue';

const asideRef = ref(null);

const { isFixed } = useFixed(asideRef, 80);
</script>

<template>
  <!-- aside: 用于撑起侧边栏,当box fixed时用于占位 -->
  <aside ref="asideRef">
    <!-- box: 用来fixed侧边栏 -->
    <div class="box fixed-aside1" :class="{ 'fixed-aside': isFixed }">
      <slot></slot>
    </div>
  </aside>
</template>

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
      // position: sticky;
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
