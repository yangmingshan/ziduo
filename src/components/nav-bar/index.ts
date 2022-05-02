import { defineComponent } from '@vue-mini/wechat';
import { showHelp, useMask, showSettings } from '@/state';

defineComponent(() => {
  const openHelp = () => {
    showHelp.value = true;
    useMask.value = false;
  };

  const openSettings = () => {
    showSettings.value = true;
  };

  return {
    openHelp,
    openSettings,
  };
});
