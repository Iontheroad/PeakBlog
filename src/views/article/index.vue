<template>
  <Banner :banner-img="article?.article_cover">
    <template #bannerContent>
      <div class="banner-content">
        <h2 class="title">{{ article?.article_title }}</h2>
        <div class="article-info">
          <div class="time">
            <div>
              发布于
              <SvgIcon icon-name="release-time" />
              {{ article?.create_time }}
            </div>
            <div>
              更新于
              <SvgIcon icon-name="update-time" />
              {{ article?.update_time }}
            </div>
          </div>
          <div class="data">
            <div class="likes" @click.prevent="clickLikes(article!)">
              <SvgIcon v-if="article?.user_liked" on-name="like-filled" />
              <SvgIcon v-else icon-name="like-outlined" />
              {{ article?.likes_count }}
            </div>
            <div class="browse">
              <SvgIcon icon-name="browse" />{{ article?.browse || 0 }}
            </div>
            <div class="comment">
              <SvgIcon icon-name="comment" />{{ article?.comment || 0 }}
            </div>
            <div class="category-tags">
              <div class="category">
                <SvgIcon icon-name="category" />
                {{ article?.cate_id }}
              </div>
              <div class="tags">
                <SvgIcon icon-name="tags" />
                <span v-for="tag in article?.article_tagList" :key="tag.tag_id">
                  {{ tag.tag_name }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Banner>
  <div class="article-container">
    <div class="content">
      <MdPreview
        editor-id="article-details"
        :model-value="article?.article_content"
        @on-get-catalog="onGetCatalog"
      />
      <!-- <MdCatalog editor-id="article-details" :scroll-element="scrollElement" /> -->

      <CommentsSection />
    </div>

    <LayoutAside>
      <BoxUser />
      <ArticleCatalogue />
    </LayoutAside>
  </div>
</template>

<script setup lang="ts">
/*
评论和点赞单独建表
浏览量在文章表添加一个字段
*/
defineOptions({ name: "ArticleView" });
import Banner from "@/components/Banner/index.vue";
import LayoutAside from "@/layout/components/Aside/index.vue";
import ArticleCatalogue from "@/layout/components/Aside/ArticleCatalogue.vue";
import BoxUser from "@/layout/components/Aside/BoxUser.vue";
import CommentsSection from "./components/CommentsSection/index.vue";

import { onMounted, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";

import mittBus from "@/utils/mittBus";
import { reqSelectArticle, reqArticleLike, type Article } from "@/api/article";

// const scrollElement = document.documentElement;
const route = useRoute();
onMounted(() => {
  selectArticle();
});

const article_id = computed(() => Number(route.params.article_id));

let article = ref<Article.ArticleItem>();
/**
 * 获取文章
 */
async function selectArticle() {
  try {
    let result = await reqSelectArticle({ article_id: article_id.value });
    article.value = result.data;
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
// 获取文章目录
const onGetCatalog = (list: []) => {
  mittBus.emit("getCatalogue", { list, article: article.value });
  // console.log(obj);
};

/**
 * @description
 */
const clickLikes = async (article: Article.ArticleItem) => {
  try {
    let result = await reqArticleLike({
      article_id: article.article_id
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
</script>
<style lang="scss" scoped>
.banner-content {
  position: absolute;
  top: 50%;
  left: 50%;

  @include flex($direction: column, $justify: center, $align: center);

  row-gap: 10px;
  transform: translate(-50%, -50%);
  color: #ffffff;
  .title {
    text-align: center;
    font-size: 50px;
    font-weight: 700;
  }
  .article-info {
    @include flex($direction: column, $justify: center, $align: center);

    row-gap: 10px;

    // 发布时间、更新时间
    .time {
      @include flex($align: center);

      column-gap: 10px;
      > div {
        @include flex($align: center);
      }
    }
    .category-tags {
      @include flex($align: center);

      column-gap: 15px;
      .category,
      .tags {
        @include flex($align: center);

        gap: 4px 4px;
        font-size: 14px;
        > span {
          margin-right: 5px;
        }
      }
    }
    .data {
      @include flex($align: center);

      column-gap: 15px;
      > div {
        @include flex($align: center);

        column-gap: 2px;
        &.likes {
          cursor: pointer;
          &:hover .svg-icon {
            color: #1e80ff;
          }
        }
      }
    }
  }
}
.article-container {
  .content {
    width: 100%;
    padding: 20px;
    border-radius: 10px;
    background-color: #ffffff;
  }
}
</style>
