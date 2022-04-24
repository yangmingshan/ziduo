import { defineComponent } from '@vue-mini/wechat';
import { showHint } from '@/state';

defineComponent(() => {
  const closeHint = () => {
    showHint.value = false;
  };

  return {
    showHint,
    closeHint,
  };
});
