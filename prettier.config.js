// @see: https://www.prettier.cn

// prettier.config.js, .prettierrc.js, prettier.config.mjs, or .prettierrc.mjs

/** @type {import("prettier").Config} */
const config = {
  $schema: 'https://json.schemastore.org/prettierrc',
  plugins: ['@trivago/prettier-plugin-sort-imports'],
  printWidth: 100, // 指定最大换行长度
  useTabs: false, // 使用制表符而不是空格缩进行 (true：制表符，false：空格)
  tabWidth: 2, // 缩进制表符宽度 | 空格数
  semi: true, // 结尾不用分号 (true：有，false：没有)
  singleQuote: true, // 使用单引号 (true：单引号，false：双引号)
  quoteProps: 'consistent', // 在对象字面量中决定是否将属性名用引号括起来 , "as-needed":仅在需要时为对象键添加引号, "consistent" 如果一个对象的某个键需要引号，则所有键都添加引号, "preserve" 保留用户输入的引号形式，不对键的引号进行任何修改
  jsxSingleQuote: false, // 在JSX中使用单引号而不是双引号 (true：单引号，false：双引号)
  trailingComma: 'es5', // 多行时尽可能打印尾随逗号 可选值"<none|es5|all>"
  bracketSpacing: true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }" (true：有，false：没有)
  bracketSameLine: false, // 将 > 多行元素放在最后一行的末尾，而不是单独放在下一行 (true：放末尾，false：单独一行)
  arrowParens: 'always', // (x) => {} 箭头函数参数只有一个时是否要有小括号 (avoid：省略括号，always：不省略括号)
  requirePragma: false, // 指定要使用的解析器，不需要写文件开头的 @prettier
  insertPragma: false, // 可以在文件顶部插入一个特殊标记，指定该文件已使用 Prettier 格式化
  proseWrap: 'preserve', // 用于控制文本是否应该被换行以及如何进行换行 , always 会强制换行，never 保持原格式不换行，preserve 保留原始换行行为。
  htmlWhitespaceSensitivity: 'css', // 在html中空格是否是敏感的 "css" - 遵守 CSS 显示属性的默认值， "strict" - 空格被认为是敏感的 ，"ignore" - 空格被认为是不敏感的
  vueIndentScriptAndStyle: false, // 控制 Vue 单文件组件（.vue 文件）中 <script> 和 <style> 标签的内容是否与模板（<template>）的缩进对齐
  endOfLine: 'auto', // 用于控制行尾字符的类型，即在文件中的每行结束时使用何种字符表示换行
  rangeStart: 0, // 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码 (rangeStart：开始，rangeEnd：结束)
  rangeEnd: Infinity,

  importOrder: [
    '^vue$', // Vue 和相关包
    '^@/components/(.*)$', // 公共组件
    '^@/views/(.*)$', // 页面视图
    '^@/utils/(.*)$', // 工具函数
    '^@/api/(.*)$', // API 模块
    '^[./]', // 相对路径模块
  ],
  importOrderSeparation: true, // 不同模块类别之间添加一个空行
  importOrderSortSpecifiers: true, // 对导入的具体内容进行排序，例如：{ b, a, c } 将调整为 { a, b, c }
};

export default config;
