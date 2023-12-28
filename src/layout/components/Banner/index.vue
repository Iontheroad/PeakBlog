<template>
  <div class="banner">
    <!-- TODO: banner图动态调整 -->
    <div class="banner-img">
      <img
        src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
        alt=""
      />
    </div>
  </div>
</template>

<script lang="ts" setup name="Banner">
// import { ref } from "vue";
// const bannerList = ref([
//   {
//     title: "banner1",
//     url: "https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
//   },
//   {
//     title: "banner2",
//     url: "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg"
//   },
//   {
//     title: "banner3",
//     url: "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg"
//   }
// ]);
</script>

<style lang="scss" scoped>
.banner {
  width: 100%;
  height: 55vh;
  .banner-img {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover; /* 使用 object-fit 控制元素在给定尺寸下的布局方式 */
      filter: brightness(0.75);
    }
  }
}
</style>
