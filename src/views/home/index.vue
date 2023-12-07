<template>
  <div class="home">
    <!-- 文章区域 -->
    <CategorySearch />
    <!-- 文章列表 -->
    <section class="article-list">
      <ArticleItem v-for="item in articleList" :key="item.id" :article="item" />
      <section class="pagination">
        <el-pagination
          :page-size="20"
          :pager-count="11"
          layout="prev, pager, next"
          :total="1000"
        />
      </section>
    </section>
  </div>
</template>

<script lang="ts" setup name="Home">
import CategorySearch from "./CategorySearch.vue";
import ArticleItem from "./ArticleItem.vue";
import { ref } from "vue";
let articleList = ref([
  {
    id: 1,
    title: "TypeScript的基本使用",
    img: "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg", // 文章封面链接
    author: "peak", // 作者
    avatar: "http://iontheroad.gitee.io/peak-vue3-admin/assets/avatar-4e395231.jpg",
    release_date: "2023-01-01 12:00:00", // 发布时间
    update_date: "2023-01-01 12:02:12", // 更新时间
    likes: 0, // 点赞次数
    browse: 0, // 浏览次数
    comment: "5", // 留言
    category: [
      "前端",
      "Vue",
      "TypeScript",
      "JavaScript",
      "ES6",
      "NodeJS",
      "MySQL",
      "Git",
      "Express",
      "NestJS",
      "Nginx",
      "Docker",
      "Linux",
      "Vite",
      "Webpack",
      "React",
      "NextJS",
      "NuxtJS"
    ] // 分类
  },
  {
    id: 2,
    title: "TypeScript的基本使用",
    img: "https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg", // 文章封面链接
    author: "peak", // 作者
    avatar: "http://iontheroad.gitee.io/peak-vue3-admin/assets/avatar-4e395231.jpg",
    release_date: "2023-01-01 12:00:00", // 发布时间
    update_date: "2023-01-01 12:02:12", // 更新时间
    likes: 0, // 点赞次数
    browse: 0, // 浏览次数
    comment: "5", // 留言
    category: ["前端", "Vue"] // 分类
  },
  {
    id: 3,
    title: "TypeScript的基本使用",
    img: "https://seopic.699pic.com/photo/60003/6614.jpg_wh1200.jpg", // 文章封面链接
    author: "peak", // 作者
    avatar: "http://iontheroad.gitee.io/peak-vue3-admin/assets/avatar-4e395231.jpg",
    release_date: "2023-01-01 12:00:00", // 发布时间
    update_date: "2023-01-01 12:02:12", // 更新时间
    likes: 0, // 点赞次数
    browse: 0, // 浏览次数

    comment: "5", // 留言
    category: ["前端", "Vue"] // 分类
  }
]);
</script>

<style lang="scss" scoped>
.home {
  .article-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    background-color: #ffffff;
    margin-top: 10px;
    row-gap: 20px;
    padding: 20px;
  }
}
</style>
