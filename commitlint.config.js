// @see: https://cz-git.qbenben.com/zh/guide
import { defineConfig } from "czg";

const Configuration = {
  ignores: [(commit) => commit.includes("init")],
  extends: ["@commitlint/config-conventional"],
  rules: {
    // @see: https://commitlint.js.org/#/reference-rules
    "type-empty": [2, "never"], // 查提交消息中的 type 是否为空。 // never: type不能为空; always: type必须为空
    "type-case": [2, "always", "lower-case"], // type必须小写，upper-case大写，camel-case小驼峰，kebab-case短横线，pascal-case大驼峰，等等
    "scope-empty": [0],
    "scope-case": [0],
    "subject-empty": [2, "never"],
    "subject-case": [0],
    "subject-full-stop": [0, "never", "."], // 检查提交消息的 subject（主题部分）是否以某个指定字符（如句号 .、问号 ?）或字符串结尾。
    "header-max-length": [2, "always", 72], // header最长72
    "body-leading-blank": [2, "always"], // body换行
    "footer-leading-blank": [1, "always"], // footer以空行开头
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "build",
        "ci",
        "chore",
        "revert",
        "wip",
        "workflow",
        "types",
        "release"
      ]
    ]
  },
  prompt: {
    messages: {
      type: "选择你要提交的类型 :",
      scope: "选择一个提交范围（可选）:",
      customScope: "请输入自定义的提交范围 :",
      subject: "填写简短精炼的变更描述 :\n",
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      footerPrefixsSelect: "选择关联issue前缀（可选）:",
      customFooterPrefixs: "输入自定义issue前缀 :",
      footer: "列举关联issue (可选) 例如: #31, #I3244 :\n",
      confirmCommit: "是否提交或修改commit ?"
    },
    types: [
      {
        value: "feat",
        name: "特性:     ✨  新增功能",
        emoji: "✨"
      },
      {
        value: "fix",
        name: "修复:     🐛  修复bug",
        emoji: "🐛"
      },
      {
        value: "docs",
        name: "文档:     📚  仅文档修改",
        emoji: "📚"
      },
      {
        value: "style",
        name: "格式:     🎨  代码风格修改（空格、格式、缺失的分号等），不影响代码逻辑",
        emoji: "🎨"
      },
      {
        value: "refactor",
        name: "重构:     ♻️  代码重构（既不是修复 Bug 也不是添加新功能）",
        emoji: "♻️"
      },
      {
        value: "perf",
        name: "性能:     ⚡️  用于性能优化",
        emoji: "⚡️"
      },
      {
        value: "test",
        name: "测试:     ✅  新增或修正测试用例",
        emoji: "✅"
      },
      {
        value: "build",
        name: "构建:     📦️  构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）",
        emoji: "📦️"
      },
      {
        value: "ci",
        name: "CI:       🔧  修改 CI 配置、脚本",
        emoji: "🔧 "
      },
      {
        value: "chore",
        name: "清理:     🧹  用于清理",
        emoji: "🧹"
      },
      {
        value: "revert",
        name: "回滚:     ⏪  回滚commit",
        emoji: "⏪"
      },
      {
        value: "wip",
        name: "开发:     🚧  开发中",
        emoji: "🚧"
      },
      {
        value: "types",
        name: "类型:     🔰  类型定义文件修改",
        emoji: "🔰"
      },
      {
        value: "release",
        name: "发布:     🎉  用于发布",
        emoji: "🎉"
      }
    ],
    useEmoji: true, // 是否开启表情符号
    scopes: [], // 指定范围
    customScopesAlign: "bottom", // 自定义范围位置
    emptyScopesAlias: "empty", // 指定范围为空时
    customScopesAlias: "custom", // 自定义范围别名
    allowBreakingChanges: ["feat", "fix"] // 允许的 breaking change 类型
  }
};

export default defineConfig(Configuration);
