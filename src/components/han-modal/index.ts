import { defineComponent, onReady } from '@vue-mini/core';

defineComponent({
  properties: {
    show: Boolean,
    showClose: Boolean,
  },
  setup(_, context) {
    const close = () => {
      context.triggerEvent('close');
    };

    onReady(() => {
      context.triggerEvent('show');
    });

    return {
      close,
    };
  },
});
