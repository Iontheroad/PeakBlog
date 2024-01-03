/**
 * @name 文章api
 */
import { ReqPage } from "./interface/index";
import request from "@/utils/request";
const prefix = "/admin";

export namespace Article {
  export interface ArticleItem {
    article_id: number;
    article_title: string;
    article_digest: string;
    article_content: string;
    article_cover: string;
    article_type: 1 | 2; // 1原创 2转载
    category_id: string; // 分类id 1,2,3
    status: 1 | 2 | 3; // 文章状态 1审核中 2通过 3未通过
    noPass_reason?: string; // 未通过原因
    comment_status: 1 | 2; // 评论状态 1开启 2关闭
    create_by: string;
    create_id: number;
    create_time: string;
    update_by: string;
    update_id: number;
    update_time: string;

    article_cateList?: { cate_id: number; cate_name: string }[];
    // 点赞、浏览、评论 暂时没有
    likes: number;
    browse: number;
    comment: number;
  }

  // 获取文章列表 参数
  export interface ReqSelectArticleList extends ReqPage {
    status: 2; // 只能展示已通过的
    searchKey: string;
    category_ids?: string;
  }
}

/**
 * 获取文章列表
 */
export function reqSelectArticleList(
  params: Article.ReqSelectArticleList
): Promise<{ data: Article.ArticleItem[]; total: number }> {
  return request({
    url: `${prefix}/article/list`,
    method: "get",
    params
  });
}

/**
 * 获取指定文章
 */
export function reqSelectArticle(params: { article_id: number }) {
  return request({
    url: `${prefix}/article/${params.article_id}`,
    method: "get"
  });
}
