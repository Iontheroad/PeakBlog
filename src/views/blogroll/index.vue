<template>
  <div class="blogroll">
    <ul>
      <li v-for="item in links" :key="item.id">
        <a :href="item.site_url">
          <img :src="item.site_icon || 'https://www.baidu.com/favicon.ico'" alt="" />
          <div class="info">
            <h2>{{ item.site_name }}</h2>
            <p>{{ item.description }}</p>
          </div>
        </a>
      </li>
    </ul>
  </div>

  <!-- 侧边栏 -->
  <LayoutAside>
    <div class="blogroll">
      <button>添加</button>
    </div>
  </LayoutAside>
</template>

<script lang="ts" setup>
defineOptions({
  name: "Blogroll"
});
import LayoutAside from "@/layout/components/Aside/index.vue";

let links = [
  {
    id: 1,
    site_name: "百度",
    site_url: "https://www.baidu.com",
    site_icon: "https://www.baidu.com/favicon.ico",
    email: "baidu@qq.com",
    description: "百度搜索引擎",
    is_action: 1, // 1:正常 0:禁用
    create_time: "2022-12-12 12:12:12",
    update_time: "2022-12-12 12:12:12"
  },
  {
    id: 1,
    site_name: "小米",
    site_url: "https://www.mi.com",
    site_icon: "https://www.mi.com/favicon.ico",
    email: "mi@qq.com",
    description: "小米之家请问呜呜呜呜呜呜呜呜呜哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇娃娃",
    is_action: 1, // 1:正常 0:禁用
    create_time: "2022-12-12 12:12:12",
    update_time: "2022-12-12 12:12:12"
  }
];
</script>

<style lang="scss" scoped>
.blogroll {
  flex: 1;
  margin: 20px auto;
  ul {
    display: flex;
    flex-wrap: wrap;
    gap: 20px 20px;
    width: 100%;
    list-style: none;
    li {
      width: 20rem;
      background-color: #ffffff;
      background-size: 100% 100%;
      border-radius: 10px;
      padding: 20px;
      border: 1px solid #e5e6e6;
      transition: all 0.6s;
      box-shadow: 0 0 14px 2px rgb(0 0 0 / 10%);
      &:hover {
        transform: scale(1.03);
      }
    }
    a {
      display: flex;
      align-items: center;
      text-decoration: none;
      column-gap: 10px;
      img {
        width: 64px;
        height: 64px;
        border-radius: 50%;
      }
      .info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        row-gap: 5px;
        color: black;
        h2 {
          font-size: 20px;
        }
        p {
          color: #4b4848;

          /* 设置溢出隐藏 */
          overflow: hidden;

          /* 文本溢出显示省略号 */
          text-overflow: ellipsis;

          /* 将盒子设置为弹性伸缩盒子 */
          display: -webkit-box;

          /* 设置显示的行数 */
          -webkit-line-clamp: 2;

          /* 在其中的排列方式为垂直的 */
          -webkit-box-orient: vertical;
        }
      }
    }
  }

  @media screen and (width <= 768px) {
    ul li {
      width: 100%;
    }
  }
}
</style>
