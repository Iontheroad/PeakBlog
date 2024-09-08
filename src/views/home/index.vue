<template>
  <Banner />
  <div class="home-container">
    <article class="content">
      <!-- 标签筛选 -->
      <TagsList :tag-list="tagList" @change-tag="changeTag" />
      <!-- 文章列表 -->
      <CardBox style="margin-top: 20px">
        <div class="article-list">
          <ArticleItem
            v-for="item in articleList"
            :key="item.article_id"
            :article="item"
          />

          <el-empty v-show="!total" description="暂无文章" :image-size="200" />

          <Pagination
            v-show="total"
            :total="total"
            layout="total, prev, pager, next, jumper"
            v-model:current-page="queryParams.currentPage"
            v-model:page-size="queryParams.pageSize"
            @change="selectArticleList"
          />
        </div>
      </CardBox>
    </article>
    <!-- 侧边栏 -->
    <LayoutAside>
      <BoxUser />
      <CategoryList
        v-model:cateId="queryParams.cate_id"
        @change-category="selectArticleList"
      />
    </LayoutAside>
  </div>
</template>

<script lang="ts" setup name="Home">
import { ref, onMounted } from "vue";
import { reqSelectArticleList, type Article } from "@/api/article.ts";
import { reqSelectTags } from "@/api/tags.ts";

import Banner from "@/components/Banner/index.vue";
import LayoutAside from "@/layout/components/Aside/index.vue";
import BoxUser from "@/layout/components/Aside/BoxUser.vue";
import Pagination from "@/components/Pagination/index.vue";
import ArticleItem from "./ArticleItem.vue";
import TagsList from "./TagsList.vue";
import CategoryList from "./CategoryList.vue";
import mittBus from "@/utils/mittBus";

let total = ref(0);
let queryParams = ref<Article.ReqSelectArticleList>({
  currentPage: 1,
  pageSize: 10,
  tag_ids: "", // 不传 或者 空字符串就是 获取全部标签
  cate_id: undefined,
  status: 2, // 1: 未通过 2: 通过 3: 待审核  用户端只能获取通过的
  searchKey: ""
});
mittBus.on("searchArticle", (value: string) => {
  queryParams.value.searchKey = value;
  selectArticleList();
});

onMounted(() => {
  selectTags();
  selectArticleList();
});

let articleList = ref();
// 获取文章列表
async function selectArticleList() {
  try {
    let result = await reqSelectArticleList({ ...queryParams.value });
    articleList.value = result.data;
    total.value = result.total;
  } catch (error) {
    console.log(error);
  }
}

// 获取文章标签
const tagList = ref([]);
async function selectTags() {
  try {
    let result = await reqSelectTags();
    tagList.value = result.data;
  } catch (error) {
    console.log(error);
  }
}

/**
 * @description 文章标签
 * @param tagIds - 标签id集合
 */
const changeTag = (tagIds: number[]) => {
  queryParams.value.tag_ids = tagIds.join(",");
  selectArticleList();
};
</script>

<style lang="scss" scoped>
.home-container {
  .content {
    width: 100%;
    .article-list {
      display: flex;
      flex-direction: column;
      align-items: center;
      row-gap: 20px;
      transform-style: preserve-3d;
      perspective: 1000px;
    }

    @media screen and (width <= 768px) {
      width: 95%;
      margin: 0 auto;
      .article-list {
        padding: 0;
        margin-top: 20px;
        background-color: transparent;
      }
    }
  }
  :deep(.search) {
    @include flex(row, flex-start, center);
    > span {
      flex: 1;
    }
    .el-input {
      flex: 3;
    }
    .el-input__wrapper,
    input {
      border: 0 !important;

      // box-shadow: 0 0 0 0 rgb(0 0 0 / 10%) !important;
      background-color: transparent !important;
    }
  }
}
</style>
