import { defineComponent, ref, computed } from '@vue-mini/wechat';
import { filterNonChineseChars } from '@hankit/tools';
import { markStart, meta, tries, useStrictMode } from '@/storage';
import { WORD_LENGTH } from '@/logic';

defineComponent(() => {
  const input = ref('');

  const disabled = computed(() => input.value.length < WORD_LENGTH);

  const onInput = (event: WechatMiniprogram.Input) => {
    input.value = filterNonChineseChars(event.detail.value).slice(0, 4);
    markStart();
  };

  const onConfirm = () => {
    if (meta.value.strict === undefined) {
      meta.value.strict = useStrictMode.value;
    }

    tries.value.push(input.value);
    input.value = '';
  };

  return {
    tries,
    input,
    disabled,
    onInput,
    onConfirm,
  };
});
