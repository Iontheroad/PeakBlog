<template>
  <div class="banner">
    <div class="banner-img">
      <img :src="bannerImg" alt="" />
    </div>
    <slot name="bannerContent"></slot>
  </div>
</template>

<script lang="ts" setup name="Banner">
// import { ref } from "vue";

defineProps({
  bannerImg: {
    type: String,
    default: () =>
      "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
  }
});
</script>

<style lang="scss" scoped>
.banner {
  position: relative;
  width: 100%;
  height: 55vh;
  .banner-img {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: brightness(0.75);
    }
  }
}
</style>
