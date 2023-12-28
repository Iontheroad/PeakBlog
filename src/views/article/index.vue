<template>
  <div class="article-container">
    <MdPreview
      editor-id="article-details"
      :model-value="article?.article_content"
      @on-get-catalog="onGetCatalog"
    />
    <!-- <MdCatalog editor-id="article-details" :scroll-element="scrollElement" /> -->
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: "ArticleView" });
import { onMounted, computed, ref } from "vue";
import { useRoute } from "vue-router";
import { MdPreview } from "md-editor-v3";
import "md-editor-v3/lib/preview.css";
import mittBus from "@/utils/mittBus";
import { reqSelectArticle, type Article } from "@/api/article";

// const scrollElement = document.documentElement;
const route = useRoute();
onMounted(() => {
  selectArticle();
});
const article_id = computed(() => Number(route.query.article_id));

let article = ref<Article.ArticleItem>();
async function selectArticle() {
  try {
    let result = await reqSelectArticle({ article_id: article_id.value });
    article.value = result.data;
  } catch (error) {
    console.log(error);
  }
}

const onGetCatalog = (list: []) => {
  mittBus.emit("getCatalogue", { list, article: article.value });
  // console.log(obj);
};
</script>
<style lang="scss" scoped>
.article-container {
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
}
</style>
