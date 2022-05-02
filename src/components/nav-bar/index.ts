import { defineComponent } from '@vue-mini/wechat';
import { showHelp, useMask, showDashboard, showSettings } from '@/state';
import { gamesCount } from '@/storage';

defineComponent(() => {
  const openHelp = () => {
    showHelp.value = true;
    useMask.value = false;
  };

  const openDashboard = () => {
    showDashboard.value = true;
  };

  const openSettings = () => {
    showSettings.value = true;
  };

  return {
    gamesCount,
    openHelp,
    openDashboard,
    openSettings,
  };
});
