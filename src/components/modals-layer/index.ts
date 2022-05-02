import { defineComponent, ref } from '@vue-mini/wechat';
import {
  showHelp,
  showDashboard,
  showSettings,
  showHint,
  showCheatSheet,
} from '@/state';
import { initialized } from '@/storage';

defineComponent(() => {
  const show = ref(false);

  const onShow = () => {
    show.value = true;
  };

  const onClose = (close: () => void) => {
    show.value = false;
    setTimeout(() => {
      close();
    }, 200);
  };

  const closeHelp = () => {
    onClose(() => {
      showHelp.value = false;
    });
  };

  const closeDashboard = () => {
    onClose(() => {
      showDashboard.value = false;
    });
  };

  const closeSettings = () => {
    onClose(() => {
      showSettings.value = false;
    });
  };

  const closeHint = () => {
    onClose(() => {
      showHint.value = false;
    });
  };

  const closeCheatSheet = () => {
    onClose(() => {
      showCheatSheet.value = false;
    });
  };

  return {
    showHelp,
    showDashboard,
    showSettings,
    showHint,
    showCheatSheet,
    initialized,
    show,
    onShow,
    closeHint,
    closeDashboard,
    closeSettings,
    closeCheatSheet,
    closeHelp,
  };
});
