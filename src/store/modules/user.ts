/**
 * 用户
 */
import { defineStore } from "pinia";
// import { localStorage } from "@/utils/localStorage.ts";
import type { PersistedStateOptions } from "pinia-plugin-persistedstate";
import { reqSelectUser, type UserInfo } from "@/api/user";

export interface UserProps {
  access_token: string;
  username: string;
  refresh_token: string;
  avatar: string;
  userInfo: UserInfo | null;
}

export const useUserStore = defineStore({
  id: "peak-blog-user",
  state: (): UserProps => ({
    access_token: "", // 访问令牌
    refresh_token: "", // 刷新令牌
    username: "",
    avatar: "",
    userInfo: null
  }),
  actions: {
    /**
     *登录成功设置 token
     */
    setToken({
      access_token,
      refresh_token
    }: Pick<UserProps, "access_token" | "refresh_token">) {
      this.access_token = access_token;
      this.refresh_token = refresh_token;
      this.selectUser();
    },

    /**
     * 查询用户信息
     */
    async selectUser() {
      try {
        const result = await reqSelectUser();
        this.userInfo = result.data;
      } catch (error) {
        console.log(error);
      }
    }
  },
  getters: {},
  persist: {
    enabled: true, // 开启数据存储
    strategies: [
      {
        key: "peak-user",
        storage: localStorage
      }
    ]
  } as PersistedStateOptions
});
