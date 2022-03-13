/* eslint-disable unicorn/prefer-module */
'use strict';

const process = require('process');

const isProd = process.env.NODE_ENV === 'production';

const config = {
  root: true,
  extends: [
    'xo',
    require.resolve('xo/config/plugins.cjs'),
    'plugin:prettier/recommended',
    'prettier',
  ],
  ignorePatterns: ['dist', 'coverage'],
  rules: {
    'no-console': 'error',
    'import/extensions': ['error', 'never', { json: 'always' }],
  },
  overrides: [
    {
      files: ['*.ts'],
      extends: ['xo-typescript', 'prettier'],
      parserOptions: {
        project: './tsconfig.json',
      },
      rules: {
        'no-redeclare': 'error',
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

if (!isProd) {
  config.extends = [
    ...config.extends,
    'silent',
    'silent/import',
    'silent/prettier',
    'silent/unicorn',
  ];
  config.overrides[0].extends = [
    ...config.overrides[0].extends,
    'silent/@typescript-eslint',
  ];
}

module.exports = config;
