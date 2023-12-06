<template>
  <div class="home">
    <!-- 文章区域 -->
    <CategorySearch />
    <!-- 文章列表 -->
    <section>
      <a href="" v-for="item in articleList" :key="item.id"> {{ item.title }} </a>
    </section>
  </div>
</template>

<script lang="ts" setup name="Home">
import CategorySearch from "@/components/CategorySearch/index.vue";
import { ref } from "vue";
let articleList = ref([
  {
    id: 1,
    title: "文章1"
  },
  {
    id: 2,
    title: "文章2"
  },
  {
    id: 3,
    title: "文章3"
  }
]);
</script>

<style lang="scss" scoped>
.home {
  section {
    border-radius: 10px;
    background-color: #ffffff;
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>
