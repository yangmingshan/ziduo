/* eslint-disable unicorn/prefer-module */
'use strict';

const process = require('process');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  customSyntax: require('postcss-less'),
  extends: ['stylelint-config-xo', 'stylelint-prettier/recommended'],
  rules: {
    'prettier/prettier': isProd ? true : null,
    'alpha-value-notation': 'number',
    'color-function-notation': 'legacy',
    'selector-type-no-unknown': [
      true,
      {
        ignoreTypes: ['page'],
      },
    ],
  },
};
