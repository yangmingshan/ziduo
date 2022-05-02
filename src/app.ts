/* eslint-disable import/first */
// eslint-disable-next-line no-global-assign, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-empty-function
Promise = Object.getPrototypeOf((async () => {})()).constructor;

import { createApp } from '@vue-mini/wechat';
import { initialized } from './storage';
import { showHelp } from './state';

createApp(() => {
  if (!initialized.value) {
    showHelp.value = true;
  }
});
