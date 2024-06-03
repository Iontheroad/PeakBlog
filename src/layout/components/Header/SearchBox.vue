<template>
  <div class="search-box">
    <el-input
      v-model.trim="searchKey"
      placeholder="搜索文章"
      clearable
      @input="inputValue"
    />
  </div>
</template>

<script lang="ts" setup name="SearchBox">
import mittBus from "@/utils/mittBus";
import { debounce } from "@/utils/peak_tools";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const searchKey = ref("");
/**
 * @description 搜索文章
 * @param value
 */
const inputValue = debounce(
  function () {
    router.push({ name: "Home" });
    mittBus.emit("searchArticle", searchKey.value);
  },
  500,
  false
);
</script>

<style lang="scss" scoped>
.search-box {
  :deep(.el-input) {
    .el-input__wrapper {
      background-color: transparent;
    }
  }
}
</style>
