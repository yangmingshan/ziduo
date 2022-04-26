import { defineComponent, ref, computed } from '@vue-mini/wechat';
import { filterNonChineseChars } from '@hankit/tools';
import { showHint, showCheatSheet } from '@/state';
import { markStart, meta, tries, useNoHint, useStrictMode } from '@/storage';
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

  const openHint = () => {
    meta.value.hint = true;
    if (!meta.value.hintLevel) {
      meta.value.hintLevel = 1;
    }

    showHint.value = true;
  };

  const openSheet = () => {
    showCheatSheet.value = true;
  };

  return {
    tries,
    useNoHint,
    input,
    disabled,
    onInput,
    onConfirm,
    openHint,
    openSheet,
  };
});
