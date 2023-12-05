/**
 * 用户
 */
import { defineStore } from "pinia";
// import { localStorage } from "@/utils/localStorage.ts";
import type { PersistedStateOptions } from "pinia-plugin-persistedstate";

interface UserProps {
  access_token: string;
  username: string;
  refresh_token: string;
  avatar: string;
}

export const useUserStore = defineStore({
  id: "peak-blog-user",
  state: (): UserProps => ({
    access_token: "", // 访问令牌
    refresh_token: "", // 刷新令牌
    username: "",
    avatar: ""
  }),
  actions: {
    setToken({ access_token, username, refresh_token }: UserProps) {
      this.access_token = access_token;
      this.username = username;
      this.refresh_token = refresh_token;
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
