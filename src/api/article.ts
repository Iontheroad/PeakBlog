/**
 * @name 文章api
 */
import { ReqPage } from "./interface/index";
import request from "@/utils/request";
const prefix = "/blog";

export namespace Article {
  // 文章
  export interface ArticleItem {
    article_id: number;
    article_title: string;
    article_digest: string;
    article_content: string;
    article_cover: string;
    article_type: 1 | 2; // 1原创 2转载
    // category_id: string; // 分类id 1,2,3
    status: 1 | 2 | 3; // 文章状态 1审核中 2通过 3未通过
    noPass_reason?: string; // 未通过原因
    comment_status: 1 | 2; // 评论状态 1开启 2关闭
    create_by: string;
    create_id: number;
    create_time: string;
    update_by: string;
    update_id: number;
    update_time: string;
    cate_id: number;
    category: {
      cate_id: number;
      cate_name: string;
    };
    tags?: { tag_id: number; tag_name: string }[];
    like_count?: number; // 点赞
    user_liked?: number; // 当前用户是否点赞
    comment_count: number;
    views: number;
  }

  // 查询文章列表 请求参数
  export interface ReqSelectArticleList extends ReqPage {
    status: 2; // 只能展示已通过的
    searchKey: string;
    cate_id?: number | undefined;
    tag_ids?: string;
  }

  // 文章评论
  interface Comment {
    id: number;
    article_id: number;
    user_id: number;
    nickname: string;
    avatar: string;
    create_time: string;
    content: string;
    parent_id: number;
    reply_id: number;
    reply_user_id: number;
    reply_nickname: string;
    reply_avatar: string;
    like_count: number;
    user_liked: number;
    isOpenBox?: boolean;
  }
  export interface ArticleComment extends Comment {
    children?: Comment[];
  }

  export type ReqInsertArticleComment = Omit<
    Comment,
    "id" | "user_id" | "nickname" | "avatar" | "create_time" | "like_count" | "user_liked"
  > & {
    reply_id?: number;
    reply_user_id?: number;
    reply_nickname?: string;
    reply_avatar?: string;
  };
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

/**
 * @description 文章 点赞或取消
 */
export function reqArticleLike({ article_id }: { article_id: number }) {
  return request({
    url: `${prefix}/article/like/${article_id}`,
    method: "patch"
  });
}

/**
 * @description 获取文章的评论
 */
export function reqSelectArticleComment(params: { article_id: number }) {
  return request({
    url: `${prefix}/article/comment/${params.article_id}`,
    method: "get"
  });
}

/**
 * @description 新增文章评论
 */
export function reqInsertArticleComment(data: Article.ReqInsertArticleComment) {
  return request({
    url: `${prefix}/article/comment`,
    method: "post",
    data
  });
}

/**
 * @description 删除文章评论
 */
export function reqDeleteArticleComment(params: { id: number }) {
  return request({
    url: `${prefix}/article/comment/${params.id}`,
    method: "delete"
  });
}

/**
 * @description 文章评论 点赞或取消
 */
export function reqArticleCommentLike(data: { article_id: number; comment_id: number }) {
  return request({
    url: `${prefix}/article/comment/like`,
    method: "patch",
    data
  });
}
