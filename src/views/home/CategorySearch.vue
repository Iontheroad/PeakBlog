<template>
  <section class="category-search">
    <div class="search">
      <el-input v-model.trim="searchKey" placeholder="搜索文章" />
    </div>
    <div class="category" @click="clickCategory">
      <span
        v-for="item in list"
        :key="item.cate_id"
        :data-cate_name="item.cate_name"
        :data-cate_id="item.cate_id"
        :class="{ active: categoryChecked.includes(item.cate_id) }"
      >
        {{ item.cate_name }}
      </span>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed, watch, toRaw } from "vue";
import type { Category } from "@/api/category";
const props = defineProps<{
  categoryList: Category[];
}>();
const emits = defineEmits<{
  changeCategory: [categoryIds: (string | number)[], searchKey: string];
}>();

const list = computed(() => {
  return [
    {
      cate_id: "", // 全部的 id设置为 空字符串
      cate_name: "全部"
    },
    ...props.categoryList
  ];
});

let searchKey = ref("");
let categoryChecked = ref<Array<string | number>>([""]);
watch(searchKey, () => {
  emits("changeCategory", categoryChecked.value, searchKey.value);
});
/**
 * @description 事件委托=> 点击分类
 * @param e 事件对象
 */
const clickCategory = (e: any) => {
  const cate_name = e?.target?.dataset["cate_name"];
  if (!cate_name) return;

  let cate_id: number | string = e?.target?.dataset["cate_id"];

  if (cate_id === list.value[0].cate_id)
    categoryChecked.value = [list.value[0].cate_id]; // 点击全部 固定 [""]
  else if (categoryChecked.value.includes(Number(cate_id))) {
    // *已选
    categoryChecked.value.splice(categoryChecked.value.indexOf(Number(cate_id)), 1); // 去除
    if (categoryChecked.value.length === 0)
      categoryChecked.value = [list.value[0].cate_id]; // 全部取消时,固定全部
  } else {
    // *未选
    categoryChecked.value.push(Number(cate_id)); // 追加分类
    if (categoryChecked.value.includes(list.value[0].cate_id))
      categoryChecked.value.splice(0, 1); // 选择了其他分类就把全部去掉
  }

  emits("changeCategory", toRaw(categoryChecked.value), searchKey.value);
};
</script>

<style lang="scss" scoped>
.category-search {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  background-color: #ffffff;
  .search {
    margin-bottom: 1em;
  }
  .category {
    display: flex;
    flex-wrap: wrap;
    row-gap: 10px;
    span {
      margin: 0 10px;
      padding: 4px 10px;
      border-radius: 8px;
      background-color: #ebeee8;
      cursor: pointer;
      font-size: 14px;
      &.active {
        // background-color: #d4dde1;
        background-color: #4fc7fb;
      }
    }
  }
}
</style>
