import { defineComponent } from '@vue-mini/wechat';
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

defineComponent({
  properties: {
    lite: Boolean,
  },
  setup() {
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
      if (meta.value.tries?.length) return;
      useStrictMode.value = !useStrictMode.value;
    };

    return {
      locale,
      colorblind,
      inputMode,
      useNumberTone,
      spMode,
      useNoHint,
      useCheckAssist,
      useStrictMode,
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
