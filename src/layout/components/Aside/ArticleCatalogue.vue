<template>
  <div class="article-catalogue">
    <!-- <ul class="rounded-xl" v-if="catalogList.length !== 0">
      <li v-for="(item, i) in catalogList" :key="i">
        <a :href="`#${item?.text}`" :data-level="item.level" :title="item.text">
          {{ item.text }}
        </a>
      </li>
    </ul> -->
    <!-- XXX : 文章目录后续自定义 -->
    <MdCatalog editor-id="article-details" :scroll-element="scrollElement" />
  </div>
</template>

<script lang="ts" setup>
import { MdCatalog } from "md-editor-v3";
// import { ref, reactive, toRaw } from "vue";
import mittBus from "@/utils/mittBus";
const scrollElement = document.documentElement;
mittBus.on("getCatalogue", (obj: any) => {
  const { list, article: _article } = obj;
  console.log(list, _article);
});
</script>

<style lang="scss" scoped>
.article-catalogue {
  position: fixed;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 10px;
}
</style>
