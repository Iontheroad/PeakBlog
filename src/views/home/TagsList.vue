<template>
  <CardBox>
    <div class="tags-list">
      <label for=""><SvgIcon icon-name="tags" />标签</label>
      <div class="tags" @click="clickTag">
        <span
          v-for="item in list"
          :key="item.tag_id"
          :data-tag_name="item.tag_name"
          :data-tag_id="item.tag_id"
          :class="{ active: tagChecked.includes(item.tag_id) }"
        >
          {{ item.tag_name }}
          <strong :data-tag_name="item.tag_name" :data-tag_id="item.tag_id">{{
            item.article_count
          }}</strong>
        </span>
      </div>
    </div>
  </CardBox>
</template>

<script lang="ts" setup>
import { ref, computed, toRaw } from "vue";
import type { Tag } from "@/api/tags";
const props = defineProps<{
  tagList: Tag[];
}>();
const emits = defineEmits<{
  changeTag: [tag: number[]];
}>();

const list = computed(() => {
  return [...props.tagList];
});

let tagChecked = ref<Array<number>>([]);
/**
 * @description 事件委托=> 点击标签
 * @param e 事件对象
 */
const clickTag = (e: any) => {
  const tag_name = e?.target?.dataset["tag_name"];
  if (!tag_name) return;

  let tag_id: number = Number(e?.target?.dataset["tag_id"]);

  if (tagChecked.value.includes(tag_id)) {
    tagChecked.value.splice(tagChecked.value.indexOf(tag_id), 1); // 去除
  } else {
    tagChecked.value.push(tag_id); // 追加标签
  }

  emits("changeTag", toRaw(tagChecked.value));
};
</script>

<style lang="scss" scoped>
.tags-list {
  position: relative;
  display: flex;
  align-items: center;
  label {
    display: flex;
    align-items: center;
    height: 24px;
    font-size: 18px;
  }
  .tags {
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
