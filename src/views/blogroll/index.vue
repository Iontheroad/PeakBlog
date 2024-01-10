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
</template>

<script lang="ts" setup>
defineOptions({
  name: "Blogroll"
});

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
    description: "小米之家",
    is_action: 1, // 1:正常 0:禁用
    create_time: "2022-12-12 12:12:12",
    update_time: "2022-12-12 12:12:12"
  }
];
</script>

<style lang="scss" scoped>
.blogroll {
  width: 70%;
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
      transition: all 0.3s;
      &:hover {
        transform: scale(1.05);
        box-shadow: 0 0 15px 5px rgb(0 0 0 / 10%);
      }
    }
    a {
      display: flex;
      align-items: center;
    }
    a img {
      width: 64px;
      height: 64px;
    }
  }
}
</style>
