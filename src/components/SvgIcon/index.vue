<template>
  <div class="svg-icon-box">
    <svg class="svg-icon" :style="iconStyle" aria-hidden="true">
      <use :xlink:href="symbolId" />
    </svg>
    <i>
      <slot></slot>
    </i>
  </div>
</template>

<script setup lang="ts" name="SvgIcon">
import { computed, CSSProperties } from "vue";

interface SvgProps {
  iconName: string; // 图标的名称 ==> 必传
  prefix?: string; // 图标的前缀 ==> 非必传（默认为"icon"）
  iconStyle?: CSSProperties; // 图标的样式 ==> 非必传
  color?: string; // 图标的颜色 ==> 非必传
}

const props = withDefaults(defineProps<SvgProps>(), {
  prefix: "icon",
  color: "",
  iconStyle: () => ({})
});

const symbolId = computed(() => `#${props.prefix}-${props.iconName}`);
</script>
<style lang="scss" scoped>
.svg-icon-box {
  @include flex($align: center);

  column-gap: 4px;
  .svg-icon {
    width: 1.2em;
    height: 1.2em;
    fill: currentColor;
  }
  i {
    font-style: normal;
  }
}
</style>
