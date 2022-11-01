import { defineComponent, ref, computed, watch } from '@vue-mini/wechat';
import type { SpMode } from '@hankit/tools';
import {
  locale,
  colorblind,
  inputMode,
  useNumberTone as useNumberToneRaw,
  spMode,
  useNoHint,
  useCheckAssist,
  useStrictMode,
  meta,
} from '@/storage';
import { useNumberTone } from '@/state';
import type { InputMode } from '@/logic';
import { getLocalized } from '@/lang';

defineComponent({
  properties: {
    lite: Boolean,
  },
  setup() {
    const localized = ref(getLocalized().settings);

    const started = computed(() => Boolean(meta.value.tries?.length));

    const setLocale = (
      event: WechatMiniprogram.BaseEvent<
        Record<string, unknown>,
        Record<string, unknown>,
        { lang: 'hans' | 'hant' }
      >
    ) => {
      locale.value = event.target.dataset.lang;
    };

    const setColorblind = () => {
      colorblind.value = !colorblind.value;
    };

    const setInputMode = (
      event: WechatMiniprogram.BaseEvent<
        Record<string, unknown>,
        Record<string, unknown>,
        { mode: InputMode }
      >
    ) => {
      inputMode.value = event.target.dataset.mode;
    };

    const setNumberTone = (
      event: WechatMiniprogram.BaseEvent<
        Record<string, unknown>,
        Record<string, unknown>,
        { mode: 'symbol' | 'number' }
      >
    ) => {
      if (inputMode.value !== 'py') return;
      useNumberToneRaw.value = event.target.dataset.mode === 'number';
    };

    const setSpMode = (
      event: WechatMiniprogram.BaseEvent<
        Record<string, unknown>,
        Record<string, unknown>,
        { mode: SpMode }
      >
    ) => {
      spMode.value = event.target.dataset.mode;
    };

    const setNoHint = () => {
      useNoHint.value = !useNoHint.value;
    };

    const setCheckAssist = () => {
      useCheckAssist.value = !useCheckAssist.value;
    };

    const setStrictMode = () => {
      if (started.value) return;
      useStrictMode.value = !useStrictMode.value;
    };

    watch([locale], () => {
      localized.value = getLocalized().settings;
    });

    return {
      localized,
      locale,
      colorblind,
      inputMode,
      useNumberTone,
      spMode,
      useNoHint,
      useCheckAssist,
      useStrictMode,
      started,
      setLocale,
      setColorblind,
      setInputMode,
      setNumberTone,
      setSpMode,
      setNoHint,
      setCheckAssist,
      setStrictMode,
    };
  },
});
