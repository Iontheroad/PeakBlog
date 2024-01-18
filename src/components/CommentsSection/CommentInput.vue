<template>
  <div class="input-box focused">
    <!-- 输入区域 -->
    <div
      class="content-input"
      contenteditable="true"
      placeholder="输入评论（Enter换行，Ctrl + Enter发送）"
    ></div>

    <!-- 上传的图片区域 -->
    <div class="image-preview-box"></div>
  </div>
</template>

<script lang="ts" setup name="CommentInput"></script>

<style lang="scss" scoped>
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
