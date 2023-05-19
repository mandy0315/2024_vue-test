module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    'vue/setup-compiler-macros': true, // 定義 defineProps、defineEmits
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-essential', 'plugin:@typescript-eslint/recommended', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    parser: '@typescript-eslint/parser',
  },
  plugins: ['vue', '@typescript-eslint', 'prettier'],
  rules: {
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
    'vue/multi-word-component-names': 'off',
    'prettier/prettier': ['error'],
    '@typescript-eslint/no-unused-vars': 'off', // 關掉沒使用語法
    '@typescript-eslint/no-this-alias': 'off', // 關掉禁止 this 別名
    '@typescript-eslint/no-empty-function': 'off', // 關掉沒使用函式
  },
};
