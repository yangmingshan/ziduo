// eslint-disable-next-line no-global-assign, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-empty-function
Promise = Object.getPrototypeOf((async () => {})()).constructor;

// eslint-disable-next-line import/first
import { createApp } from '@vue-mini/wechat';

createApp(() => {
  // eslint-disable-next-line no-console
  console.log('App Launched!');
});
