<template>
  <div class="home">
    <!-- TODO: 首页兼容移动端 -->
    <!-- 文章区域 -->
    <!-- TODO: 文章筛选优化 -->
    <CategorySearch />
    <!-- 文章列表 -->
    <section class="article-list">
      <ArticleItem
        v-for="item in articleList"
        :key="item.article_id"
        :article="item"
        :category-list="categoryList"
      />
      <!-- TODO: 封装分页 -->
      <section class="pagination">
        <el-pagination
          :page-size="queryParams.pageSize"
          v-model:current-page="queryParams.currentPage"
          :pager-count="11"
          layout="prev, pager, next"
          :total="total"
        />
      </section>
    </section>
  </div>
</template>

<script lang="ts" setup name="Home">
import { reqSelectArticleList, type Article } from "@/api/article.ts";
import { reqSelectCategory } from "@/api/category";
import CategorySearch from "./CategorySearch.vue";
import ArticleItem from "./ArticleItem.vue";
import { ref, onMounted } from "vue";

let total = ref(0);
let queryParams = ref<Article.ReqSelectArticleList>({
  currentPage: 1,
  pageSize: 10,
  status: 2
});

onMounted(() => {
  selectCategoryList();
  selectArticleList();
});

let articleList = ref();
// 获取文章列表
async function selectArticleList() {
  try {
    let result = await reqSelectArticleList({ ...queryParams.value });
    // console.log(result);
    articleList.value = result.data;
  } catch (error) {
    console.log(error);
  }
}

// 获取文章分类
const categoryList = ref([]);
async function selectCategoryList() {
  try {
    let result = await reqSelectCategory();
    categoryList.value = result.data;
  } catch (error) {
    console.log(error);
  }
}
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
    transform-style: preserve-3d;
    perspective: 1000px;
  }
}
</style>
