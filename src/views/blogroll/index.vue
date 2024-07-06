<template>
  <Banner />
  <div class="blogroll-container">
    <div class="blogroll-content">
      <ul>
        <li v-for="item in blogrollList" :key="item.id">
          <a :href="item.site_url">
            <img :src="item.site_icon" alt="" />
            <div class="info">
              <h2>{{ item.site_name }}</h2>
              <p>{{ item.description }}</p>
            </div>
          </a>
        </li>
      </ul>
      <div class="pagination">
        <Pagination
          v-model:total="total"
          v-model:current-page="queryParams.currentPage"
          v-model:page-size="queryParams.pageSize"
        />
      </div>
    </div>

    <!-- 侧边栏 -->
    <LayoutAside>
      <CardBox class="add-blogroll" title="申请友链" peak="my">
        <div class="content">
          <el-icon :size="46" @click="addBlogroll"><Plus /></el-icon>
        </div>
      </CardBox>

      <CardBox class="blogroll-rule" title="友链规则">
        <ol>
          <li><strong>申请友链</strong>请点击上面的加号</li>
          <li>友链申请后需要等待管理员审核，申请后也请添加本站友链</li>
          <li>审核通过后即可在本站显示</li>
          <li>
            如有疑问可在
            <router-link to="/guestbook">
              <strong> 留言板 </strong>
            </router-link>
            留言
          </li>
        </ol>
      </CardBox>
    </LayoutAside>

    <!--添加  -->
    <DialogTemplate
      v-model:visible="dialogVisible"
      title="申请友链"
      style="border-radius: 10px; max-width: 600px; min-width: 200px"
    >
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        size="default"
        status-icon
      >
        <el-form-item label="网站名称" prop="site_name" :inline-message="true">
          <el-input v-model="ruleForm.site_name" placeholder="请输入网站名称" />
        </el-form-item>
        <el-form-item label="网站链接" prop="site_url">
          <el-input v-model="ruleForm.site_url" placeholder="请输入网站链接" />
        </el-form-item>
        <el-form-item label="网站图标" prop="site_icon">
          <el-input v-model="ruleForm.site_icon" placeholder="请输入网站图标链接" />
          <p>默认为网站链接下的/favicon.ico</p>
        </el-form-item>
        <el-form-item label="网站描述" prop="description">
          <el-input
            v-model="ruleForm.description"
            type="textarea"
            placeholder="请输入网站描述"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button type="primary" @click="submitForm(ruleFormRef)">确定 </el-button>
        <el-button @click="resetForm(ruleFormRef)">取消</el-button>
      </template>
    </DialogTemplate>
  </div>
</template>

<script lang="ts" setup>
import { Plus } from "@element-plus/icons-vue";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { onMounted, ref, reactive, watch } from "vue";

import LayoutAside from "@/layout/components/Aside/index.vue";
import Banner from "@/components/Banner/index.vue";
import CardBox from "@/components/CardBox/index.vue";
import DialogTemplate from "@/components/DialogTemplate/index.vue";
import Pagination from "@/components/Pagination/index.vue";

import { reqSelectBlogroll, reqInsertBlogroll, type Blogroll } from "@/api/blogroll";

defineOptions({
  name: "Blogroll"
});
onMounted(() => {
  selectBlogroll();
});

const blogrollList = ref<Blogroll.BlogrollItem[]>([
  // {
  //   id: 1,
  //   site_name: "百度",
  //   site_url: "https://www.baidu.com",
  //   site_icon: "https://www.baidu.com/favicon.ico",
  //   email: "baidu@qq.com",
  //   description: "百度搜索引擎",
  //   is_action: 1, // 1:正常 0:禁用
  //   create_time: "2022-12-12 12:12:12",
  //   update_time: "2022-12-12 12:12:12"
  // },
  // {
  //   id: 1,
  //   site_name: "小米",
  //   site_url: "https://www.mi.com",
  //   site_icon: "https://www.mi.com/favicon.ico",
  //   email: "mi@qq.com",
  //   description: "小米之家请问呜呜呜呜呜呜呜呜呜哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇哇娃娃",
  //   is_action: 1, // 1:正常 0:禁用
  //   create_time: "2022-12-12 12:12:12",
  //   update_time: "2022-12-12 12:12:12"
  // }
]);

const total = ref(0);
const queryParams = reactive({
  currentPage: 1,
  pageSize: 20,
  is_active: 1 as 0 | 1
});
watch(queryParams, () => {
  selectBlogroll();
});
/**
 * @description 获取友链列表
 */
async function selectBlogroll() {
  try {
    let result = await reqSelectBlogroll(queryParams);
    blogrollList.value = result.data;
    total.value = result.total;
  } catch (error) {
    console.log(error);
  }
}

const ruleFormRef = ref<FormInstance>();

const rules = reactive<FormRules<Blogroll.ReqInsertBlogroll>>({
  site_name: [{ required: true, message: "请填写网站名称", trigger: "blur" }],
  site_url: [
    {
      required: true,
      message: "请填写网站链接",
      trigger: "change"
    }
  ],
  // site_icon: [
  //   {
  //     required: true,
  //     message: "请填写网站图标链接",
  //     trigger: "change"
  //   }
  // ],
  description: [
    {
      required: true,
      message: "请填写网站描述",
      trigger: "change"
    }
  ],
  email: [
    {
      required: false,
      message: "请填写联系邮箱",
      trigger: "change"
    }
  ]
});
const ruleForm = reactive<Blogroll.ReqInsertBlogroll>({
  site_name: "",
  site_url: "",
  site_icon: undefined,
  email: "",
  description: ""
  // is_action: 1
});
const dialogVisible = ref(false);
const addBlogroll = () => {
  dialogVisible.value = true;
};
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        let result = await reqInsertBlogroll(ruleForm);
        ElMessage.success(result.msg);
        resetForm(ruleFormRef.value);
      } catch (error) {
        console.log(error);
      } finally {
        selectBlogroll();
      }
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  dialogVisible.value = false;
};
</script>

<style lang="scss" scoped>
.blogroll-container {
  margin-top: 50px;
  .blogroll-content {
    @include flex($direction: column, $justify: space-between);

    width: 100%;
    padding: 20px;
    border-radius: 10px;

    // background-color: #ffffff;
    ul {
      display: flex;
      flex-wrap: wrap;
      gap: 20px 20px;
      width: 100%;
      list-style: none;
      li {
        width: 320px;
        height: 100px;
        background-color: #ffffff;
        background-size: 100% 100%;
        border-radius: 10px;
        padding: 20px;
        box-shadow: 0 0 10px 0 rgb(0 0 0 / 10%);

        // border: 1px solid #e5e6e6;

        transition: transform 0.4s;
        &:hover {
          border: 1px solid #e5e6e6;
          box-shadow: 0 0 14px 2px rgb(0 0 0 / 10%);
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
            line-clamp: 2;
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
    .pagination {
      @include flex($justify: center);

      width: 100%;
      margin-top: 20px;
    }
  }
  .add-blogroll {
    .content {
      @include flex($align: center, $justify: center);

      height: 80px;
      .el-icon {
        cursor: pointer;
        &:hover {
          color: #409eff;
        }
      }
    }
  }
  .blogroll-rule {
    margin-top: 20px;
    ol {
      margin-top: 10px;
      margin-left: 30px;
      li {
        padding: 4px 0;
        strong {
          color: #409eff;
        }
      }
    }
  }
}
</style>
