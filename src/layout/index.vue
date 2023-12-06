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
  background: linear-gradient(183deg, #ece9e6, #ffffff);
}
</style>
