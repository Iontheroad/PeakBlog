<template>
  <CardBox class="box-user">
    <template #title>
      <div class="login-status">
        <span>{{ isLogin ? "已登录" : "未登录" }}</span>
        <el-text v-if="isLogin" type="danger" style="cursor: pointer" @click="logout">
          退出
        </el-text>
        <el-text v-else type="primary" @click="login" style="cursor: pointer">
          登陆
        </el-text>
      </div>
    </template>
    <div class="user-info" v-if="isLogin">
      <img :src="userInfo?.avatar" alt="" />
      <span class="user-name">{{ userInfo?.nickname }}</span>
    </div>
  </CardBox>
</template>

<script lang="ts" setup name="BoxUser">
import { useRouter } from "vue-router";

import { useUserStore } from "@/store/modules/user";
import { reqUserLogout } from "@/api/user";
import { computed } from "vue";
import { ElMessage } from "element-plus";
const router = useRouter();
const userStore = useUserStore();

const userInfo = computed(() => {
  return userStore.userInfo;
});
const isLogin = computed(() => userStore.isLogin);

/**
 * 跳转到登陆页面
 * 将当前路由路径作为登陆成功后的跳转地址，通过query参数传递给登陆页面
 */
const login = () => {
  const currentRoute = router.currentRoute.value;
  const redirectPath = {
    name: "Login",
    query: {
      redirect: currentRoute.path
    }
  };
  // 跳转到登陆页面
  router.push(redirectPath);
};

/**
 * 登出
 */
const logout = async () => {
  try {
    let result = await reqUserLogout();
    console.log(result);
    ElMessage.success("登出成功");
    userStore.resetUserInfo();
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
.box-user {
  .login-status {
    @include flex(row, space-between, center);

    width: 100%;
  }
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
    @include flex(row, center, center);

    width: 100%;
    margin-top: 1.5em;
    row-gap: 10px;
  }
}
</style>
