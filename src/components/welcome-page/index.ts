import { defineComponent, computed } from '@vue-mini/wechat';
import { useMask } from '@/state';
import { initialized, inputMode } from '@/storage';

defineComponent((_, context) => {
  const final = computed(
    () => ({ py: 'uo', zy: 'ㄨㄛ', sp: 'o' }[inputMode.value])
  );

  const onStart = () => {
    useMask.value = false;
    initialized.value = true;
    context.triggerEvent('close');
  };

  return {
    final,
    onStart,
  };
});
