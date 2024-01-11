<template>
  <div class="layout">
    <Header />

    <Banner />

    <Main />

    <Footer />
  </div>
</template>

<script lang="ts" setup name="Layout">
import Header from "./components/Header/index.vue";
import Banner from "./components/Banner/index.vue";
import Main from "./components/Main/index.vue";
import Footer from "./components/Footer/index.vue";
</script>

<style lang="scss" scoped>
.layout {
  position: relative;
  min-height: 100vh;

  // background: linear-gradient(144deg, #ada996, #f2f2f2, #dbdbdb, #eaeaea);
  background-color: #f9f9f9;
}
</style>
