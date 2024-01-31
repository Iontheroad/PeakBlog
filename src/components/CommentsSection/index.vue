<template>
  <!-- 讨论区  -->
  <div class="forum-container">
    <div class="comment-form focused">
      <div class="content">
        <!-- <div class="avatar-box">
          <img :src="url" alt="" class="" loading="lazy" />
        </div> -->
        <CommentBox @post-comment="postComment" />
      </div>
    </div>

    <el-divider></el-divider>

    <!-- 评论区列表  -->
    <div class="comment-list" v-if="commentList?.length">
      <!-- 一级容器 -->
      <div class="comment" v-for="item in commentList" :key="item.id">
        <!-- 一级头像-->
        <div class="user-popover">
          <img :src="item.avatar" alt="" />
        </div>
        <!-- 一级主体内容容器 -->
        <div class="content-box">
          <!-- 一级评论内容 -->
          <div class="comment-main">
            <!-- 一级用户名和时间 -->
            <div class="user-box">
              <div class="user-popover">{{ item.nickname }}</div>
              <div class="time">{{ item.create_time }}</div>
            </div>
            <CommentContent :content="item.content" :label-id="'peak' + item.id" />
            <!-- 点赞 | 回复 -->
            <div class="action-box">
              <div class="item" :class="{ active: !!item.user_liked }">
                <svg-icon v-if="item.user_liked" icon-name="like-filled" />
                <svg-icon v-else icon-name="like-outlined" />
                {{ item.likes_count ? item.likes_count : "点赞" }}
              </div>
              <div
                class="item"
                :class="{ 'is-open-box': item.isOpenBox }"
                @click="clickComment(item)"
              >
                <svg-icon icon-name="comment" />
                {{ item.isOpenBox ? "取消回复" : "回复" }}
              </div>
              <!-- 删除按钮, 本人才显示 -->
              <div
                class="del"
                v-if="item.user_id == user_id"
                @click="deleteComment(item.id)"
              >
                删除
              </div>
            </div>

            <!-- 评论框 -->
            <CommentBox
              v-if="item.isOpenBox"
              :comment="item"
              @post-comment="postComment"
            />
          </div>
          <!-- 这沿途的风景或许不是那么精彩,但当我们回首往昔时,便是峥嵘岁月! -->
          <!-- 一级下的二级评论容器 -->
          <div class="sub-comment-wrapper" v-show="item.children.length != 0">
            <div class="sub-comment-list">
              <div class="sub-comment" v-for="child in item.children" :key="child.id">
                <!-- 二级头像-->
                <div class="user-popover">
                  <img :src="child.avatar" alt="" />
                </div>
                <div class="content-box">
                  <div class="content-wrapper">
                    <!-- 二级用户名和时间 -->
                    <div class="user-box">
                      <div class="user-popover">{{ child.nickname }}</div>
                      <div class="rely-box" v-if="child.reply_nickname">
                        <span>回复</span>
                        <div class="user-popover">
                          {{ child.reply_nickname }}
                        </div>
                      </div>
                      <div class="time">{{ child.create_time }}</div>
                    </div>
                    <CommentContent
                      :content="child.content"
                      :label-id="child.id + ''"
                      bg-color="#f7f8fa"
                    />
                    <!-- 点赞 , 回复 -->
                    <div class="action-box">
                      <div class="item" :class="{ active: !!child.user_liked }">
                        <svg-icon v-if="child.user_liked" icon-name="like-filled" />
                        <svg-icon v-else icon-name="like-outlined" />
                        {{ child.likes_count ? child.likes_count : "点赞" }}
                      </div>
                      <div
                        class="item"
                        :class="{ 'is-open-box': item.isOpenBox }"
                        @click="clickComment(child)"
                      >
                        <svg-icon icon-name="comment" />
                        {{ child.isOpenBox ? "取消回复" : "回复" }}
                      </div>
                      <!-- 删除按钮, 本人才显示 -->
                      <div
                        class="sub-del"
                        v-if="child.user_id == user_id"
                        @click="deleteComment(child.id)"
                      >
                        删除
                      </div>
                    </div>

                    <!-- 评论框 -->
                    <CommentBox
                      v-if="child.isOpenBox"
                      :comment="child"
                      @post-comment="postComment"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="CurrentlyUnavailable">暂无讨论</div>
  </div>
</template>

<!--https://blog.csdn.net/zLanaDelRey/article/details/100997792-->
<script setup lang="ts">
/*
// 封装输入框
IDEA:
  1. 每个评论都是控制一个独有的输入框
  2. 评论顺序尾部追加
*/
defineOptions({
  name: "Forum"
});
import CommentBox from "./CommentBox.vue";
import CommentContent from "./CommentContent.vue";
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";
import {
  reqSelectArticleComment,
  reqInsertArticleComment,
  reqDeleteArticleComment,
  type Article
} from "@/api/article";
import { useUserStore } from "@/store/modules/user";

const userStore = useUserStore();
// 当前登录的用户id
const user_id = computed(() => {
  return userStore.userInfo?.user_id;
});
const route = useRoute();
const article_id = computed((): number => {
  return Number(route.query.article_id);
});
// const url = computed(() => {
//   return "http://119.91.22.164:8085/OASystem/gaoding-koutu.png";
// });

let commentList = ref<Article.ArticleComment[]>(); // 评论列表
/**
 * 获取评论
 */
async function getComment() {
  try {
    let result = await reqSelectArticleComment({ article_id: article_id.value });
    console.log(result);

    commentList.value = result.data;
  } catch (error) {
    console.log(error);
  }
}
onMounted(() => {
  getComment(); //获取评论
});
let preComment = ref<any>(null); // 记录当前打开的评论框
/**
 * 打开评论框
 * @param item
 */
const clickComment = (item: any) => {
  // 先关闭之前打开的评论框
  if (preComment.value && preComment.value.id != item.id) {
    preComment.value.isOpenBox = false;
  }
  item.isOpenBox = !item.isOpenBox;
  preComment.value = item; // 记录当前打开的评论框
};

/**
 * 发布评论
 */
const postComment = async (content: string) => {
  console.log(content);
  try {
    let result = await reqInsertArticleComment({
      article_id: article_id.value,
      content: content,
      parent_id:
        preComment.value?.parent_id == 0
          ? preComment.value?.id
          : preComment.value?.parent_id || 0,
      reply_id: preComment.value?.id || null,
      reply_nickname: preComment.value?.nickname || null,
      reply_user_id: preComment.value?.user_id || null,
      reply_avatar: preComment.value?.avatar || null
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    getComment();
  }
};

/**
 * 删除评论
 * @param id
 */
const deleteComment = async (id: number) => {
  console.log(id);
  try {
    let result = await reqDeleteArticleComment({ id });
    console.log(result);
  } catch (error) {
    console.log(error);
  } finally {
    getComment();
  }
};
</script>

<style lang="scss" scoped>
// 讨论区
.forum-container {
  background-color: #ffffff;
  padding: 30px;

  // 评论区列表
  .comment-list {
    background-color: #ffffff;
    color: #000000;
    font-family: -apple-system, system-ui, "Segoe UI", Roboto, Ubuntu, Cantarell,
      "Noto Sans", sans-serif, BlinkMacSystemFont, "Helvetica Neue", "PingFang SC",
      "Hiragino Sans GB", "Microsoft YaHei", Arial !important;
    padding-bottom: 50px;
    font-size: 12px;
    .active,
    .is-open-box {
      color: #1e80ff !important;
    }
    .comment {
      display: flex;
      padding: 16px 0;
      border-bottom: 1px solid rgb(255 255 255 / 25%);
      &:hover .del {
        display: block !important;
      }

      // 头像
      > .user-popover {
        flex-shrink: 0;
        img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }

      // 主体内容
      .content-box {
        flex: 1;
        margin-left: 10px;

        // 一级评论内容
        .comment-main {
          // 一级用户名和时间
          .user-box {
            display: flex;
            height: 24px;
            line-height: 24px;

            // justify-content: space-between;
            .user-popover {
              font-weight: 500;
              font-size: 15px;
              max-width: 90px;
            }
            .time {
              margin-left: auto;
              font-size: 12px;
              color: #8a919f;
            }
          }

          // 一级评论内容
          // .content {
          //   display: -webkit-box;
          //   overflow: hidden;
          //   text-overflow: ellipsis;
          //   -webkit-box-orient: vertical;
          //   -webkit-line-clamp: 6;
          //   font-weight: 400;
          //   font-size: 14px;
          //   margin-top: 8px;
          //   // 展开后的
          //   &.extend {
          //     -webkit-line-clamp: initial;
          //   }
          // }
          // // 内容的展开收起
          // .limit-btn {
          //   margin-top: 8px;
          //   cursor: pointer;
          //   font-size: 14px;
          //   line-height: 22px;
          //   color: #1e80ff;
          // }
          .action-box {
            position: relative;
            display: flex;
            align-items: center;
            margin-top: 10px;
            .item {
              display: flex;
              align-items: center;
              margin-right: 16px;
              line-height: 22px;
              font-size: 14px;
              color: #8a919f;
              cursor: pointer;
              &:hover {
                color: #1e80ff;
              }
              .svg-icon {
                margin-right: 2px;
                font-size: 16px;
              }
            }
            .del {
              display: none;
              margin-left: auto;
              color: #ff5132;
              cursor: pointer;
            }
          }
        }

        // 一级下的二级评论
        .sub-comment-wrapper {
          background-color: #f7f8fa;
          border-radius: 8px;
          .sub-comment-list {
            margin-top: 16px;
            padding: 16px;
            .sub-comment {
              display: flex;
              width: calc(100% - 10px);
              border-bottom: 1px solid rgb(255 255 255 / 25%);
              margin-bottom: 24px;
              &:hover {
                .sub-del {
                  display: block !important;
                }
              }

              // 二级头像
              & > .user-popover {
                flex-shrink: 0;
                img {
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                }
              }
              .content-box {
                // display: flex;
                width: 100%;
                .content-wrapper {
                  // 二级用户名和时间
                  .user-box {
                    display: flex;
                    height: 30px;
                    line-height: 30px;
                    .user-popover {
                      height: 100%;
                      font-size: 15px;
                    }
                    .rely-box {
                      display: flex;
                      align-items: center;
                      > span {
                        padding: 0 12px;
                        font-size: 14px;
                        color: #8a919f;
                      }
                    }
                    .time {
                      margin-left: auto;
                      font-size: 12px;
                      color: #8a919f;
                      height: 100%;
                    }
                  }
                  .action-box {
                    position: relative;
                    display: flex;
                    align-items: center;
                    margin-top: 10px;
                    .item {
                      display: flex;
                      align-items: center;
                      margin-right: 16px;
                      line-height: 22px;
                      font-size: 14px;
                      color: #8a919f;
                      cursor: pointer;
                      &:hover {
                        color: #1e80ff;
                      }
                      .svg-icon {
                        margin-right: 2px;
                        font-size: 16px;
                      }
                    }
                    .sub-del {
                      display: none;
                      margin-left: auto;
                      color: #ff5132;
                      cursor: pointer;
                    }
                  }
                }
              }
            }

            // > div {
            // }
          }
        }
      }
    }
  }
  .CurrentlyUnavailable {
    font-size: 30px;
    color: #dedede;
    text-align: center;
  }
}
</style>
