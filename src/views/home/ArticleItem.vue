<template>
  <router-link class="article-item" :to="to">
    <div class="article-img">
      <img :src="article.article_cover" alt="" />
    </div>
    <div class="article-info">
      <h1>{{ article.article_title }}</h1>
      <div class="author-log">
        <div class="avatar">
          <img :src="article.article_cover" alt="" />
        </div>
        <div class="log">
          <div class="author">
            <SvgIcon icon-name="author" />
            {{ article.create_by }}
          </div>
          <div class="time">
            <span>
              发布于
              <SvgIcon icon-name="release-time" />
              {{ article.create_time }}
            </span>
            <span>
              更新于
              <SvgIcon icon-name="update-time" />
              {{ article.update_time }}
            </span>
          </div>
        </div>
      </div>
      <div class="category-tags">
        <div class="category">
          <SvgIcon icon-name="category" />
          {{ article.cate_id }}
        </div>
        <div class="tags">
          <SvgIcon icon-name="tags" />
          <el-tag
            v-for="tag in article.article_tagList"
            :key="tag.tag_id"
            type="success"
            effect="dark"
            size="small"
          >
            {{ tag.tag_name }}
          </el-tag>
        </div>
      </div>
      <div class="data">
        <span class="likes" @click.prevent="clickLikes(article)">
          <SvgIcon v-if="article.user_liked" on-name="like-filled" />
          <SvgIcon v-else icon-name="like-outlined" />
          {{ article.likes_count }}
        </span>
        <span class="browse"> <SvgIcon icon-name="browse" />{{ article.browse }} </span>
        <span class="comment">
          <SvgIcon icon-name="comment" />{{ article.comment }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script lang="ts" setup name="ArticleItem">
import { toRefs } from "vue";
import { reqArticleLike, Article } from "@/api/article";

interface Props {
  article: Article.ArticleItem;
}
const props = defineProps<Props>();
const { article } = toRefs(props);

const to = {
  name: "Article",
  params: {
    article_id: article.value.article_id
  }
};

/**
 * @description
 */
const clickLikes = async (article: Article.ArticleItem) => {
  try {
    let result = await reqArticleLike({
      article_id: article.article_id
    });
    console.log(result);
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped>
.article-item {
  display: flex;
  justify-content: space-between;
  border-radius: $border-radius;
  width: 100%;

  // height: 240px;
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
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }
    &:hover {
      img {
        transform: scale(1.1);
      }
    }
  }
  .article-info {
    order: 1;
    flex: 1;

    @include flex(column, center, flex-start);

    row-gap: 1em;
    padding: 20px;
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
    .category-tags {
      display: flex;
      align-items: center;
      column-gap: 10px;
      .category,
      .tags {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 4px 4px;
      }
    }
    .data {
      @include flex($align: center);

      column-gap: 10px;
      span {
        @include flex($align: center);

        font-size: 12px;
        column-gap: 2px;
      }
    }
  }
}

@media screen and (width <= 768px) {
  .article-item {
    flex-direction: column;
    background-color: #ffffff;
    .article-img {
      width: 100%;
      height: 170px;
    }
    .article-info {
      h1 {
        font-size: 20px;
      }
      .time {
        flex-wrap: wrap;
      }
    }
  }
}
</style>
