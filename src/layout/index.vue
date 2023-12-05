<template>
  <div class="layout">
    <Header />

    <Main />

    <Footer />
  </div>
</template>

<script lang="ts" setup name="Layout">
import Header from "./components/Header/index.vue";
import Main from "./components/Main/index.vue";
import Footer from "./components/Footer/index.vue";
</script>

<style lang="scss" scoped></style>
