<template>
  <div class="home">
    <!-- 文章区域 -->
    <CategorySearch />
    <!-- 文章列表 -->
    <section class="article-list">
      <a class="article-item" href="" v-for="item in articleList" :key="item.id">
        <div class="article-img">
          <img :src="item.img" alt="" />
        </div>
        <div class="article-info">
          <h1>{{ item.title }}</h1>
          <div class="user">
            <div class="avatar">
              <img :src="item.avatar" alt="" />
            </div>
            <div class="info">
              <span>{{ item.author }}</span>
              <span>{{ item.release_date }}{{ item.update_date }}</span>
            </div>
          </div>
          <div class="category">
            <!-- <i v-for="tag in item.category" :key="tag"> {{ tag }}</i> -->
            <el-tag
              v-for="tag in item.category"
              :key="tag"
              type="success"
              class="mx-1"
              effect="dark"
              size="small"
            >
              {{ tag }}
            </el-tag>
          </div>
          <div class="data">
            <div class="likes">
              <el-icon><Pointer /></el-icon>{{ item.likes }}
            </div>
            <div class="browse">
              <el-icon><View /></el-icon>{{ item.browse }}
            </div>
            <div class="comment">
              <el-icon><ChatLineRound /></el-icon>{{ item.comment }}
            </div>
          </div>
        </div>
      </a>
      <!-- TODO: 模块化 -->
      <!-- TODO: 分页 -->
    </section>
  </div>
</template>

<script lang="ts" setup name="Home">
import { Pointer, View, ChatLineRound } from "@element-plus/icons-vue";
import CategorySearch from "@/components/CategorySearch/index.vue";
import { ref } from "vue";
let articleList = ref([
  {
    id: 1,
    title: "TypeScript的基本使用",
    img: "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg", // 文章封面链接
    author: "peak", // 作者
    avatar: "http://iontheroad.gitee.io/peak-vue3-admin/assets/avatar-4e395231.jpg",
    release_date: "2023-01-01", // 发布时间
    update_date: "2023-01-01", // 更新时间
    likes: 0, // 点赞次数
    browse: 0, // 浏览次数
    comment: "5", // 留言
    category: ["前端", "Vue"] // 分类
  },
  {
    id: 2,
    title: "TypeScript的基本使用",
    img: "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg", // 文章封面链接
    author: "peak", // 作者
    avatar: "http://iontheroad.gitee.io/peak-vue3-admin/assets/avatar-4e395231.jpg",
    release_date: "2023-01-01", // 发布时间
    update_date: "2023-01-01", // 更新时间
    likes: 0, // 点赞次数
    browse: 0, // 浏览次数
    comment: "5", // 留言
    category: ["前端", "Vue"] // 分类
  },
  {
    id: 3,
    title: "TypeScript的基本使用",
    img: "https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg", // 文章封面链接
    author: "peak", // 作者
    avatar: "http://iontheroad.gitee.io/peak-vue3-admin/assets/avatar-4e395231.jpg",
    release_date: "2023-01-01", // 发布时间
    update_date: "2023-01-01", // 更新时间
    likes: 0, // 点赞次数
    browse: 0, // 浏览次数
    comment: "5", // 留言
    category: ["前端", "Vue"] // 分类
  }
]);
</script>

<style lang="scss" scoped>
.home {
  .article-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    background-color: #ffffff;
    margin-top: 10px;
    row-gap: 20px;
    padding: 20px;
    .article-item {
      width: 100%;
      display: flex;
      justify-content: space-between;
      border-radius: 10px;
      overflow: hidden;
      text-decoration: none;
      color: black;
      transition:
        transform 0.3s,
        box-shadow 0.3s;
      &:hover {
        transform: translate(5px, -10px);
        box-shadow: 0 0 30px 1px rgb(0 0 0 / 25%);
      }
      &:nth-child(even) {
        .article-img {
          order: 1;
        }
        .article-info {
          order: 0;
        }
      }
      .article-img {
        order: 0;
        width: 240px;
        height: 240px;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
      .article-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 0 20px;
        order: 1;
        flex: 1;
        h1 {
          font-size: 28px;
        }
        .user {
          display: flex;
          align-items: center;
          font-size: 14px;
          margin: 10px 0;
          .avatar {
            width: 40px;
            height: 40px;
            border-radius: 5px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .info {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 10px;
          }
        }
        .category {
          display: flex;
          gap: 4px 4px;
        }
        .data {
          display: flex;
          column-gap: 10px;
          div {
            display: flex;
            align-items: center;
            height: 30px;
            column-gap: 2px;
          }
        }
      }
    }
  }
}
</style>
