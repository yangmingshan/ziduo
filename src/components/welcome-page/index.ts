import { defineComponent, ref, computed, watch } from '@vue-mini/wechat';
import { useMask } from '@/state';
import { locale, initialized, inputMode } from '@/storage';
import { getLocalized } from '@/lang';

defineComponent((_, context) => {
  const localized = ref(getLocalized().welcome);

  const final = computed(
    () => ({ py: 'uo', zy: 'ㄨㄛ', sp: 'o' }[inputMode.value])
  );

  const onStart = () => {
    useMask.value = false;
    initialized.value = true;
    context.triggerEvent('close');
  };

  watch([locale], () => {
    localized.value = getLocalized().welcome;
  });

  return {
    localized,
    final,
    onStart,
  };
});
