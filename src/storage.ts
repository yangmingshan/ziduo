import { computed } from '@vue-mini/wechat';
import type { SpMode } from '@hankit/tools';
import { useStorage } from './composables/storage';
// eslint-disable-next-line import/no-cycle
import { dayNo } from './state';
import type { InputMode, TriesMeta } from './logic';

let language = '';
try {
  language = wx.getSystemInfoSync().language.toLowerCase();
} catch {}

const preferTraditional =
  language.includes('zh') &&
  (language.includes('hk') ||
    language.includes('mo') ||
    language.includes('tw') ||
    language.includes('hant'));
const preferZhuyin = language.includes('zh') && language.includes('tw');

// `history` is a reserved word in miniprogram
export const records = useStorage<Record<number, TriesMeta>>(
  'handle-tries-meta',
  {}
);
export const initialized = useStorage('handle-initialized', false);

export const locale = useStorage<'hans' | 'hant'>(
  'handle-locale',
  preferTraditional ? 'hant' : 'hans'
);
export const inputMode = useStorage<InputMode>(
  'handle-mode',
  preferZhuyin ? 'zy' : 'py'
);
export const spMode = useStorage<SpMode>('handle-sp-mode', 'sougou');
export const colorblind = useStorage('handle-colorblind', false);
export const useNoHint = useStorage('handle-hard-mode', false);
export const useNumberTone = useStorage('handle-number-tone', false);
export const useCheckAssist = useStorage('handle-check-assist', false);
export const useStrictMode = useStorage('handle-strict', false);

export const meta = computed<TriesMeta>({
  get() {
    if (!(dayNo.value in records.value)) records.value[dayNo.value] = {};
    return records.value[dayNo.value];
  },
  set(v) {
    records.value[dayNo.value] = v;
  },
});

export const tries = computed<string[]>({
  get() {
    if (!meta.value.tries) meta.value.tries = [];
    return meta.value.tries;
  },
  set(v) {
    meta.value.tries = v;
  },
});

export function markStart() {
  if (meta.value.end) return;
  if (!meta.value.start) {
    meta.value.start = Date.now();
  }
}
