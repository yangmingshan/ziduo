import { defineComponent, ref, onReady } from '@vue-mini/wechat';

defineComponent({
  properties: {
    showClose: Boolean,
  },
  setup(_, context) {
    const show = ref(false);

    const close = () => {
      show.value = false;
      setTimeout(() => {
        context.triggerEvent('close');
      }, 200);
    };

    onReady(() => {
      show.value = true;
    });

    return {
      show,
      close,
    };
  },
});
