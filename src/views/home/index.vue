<template>
  <div class="home">
    <!-- TODO: 首页兼容移动端 -->
    <!-- 文章区域 -->
    <CategorySearch :category-list="categoryList" @change-category="changeCategory" />
    <!-- 文章列表 -->
    <section class="article-list">
      <ArticleItem v-for="item in articleList" :key="item.article_id" :article="item" />
      <section class="pagination">
        <Pagination
          :total="total"
          v-model:current-page="queryParams.currentPage"
          v-model:page-size="queryParams.pageSize"
          @change="selectArticleList"
        />
      </section>
    </section>
  </div>
</template>

<script lang="ts" setup name="Home">
import { ref, onMounted } from "vue";
import { reqSelectArticleList, type Article } from "@/api/article.ts";
import { reqSelectCategory } from "@/api/category";
import CategorySearch from "./CategorySearch.vue";
import ArticleItem from "./ArticleItem.vue";
import Pagination from "@/components/Pagination/index.vue";

let total = ref(0);
let queryParams = ref<Article.ReqSelectArticleList>({
  currentPage: 1,
  pageSize: 10,
  category_ids: "", // 不传 或者 空字符串就是 获取全部分类
  status: 2, // 1: 未通过 2: 通过 3: 待审核  用户端只能获取通过的
  searchKey: ""
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

/**
 * @description 文章分类 和 搜索框变动触发
 * @param categoryIds
 * @param searchKey
 */
const changeCategory = (categoryIds: (string | number)[], searchKey: string) => {
  queryParams.value.searchKey = searchKey;
  queryParams.value.category_ids = categoryIds.join(",");
  selectArticleList();
};
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
