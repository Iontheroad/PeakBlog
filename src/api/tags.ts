/**
 * @name 标签api
 */

import request from "@/utils/request";
const prefix = "/blog";

export interface Tag {
  tag_id: number;
  tag_name: string;
  article_count: number;
  create_time?: string;
  update_time?: string;
}

/**
 * 获取分类
 */
export function reqSelectTags() {
  return request({
    url: `${prefix}/tags`,
    method: "get"
  });
}
