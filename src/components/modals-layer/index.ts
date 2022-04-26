import { defineComponent } from '@vue-mini/wechat';
import { showHint, showCheatSheet } from '@/state';

defineComponent(() => {
  const closeHint = () => {
    showHint.value = false;
  };

  const closeCheatSheet = () => {
    showCheatSheet.value = false;
  };

  return {
    showHint,
    showCheatSheet,
    closeHint,
    closeCheatSheet,
  };
});
