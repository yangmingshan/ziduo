/* eslint-disable unicorn/prefer-module */
'use strict';

module.exports = {
  moduleFileExtensions: ['ts', 'js', 'json'],
  testMatch: ['<rootDir>/__tests__/**/*.spec.ts'],
  watchPathIgnorePatterns: ['<rootDir>/node_modules/'],
  collectCoverageFrom: ['src/**/*.ts'],
  coverageProvider: 'v8',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[t|j]s$': 'babel-jest',
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
};
