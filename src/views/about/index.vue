<script lang="ts" setup name="About">
import Banner from "@/components/Banner/index.vue";
import LayoutAside from "@/layout/components/Aside/index.vue";
import BoxUser from "@/layout/components/Aside/BoxUser.vue";
import CardBox from "@/components/CardBox/index.vue";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import { onMounted, computed, ref } from "vue";
import { reqSelectArticle, type Article } from "@/api/article";

onMounted(() => {
  selectArticle();
});

const article_id = computed(() => 20); //  固定ID 是 20 为关于我

let article = ref<Article.ArticleItem>();
/**
 * 获取文章
 */
async function selectArticle() {
  try {
    let result = await reqSelectArticle({ article_id: article_id.value });
    article.value = result.data;
    // console.log(result);
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <Banner />
  <div class="about-container">
    <div class="about-content">
      <CardBox>
        <template #title>
          <div class="title" style="font-size: 20px; text-align: center">关于我</div>
        </template>
        <MdPreview editor-id="article-details" :model-value="article?.article_content" />
      </CardBox>
    </div>

    <LayoutAside>
      <BoxUser />
    </LayoutAside>
  </div>
</template>

<style lang="scss" scoped>
.about-container {
  :deep(.about-content) {
    width: 100%;
  }
}
</style>
