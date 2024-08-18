'use strict';

module.exports = {
  root: true,
  extends: ['xo', require.resolve('xo/config/plugins.cjs'), 'prettier'],
  ignorePatterns: ['dist', 'coverage'],
  rules: {
    'no-console': 'error',
    'n/file-extension-in-import': 'off',
    'unicorn/prevent-abbreviations': 'off',
    'import/extensions': ['error', 'never', { json: 'always' }],
    'import/no-duplicates': ['error', { 'prefer-inline': false }],
  },
  overrides: [
    {
      files: ['*.ts'],
      extends: ['xo-typescript', 'prettier'],
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  ],
  settings: {
    'import/resolver': {
      typescript: {},
    },
  },
  globals: {
    wx: 'readonly',
    getApp: 'readonly',
    getCurrentPages: 'readonly',
  },
};
