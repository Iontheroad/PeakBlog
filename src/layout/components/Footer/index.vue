<template>
  <footer class="footer">
    <a href="https://github.com/Iontheroad" target="_blank">
      2023 © Peak Blog Author: zhang Peak.
    </a>
  </footer>
</template>

<script lang="ts" setup name="Footer"></script>

<style scoped lang="scss">
.footer {
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 30px;
  background: #ffffff;
  border-top: 1px solid #e4e7ed;
  a {
    font-size: 14px;
    color: #858585;
    text-decoration: none;
    letter-spacing: 0.5px;
  }
}
</style>
