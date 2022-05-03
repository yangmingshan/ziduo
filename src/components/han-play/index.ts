import { defineComponent, ref, computed } from '@vue-mini/wechat';
import { filterNonChineseChars } from '@hankit/tools';
import { showHint, showCheatSheet, isFinished, isFailed, now } from '@/state';
import {
  markStart,
  meta,
  tries,
  useNoHint,
  useStrictMode,
  formatDuration,
} from '@/storage';
import { WORD_LENGTH, TRIES_LIMIT, START_DATE, isDstObserved } from '@/logic';

defineComponent(() => {
  const input = ref('');

  const disabled = computed(() => input.value.length < WORD_LENGTH);

  const rest = computed(() => TRIES_LIMIT - tries.value.length);

  const hintText = computed(() =>
    meta.value.hint
      ? meta.value.hintLevel === 1
        ? '字音提示'
        : '汉字提示'
      : '无提示'
  );

  const strict = computed(() => Boolean(meta.value.strict));

  const duration = computed(() => formatDuration(meta.value.duration ?? 0));

  const countDown = computed(() => {
    const ms =
      86_400_000 -
      (((isDstObserved(now.value)
        ? Number(now.value) + 3_600_000
        : Number(now.value)) -
        Number(START_DATE)) %
        86_400_000);
    const h = String(Math.floor((ms % 86_400_000) / 3_600_000)).padStart(
      2,
      '0'
    );
    const m = String(Math.floor((ms % 3_600_000) / 60_000)).padStart(2, '0');
    const s = String(Math.floor((ms % 60_000) / 1000)).padStart(2, '0');

    return `${h} 时 ${m} 分 ${s} 秒`;
  });

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
    isFinished,
    isFailed,
    tries,
    useNoHint,
    input,
    disabled,
    rest,
    hintText,
    strict,
    duration,
    countDown,
    onInput,
    onConfirm,
    openHint,
    openSheet,
  };
});
