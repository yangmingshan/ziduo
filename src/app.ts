import {
  createApp,
  watch,
  watchEffect,
  onAppError,
  onUnhandledRejection,
} from '@vue-mini/core';
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
