'use strict';

const isProd = process.env.NODE_ENV === 'production';

const config = {
  root: true,
  extends: [
    'xo/esnext',
    require.resolve('xo/config/plugins'),
    'plugin:prettier/recommended',
    'prettier/unicorn',
  ],
  ignorePatterns: ['dist', 'coverage'],
  rules: {
    'no-console': 'error',
  },
  overrides: [
    {
      files: ['*.ts'],
      extends: ['xo-typescript', 'prettier/@typescript-eslint'],
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
