<template>
  <CardBox class="category-list">
    <template #title>
      <label class="title"><SvgIcon icon-name="category" />分类</label>
    </template>
    <div class="category">
      <div
        v-for="item in cateList"
        :key="item.cate_id"
        class="item"
        :class="{ active: item.cate_id == cateId }"
        @click="clickCategory(item)"
      >
        <span>
          {{ item.cate_name }}
        </span>
        <strong>{{ item.article_count }}</strong>
      </div>
    </div>
  </CardBox>
</template>

<script lang="ts" setup>
import { reqSelectCategory, Category } from "@/api/category";
import { ref, onMounted } from "vue";
const props = defineProps<{
  cateId: number | undefined;
}>();
const emits = defineEmits<{
  "update:cateId": [cateId: number | undefined];
  changeCategory: [cateId: number | undefined];
}>();

const cateList = ref<Category[]>([]);
/**
 * @description 查询分类
 */
async function selectCategory() {
  try {
    let result = await reqSelectCategory();
    cateList.value = result.data;
  } catch (error) {
    console.log(error);
  }
}
onMounted(() => {
  selectCategory();
});

/**
 * @description 点击分类
 */
const clickCategory = (cate: Category) => {
  let cateId = props.cateId === cate.cate_id ? undefined : cate.cate_id;
  emits("update:cateId", cateId);
  emits("changeCategory", cateId);
};
</script>

<style lang="scss" scoped>
.category-list {
  .title {
    display: flex;
    align-items: center;
    height: 24px;
    font-size: 18px;
    margin-bottom: 10px;
  }
  .category {
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    row-gap: 10px;
    padding-left: 12px;
    .item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 8px 10px;
      border-radius: 8px;
      text-align: center;
      cursor: pointer;
      font-size: 14px;
      &:hover {
        background-color: #ebeee8;
      }
      &.active {
        background-color: #d4dde1;

        // background-color: #4fc7fb;
      }
    }
  }
}
</style>
