<template>
  <section class="category-search">
    <div class="search">
      <el-input v-model.trim="search" placeholder="搜索文章" />
    </div>
    <div class="category" @click="clickCategory">
      <span
        v-for="item in categoryList"
        :key="item.value"
        :data-category="item.value"
        :class="{ active: categoryChecked.includes(item.value) }"
      >
        {{ item.label }}
      </span>
    </div>
  </section>
</template>

<script lang="ts" setup name="CategorySearch">
import { ref, Ref } from "vue";

let search = ref();
let categoryList: Ref<{ label: string; value: number }[]> = ref([
  {
    label: "全部",
    value: 0
  },
  {
    label: "前端",
    value: 2
  },
  {
    label: "Vue",
    value: 3
  },
  {
    label: "JS",
    value: 4
  },
  {
    label: "TS",
    value: 5
  },
  {
    label: "NodeJS",
    value: 6
  },
  {
    label: "Express",
    value: 7
  },
  {
    label: "MySQL",
    value: 8
  },
  {
    label: "Git",
    value: 9
  },
  {
    label: "开发问题",
    value: 10
  },
  {
    label: "博客",
    value: 11
  },
  {
    label: "生活",
    value: 12
  },
  {
    label: "其他",
    value: 13
  }
]);
let categoryChecked = ref([0]);
const clickCategory = (e: any) => {
  const category: number = e?.target?.dataset["category"] * 1;
  if (!category && category !== 0) return;

  if (category === 0) categoryChecked.value = [0]; // 点击全部 固定
  if (categoryChecked.value.includes(category)) {
    // 已选
    categoryChecked.value.splice(categoryChecked.value.indexOf(category), 1); // 去除
    if (categoryChecked.value.length === 0) categoryChecked.value = [0]; // 一个没选,固定全部
  } else {
    // 未选
    categoryChecked.value.push(category); // 添加
    if (categoryChecked.value.includes(0))
      categoryChecked.value.splice(categoryChecked.value.indexOf(0), 1); // 选择了全部以外的,去除全部
  }
  console.log(categoryChecked.value);
  // 请求文章列表
};
</script>

<style lang="scss" scoped>
.category-search {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 60px;
  border-radius: 10px;
  background-color: #ffffff;
  .category {
    display: flex;
    flex-wrap: wrap;
    row-gap: 10px;
    margin-top: 1em;
    span {
      margin: 0 10px;
      padding: 4px 10px;
      border-radius: 8px;
      background-color: #ebeee8;
      cursor: pointer;
      font-size: 14px;
      &.active {
        background-color: #d4dde1;
      }
    }
  }
}
</style>
