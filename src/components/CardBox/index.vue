<template>
  <div class="card-box">
    <div class="title">
      <slot name="title">
        <h5>{{ title }}</h5>
      </slot>
    </div>

    <slot></slot>

    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: "CardBox"
  // inheritAttrs: true
});
withDefaults(defineProps<{ title?: string }>(), {
  title: ""
});
</script>

<style lang="scss" scoped>
.card-box {
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 10%);
  .title {
    h5 {
      font-size: 16px;
    }
  }
}
</style>
