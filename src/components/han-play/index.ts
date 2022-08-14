import { defineComponent, ref, computed, watchEffect } from '@vue-mini/wechat';
import { filterNonChineseChars } from '@hankit/tools';
import {
  now,
  answer,
  showFailed,
  showHint,
  showCheatSheet,
  isFinished,
  isFailed,
  useMask,
} from '@/state';
import {
  markStart,
  meta,
  tries,
  useNoHint,
  useStrictMode,
  formatDuration,
} from '@/storage';
import {
  WORD_LENGTH,
  TRIES_LIMIT,
  START_DATE,
  isDstObserved,
  checkValidIdiom,
} from '@/logic';

defineComponent(() => {
  const input = ref('');
  const invalidIdiom = ref(false);

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

  const showAnswer = computed(() => Boolean(meta.value.answer));

  const onInput = (event: WechatMiniprogram.Input) => {
    input.value = filterNonChineseChars(event.detail.value).slice(0, 4);
    markStart();
  };

  const onConfirm = () => {
    if (disabled.value) return;

    if (!checkValidIdiom(input.value, useStrictMode.value)) {
      invalidIdiom.value = true;
      setTimeout(() => {
        invalidIdiom.value = false;
      }, 1000);
      return;
    }

    if (meta.value.strict === undefined) {
      meta.value.strict = useStrictMode.value;
    }

    tries.value.push(input.value);
    input.value = '';
  };

  const openAnswer = () => {
    showFailed.value = true;
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

  const toggleMask = () => {
    useMask.value = !useMask.value;
  };

  watchEffect(() => {
    if (isFailed.value && !meta.value.failed) {
      meta.value.failed = true;
      setTimeout(() => {
        showFailed.value = true;
      }, 1500);
    }
  });

  return {
    answer,
    isFinished,
    isFailed,
    tries,
    useNoHint,
    input,
    invalidIdiom,
    disabled,
    rest,
    hintText,
    strict,
    duration,
    countDown,
    showAnswer,
    useMask,
    onInput,
    onConfirm,
    openAnswer,
    openHint,
    openSheet,
    toggleMask,
  };
});
