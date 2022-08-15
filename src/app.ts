/* eslint-disable import/first */
// eslint-disable-next-line no-global-assign, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-empty-function
Promise = Object.getPrototypeOf((async () => {})()).constructor;

import {
  createApp,
  watch,
  watchEffect,
  onAppError,
  onUnhandledRejection,
} from '@vue-mini/wechat';
import { initialized, meta, markEnd } from './storage';
import { showHelp, isPassed, isFinished } from './state';

createApp(() => {
  if (!initialized.value) {
    showHelp.value = true;
  }

  watchEffect(() => {
    if (isPassed.value) {
      meta.value.passed = true;
    }
  });

  watch(isFinished, () => {
    markEnd();
  });

  const logger = wx.getRealtimeLogManager();

  onAppError((error) => {
    logger.error(error);
  });

  onUnhandledRejection(({ reason }) => {
    logger.warn(reason);
  });
});
