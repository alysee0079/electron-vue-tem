module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-useless-escape': 'off',
    'no-undef': 'warn',
    'vue/no-side-effects-in-computed-properties': 'warn'
  },
  globals: {
    __static: 'readonly',
    $http: 'readonly'
  }
}
