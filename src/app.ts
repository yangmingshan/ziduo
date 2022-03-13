Promise = Object.getPrototypeOf((async () => {})()).constructor;

import { createApp } from '@vue-mini/wechat';

createApp(() => {
  // eslint-disable-next-line no-console
  console.log('App Launched!');
});
