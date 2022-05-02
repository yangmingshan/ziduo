import { defineComponent } from '@vue-mini/wechat';
import { showHelp, useMask } from '@/state';

defineComponent(() => {
  const openHelp = () => {
    showHelp.value = true;
    useMask.value = false;
  };

  return {
    openHelp,
  };
});
