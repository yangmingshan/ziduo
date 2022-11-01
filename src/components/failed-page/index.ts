import { defineComponent } from '@vue-mini/wechat';
import { meta } from '@/storage';
import { getLocalized } from '@/lang';

defineComponent((_, context) => {
  const localized = getLocalized().failed;

  const onContinue = () => {
    context.triggerEvent('close');
  };

  const onAnswer = () => {
    meta.value.answer = true;
    context.triggerEvent('close');
  };

  return {
    localized,
    onContinue,
    onAnswer,
  };
});
