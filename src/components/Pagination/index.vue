<template>
  <el-pagination
    v-model:page-size="_pageSize"
    :page-sizes="pageSizes"
    v-model:current-page="_currentPage"
    :pager-count="pagerCount"
    :layout="layout"
    :total="total"
    @change="changes"
  />
</template>

<script lang="ts" setup name="Pagination">
import { computed } from "vue";
const props = withDefaults(
  defineProps<{
    total: number;
    currentPage: number;
    pageSize?: number;
    pagerCount?: number;
    layout?: string;
    pageSizes?: number[];
  }>(),
  {
    pagerCount: 11,
    pageSize: 10,
    layout: "sizes,prev, pager, next",
    pageSizes: () => [10, 20, 30, 40]
  }
);
const emits = defineEmits<{
  "update:pageSize": [value: number];
  "update:currentPage": [value: number];
  change: [currentPage: number, pageSize: number];
}>();

const _pageSize = computed({
  get() {
    return props.pageSize;
  },
  set(value) {
    emits("update:pageSize", value);
  }
});
const _currentPage = computed({
  get() {
    return props.currentPage;
  },
  set(value) {
    emits("update:currentPage", value);
  }
});

function changes(currentPage: number, pageSize: number) {
  emits("change", currentPage, pageSize);
}
</script>

<style lang="scss" scoped></style>
