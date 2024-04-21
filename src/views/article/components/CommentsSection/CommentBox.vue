<template>
  <div class="comment-box">
    <div class="input-box focused">
      <!-- 输入区域 -->
      <div
        ref="contentRef"
        class="content-input"
        contenteditable="true"
        placeholder="输入评论（Enter换行，Ctrl + Enter发送）"
      ></div>

      <!-- 上传的图片区域 -->
      <div class="image-preview-box"></div>
    </div>

    <!-- 操作 -->
    <div class="action-box">
      <div class="emoji-btn">
        <svg-icon icon-name="expression"></svg-icon>
        <span>表情</span>
      </div>
      <div class="image-btn">
        <svg-icon icon-name="images"></svg-icon>
        <span>图片</span>
      </div>
      <div class="submit">
        <span>Ctrl + Enter</span>
        <button class="submit-btn" @click="postComment">发表评论</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup name="CommentBox">
import { ref } from "vue";

const props = defineProps({
  comment: {
    type: Object,
    default: () => {
      return {};
    }
  }
});
const emits = defineEmits(["postComment"]);

let contentRef = ref<HTMLDivElement>();
/**
 * 发表评论
 */
const postComment = () => {
  console.log(props.comment);

  emits("postComment", contentRef.value?.innerText);
  if (contentRef.value) {
    contentRef.value.innerText = "";
  }
};
</script>

<style lang="scss" scoped>
.comment-box {
  .action-box {
    display: flex;
    align-items: center;
    margin-top: 8px;
    .emoji-btn,
    .image-btn {
      display: flex;
      align-items: center;
      position: relative;
      cursor: pointer;
      color: #515767;
      .svg-icon {
        margin-right: 4px;
      }
      span {
        font-size: 12px;
      }
    }
    .image-btn {
      margin-left: 24px;
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
        margin-left: auto;
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
</style>
