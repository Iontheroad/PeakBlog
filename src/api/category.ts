/**
 * @name 分类标签api
 */

import request from "@/utils/request";
const prefix = "/blog";

export interface Category {
  cate_id: number;
  cate_name: string;
  create_time?: string;
  update_time?: string;
}

/**
 * 获取分类
 */
export function reqSelectCategory() {
  return request({
    url: `${prefix}/category`,
    method: "get"
  });
}
