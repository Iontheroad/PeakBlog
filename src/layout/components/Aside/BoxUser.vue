<template>
  <div class="box-user">
    <span>作者</span>
    <div class="user-info">
      <img
        src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
        alt=""
      />
      <span class="user-name">Peak</span>
    </div>
    <div class="action-btn">
      <el-button type="primary">详情</el-button>
      <el-button>登出</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup name="BoxUser"></script>

<style lang="scss" scoped>
@mixin flex($direction: row, $justify: flex-start, $align: flex-start) {
  display: flex;
  flex-direction: $direction;
  justify-content: $justify;
  align-items: $align;
}
.box-user {
  @include flex(column, center, flex-start);

  margin-bottom: 1rem;
  margin-top: 0;
  padding: 1.3rem;
  background-color: #ffffff;
  border-radius: $border-radius;
  .user-info {
    @include flex(column, center, center);

    width: 100%;
    img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .user-name {
      margin-top: 0.5em;
    }
  }
  .action-btn {
    @include flex(row, space-between, center);

    width: 100%;
    margin-top: 1.5em;
    padding: 0 1em;
  }
}
</style>
