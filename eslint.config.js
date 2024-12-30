import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import vueTsEslintConfig from '@vue/eslint-config-typescript';
import pluginVue from 'eslint-plugin-vue';

// @see: http://eslint.cn
// eslint (http://eslint.cn/docs/rules)

/**
 * "off" 或 0 - 关闭该规则
 * "warn" 或 1 - 启用并警告（不影响现有代码）
 * "error" 或 2 - 启用并报错（错误代码 1）
 */

/** @type {import("eslint").Linter.Config[]} */
export default [
  {
    ignores: [
      'node_modules/*', // ignore its content
      '*.md',
      'dist',
      'build',
      'bin',
    ],
  },
  /* 文件匹配规则 */
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue,js,mjs,cjs}'], // 指定 ESLint 应该检查的文件类型。
    rules: {
      // typeScript (https://typescript-eslint.io/rules)

      'quotes': ['error', 'single'], // 强制单引号
      'no-var': 'error', // 要求使用 let 或 const 而不是 var
      'no-console': ['warn', { allow: ['warn', 'error'] }], // 限制 console
      'max-len': ['error', { code: 100 }], // 限制每行代码长度
      'no-multiple-empty-lines': ['error', { max: 1 }], // 不允许多个空行
      'no-debugger': 'error', // 禁用 debugger（自定义规则）
      'no-dupe-keys': 'error', // 禁止对象字面量中出现重复的 key
      'prefer-const': 'error', // 使用 let 关键字声明但在初始分配后从未重新分配的变量，要求使用 const
      // 'no-use-before-define': 'off', // 禁止在 函数/类/变量 定义之前使用它们
      'prefer-template': 'error',
      // 'template-curly-spacing': 'error',
      // 'no-restricted-syntax': [
      //   'error',
      //   {
      //     selector: 'FunctionExpression',
      //     message: 'Function expressions are not allowed.',
      //   },
      //   {
      //     selector: "CallExpression[callee.name='setTimeout'][arguments.length!=2]",
      //     message: 'setTimeout must always be invoked with two arguments.',
      //   },
      // ],
      // 'prefer-function-declaration': 'error',
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
    },
  },
  {
    name: 'app/files-to-ignore',
    ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'], // 指定需要被忽略的文件或目录。
  },

  /* Vue 配置 */
  ...pluginVue.configs['flat/essential'], //提供 Vue 项目的基本 ESLint 规则
  ...vueTsEslintConfig(), // 提供 Vue 和 TypeScript 的 ESLint 配置支持
  {
    name: 'custom-vue-rules',
    files: ['**/*.vue'], // 仅针对 Vue 文件
    rules: {
      // vue (https://eslint.vuejs.org/rules)

      'vue/multi-word-component-names': 'off', // 关闭多单词组件名限制
      'vue/prefer-template': 'error',
      // 'vue/no-unused-vars': 'off', // 检测未使用的变量
      '@typescript-eslint/no-unused-vars': 'warn', // 禁止定义未使用的变量
      'vue/no-mutating-props': 'error', // 不允许改变组件 prop
      'vue/component-tags-order': [
        'error',
        {
          order: ['script', 'template', 'style'], // 指定标签顺序
        },
      ],
      'vue/padding-line-between-blocks': ['error', 'always'], // always: 强制在块之间保留一个空行  never: 禁止块之间出现空行
    },
  },

  /*  跳过格式化 */
  skipFormatting, // 用于禁用 ESLint 的格式化规则，与 Prettier 配合
];
