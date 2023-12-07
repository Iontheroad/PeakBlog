<template>
  <a class="article-item" href="javascript:;" @click="toArticleDetails">
    <div class="article-img">
      <img :src="article.img" alt="" />
    </div>
    <div class="article-info">
      <h1>{{ article.title }}</h1>
      <div class="author-log">
        <div class="avatar">
          <img :src="article.avatar" alt="" />
        </div>
        <div class="log">
          <div class="author">
            <SvgIcon icon-name="author" />
            {{ article.author }}
          </div>
          <div class="time">
            <span>
              发布于 <SvgIcon icon-name="release-time" />
              {{ article.release_date }}
            </span>
            <span>
              更新于 <SvgIcon icon-name="update-time" />
              {{ article.update_date }}
            </span>
          </div>
        </div>
      </div>
      <div class="category">
        <SvgIcon icon-name="category" />
        <el-tag
          v-for="tag in article.category"
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
        <span class="likes" @click.prevent="clickLikes">
          <SvgIcon icon-name="like-filled" />
          <SvgIcon icon-name="like-outlined" />
          {{ article.likes }}
        </span>
        <span class="browse"><SvgIcon icon-name="browse" />{{ article.browse }}</span>
        <span class="comment"><SvgIcon icon-name="comment" />{{ article.comment }}</span>
      </div>
    </div>
  </a>
</template>

<script lang="ts" setup name="ArticleItem">
import { useRouter } from "vue-router";
import { toRefs } from "vue";

interface Props {
  article: {
    id: number;
    title: string;
    img: string;
    author: string;
    avatar: string;
    release_date: string;
    update_date: string;
    likes: number;
    browse: number;
    comment: string;
    category: string[];
  };
}
const props = defineProps<Props>();
const router = useRouter();
const { article } = toRefs(props);

const toArticleDetails = () => {
  router.push({
    name: "Article"
  });
};

const clickLikes = () => {
  console.log("点赞");
};
</script>

<style lang="scss" scoped>
@mixin flex($direction: row, $justify: flex-start, $align: flex-start) {
  display: flex;
  flex-direction: $direction;
  justify-content: $justify;
  align-items: $align;
}
.article-item {
  display: flex;
  justify-content: space-between;
  border-radius: $border-radius;
  width: 100%;
  overflow: hidden;
  text-decoration: none;
  color: black;
  transition:
    transform 0.3s,
    box-shadow 0.3s;
  &:nth-child(odd) {
    &:hover {
      // transform: translate(-5px, -10px);
      transform-origin: right center;
      transform: translate3d(-5px, 0, 10px) rotateY(1deg);
      box-shadow: 0 0 30px 1px rgb(0 0 0 / 25%);
    }
  }
  &:nth-child(even) {
    .article-img {
      order: 1;
    }
    .article-info {
      order: 0;
    }
    &:hover {
      // transform: translate(5px, -10px);
      transform-origin: left center;
      transform: translate3d(5px, 0, 10px) rotateY(-1deg);
      box-shadow: 0 0 30px 1px rgb(0 0 0 / 25%);
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
    order: 1;
    flex: 1;

    @include flex(column, center, flex-start);

    row-gap: 1em;
    padding: 0 20px;
    color: #8a96a9;
    h1 {
      font-size: 28px;
      color: #242628;
    }

    // 作者信息 -->头像、用户名、发布时间、更新时间
    .author-log {
      display: flex;
      align-items: center;
      font-size: 14px;
      column-gap: 1em;

      // 头像
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
      .log {
        @include flex(column, space-between, flex-start);
        > div {
          @include flex($align: center);

          column-gap: 4px;
        }

        // 发布时间、更新时间
        .time {
          align-items: flex-start;
          span {
            @include flex($align: center);

            font-size: 12px;
            .svg-icon {
              margin: 0 1px;
              margin-top: 2px;
            }
          }
        }
      }
    }
    .category {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 4px 4px;
    }
    .data {
      @include flex;

      column-gap: 10px;
      span {
        @include flex($align: center);

        font-size: 12px;
        column-gap: 2px;
      }
    }
  }
}
</style>
