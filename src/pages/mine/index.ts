import { defineComponent, ref } from '@vue-mini/wechat';

defineComponent(() => {
  const greeting = ref('Have a fun journey');

  return {
    greeting,
  };
});
