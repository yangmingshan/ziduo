import { defineComponent } from '@vue-mini/core';
import { meta } from '@/storage';

defineComponent((_, context) => {
  const onContinue = () => {
    context.triggerEvent('close');
  };

  const onAnswer = () => {
    meta.value.answer = true;
    context.triggerEvent('close');
  };

  return {
    onContinue,
    onAnswer,
  };
});
