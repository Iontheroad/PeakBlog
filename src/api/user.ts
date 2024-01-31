/**
 * @name 用户api
 */
// import type { AxiosResponse } from "axios";
import request from "@/utils/request.ts";
const prefix = "/admin";

export interface UserInfo {
  user_id?: number;
  username: string;
  nickname: string;
  avatar?: string;
  sex: string;
  age: number;
  address: string;
  phone: string;
  email: string;
  state: 1 | 2; // 1 正常 2 禁用
  create_time?: string;
  update_time?: string;
  login_time?: string;
}
export type AddUser = Omit<UserInfo, "create_time" | "update_time" | "login_time">;

/**
 * 用户登录
 * @param data
 */
export function reqUserLogin(data: { username: string; password: string }) {
  return request({
    url: `${prefix}/user/login`,
    method: "post",
    data
  });
}

/**
 * 用户登出
 * @returns
 */
export function reqUserLogout() {
  return request({
    url: `${prefix}/user/logout`,
    method: "post"
  });
}

/**
 * 用户注册
 * @param data
 */
export function reqUserRegister(data: { username: string; password: string }) {
  return request({
    url: `${prefix}/user/register`,
    method: "post",
    data
  });
}

/**
 * 重置密码
 * @param data
 */
export function reqUserResetPassword(data: { username: string; password: string }) {
  return request({
    url: `/user/resetPassword`,
    method: "patch",
    data
  });
}

/**
 * 刷新token
 */
export function reqRefreshToken(options: any) {
  return request({
    url: `/refresh/token`,
    method: "post",
    ...options
  });
}

/**
 * 查询用户列表
 */
export function reqSelectUserList(params: { username: string; nickname: string }) {
  return request({
    url: `${prefix}/user/list`,
    method: "get",
    params
  });
}

/**
 * @description 查询用户信息
 * @param {object} [params]
 * @param {number} [params.user_id] 某个用户id(如果不传则是获取当前登录的用户信息)
 */
export function reqSelectUser(params?: { user_id: number }) {
  return request({
    url: `${prefix}/user`,
    method: "get",
    params
  });
}

/**
 * 修改用户信息
 */
export function reqUpdateUser(data: AddUser) {
  return request({
    url: `${prefix}/user`,
    method: "put",
    data
  });
}
