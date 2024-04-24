/**
 * @name 友链api
 */

import request from "@/utils/request";
import { ReqPage, ResResult, ResPage } from "./interface/index";
const prefix = "/blog";

export namespace Blogroll {
  export interface BlogrollItem {
    id?: number;
    site_name: string;
    site_url: string;
    site_icon: string;
    email: string;
    description: string;
    is_active?: 0 | 1;
    create_time?: string;
    update_time?: string;
  }

  export interface ReqSelectBlogroll extends ReqPage {
    is_active?: 0 | 1;
  }

  export interface ReqInsertBlogroll {
    site_name: string;
    site_url: string;
    site_icon?: string;
    email: string;
    description: string;
    is_active?: 0 | 1;
  }
}

/**
 * 获取友链列表
 */
export function reqSelectBlogroll(
  params: Blogroll.ReqSelectBlogroll
): Promise<ResPage<Blogroll.BlogrollItem>> {
  return request({
    url: `${prefix}/blogroll`,
    method: "get",
    params
  });
}

/**
 * 添加友链列表
 */
export function reqInsertBlogroll(data: Blogroll.ReqInsertBlogroll): Promise<ResResult> {
  return request({
    url: `${prefix}/blogroll`,
    method: "post",
    data
  });
}
