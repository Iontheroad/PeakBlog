<template>
  <div class="comment-box">
    <div class="input-box focused">
      <div
        ref="contentRef"
        class="content-input"
        contenteditable="true"
        :placeholder="placeholder"
      ></div>

      <div class="image-preview-box"></div>
    </div>

    <!-- 操作 -->
    <div class="action-box">
      <div class="emoji-btn">
        <svg-icon icon-name="expression">表情</svg-icon>
      </div>
      <div class="image-btn">
        <svg-icon icon-name="images">图片</svg-icon>
      </div>
      <div class="submit">
        <span>Ctrl + Enter</span>
        <button class="submit-btn" @click="postComment">发表评论</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="CommentBox">
import { ElMessage } from "element-plus";
import { ref } from "vue";
withDefaults(defineProps<{ placeholder?: string }>(), {
  // placeholder: "输入评论（Enter换行，Ctrl + Enter发送）"
  placeholder: "输入评论内容"
});
const emits = defineEmits<{
  postComment: [content: string];
}>();
let contentRef = ref<HTMLDivElement>();
/**
 * 发表评论
 */
const postComment = () => {
  if (!contentRef.value?.innerText) {
    return ElMessage.warning("评论内容不能为空");
  }

  emits("postComment", contentRef.value?.innerText);
  if (contentRef.value) {
    contentRef.value.innerText = "";
  }
};
</script>

<style lang="scss" scoped>
.comment-box {
  .input-box {
    background: #f2f3f5;
    border: 1px solid transparent;
    padding: 8px 12px;
    border-radius: 5px;
    &.focused {
      border-color: #1e80ff;
    }

    // 输入框
    .content-input {
      position: relative;
      color: #252933;
      outline: none;
      min-height: 64px;
      box-sizing: border-box;
      line-height: 22px;
      font-size: 14px;
      resize: both;
      &:empty::before {
        // 将元素的placeholder属性的值作为内容插入
        content: attr(placeholder);
        color: #8a919f;
      }
    }
  }
  .action-box {
    @include flex($align: center);

    column-gap: 10px;
    margin-top: 8px;
    .emoji-btn,
    .image-btn {
      cursor: pointer;
      color: #515767;
    }
    .submit {
      margin-left: auto;
      span {
        font-size: 14px;
        line-height: 22px;
        letter-spacing: 0.2px;
        color: #8a919f;
        margin-right: 16px;
      }
      button {
        width: 92px;
        text-align: center;
        font-size: 14px;
        line-height: 36px;
        background: #1e80ff;
        border: 0;
        border-radius: 4px;
        color: #ffffff;
        padding: 0;
        cursor: pointer;
      }
    }
  }
}
</style>
