<template>
  <Banner />
  <!-- <div class="guestbook-container">留言板</div> -->
  <div class="guestbook-container">
    <div class="guestbook-content">
      <CardBox title="留言板">
        <CommentsSection :article-id="10" />
      </CardBox>
    </div>

    <LayoutAside>
      <BoxUser />
    </LayoutAside>
  </div>
</template>

<script lang="ts" setup name="Guestbook">
import Banner from "@/components/Banner/index.vue";
import LayoutAside from "@/layout/components/Aside/index.vue";
import BoxUser from "@/layout/components/Aside/BoxUser.vue";
import CardBox from "@/components/CardBox/index.vue";
import CommentsSection from "@/components/CommentsSection/index.vue";
</script>

<style lang="scss" scoped>
.guestbook-container {
  :deep(.guestbook-content) {
    width: 100%;
  }
}
</style>
