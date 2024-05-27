import { computed } from '@vue-mini/core';
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
  {},
);
export const initialized = useStorage('handle-initialized', false);

export const locale = useStorage<'hans' | 'hant'>(
  'handle-locale',
  preferTraditional ? 'hant' : 'hans',
);
export const inputMode = useStorage<InputMode>(
  'handle-mode',
  preferZhuyin ? 'zy' : 'py',
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
    meta.value.tries ||= [];
    return meta.value.tries;
  },
  set(v) {
    meta.value.tries = v;
  },
});

export function markStart() {
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  if (meta.value.start || meta.value.end) return;
  meta.value.start = Date.now();
}

export function markEnd() {
  if (!meta.value.start || meta.value.end) return;
  meta.value.end = Date.now();
  meta.value.duration = meta.value.end - meta.value.start;
}

export const gamesCount = computed(
  () =>
    Object.values(records.value).filter((m) =>
      Boolean(m.passed ?? m.answer ?? m.failed),
    ).length,
);
export const passedTries = computed(() =>
  Object.values(records.value).filter((m) => Boolean(m.passed)),
);
export const passedCount = computed(() => passedTries.value.length);
export const noHintPassedCount = computed(
  () =>
    Object.values(records.value).filter((m) => Boolean(m.passed && !m.hint))
      .length,
);
export const historyTriesCount = computed(() =>
  Object.values(records.value)
    .filter((m) => m.passed ?? m.answer ?? m.failed)
    .map((m) => m.tries?.length ?? 0)
    .reduce((a, b) => a + b, 0),
);
export const averageDurations = computed(() => {
  const items = Object.values(records.value).filter(
    (m) => m.passed && m.duration,
  );
  if (items.length === 0) return 0;
  const durations = items.map((m) => m.duration!).reduce((a, b) => a + b, 0);
  return formatDuration(durations / items.length);
});

export function formatDuration(duration: number) {
  const ts = duration / 1000;
  const m = Math.floor(ts / 60);
  const s = Math.floor(ts % 60);
  return m ? `${m}分${s}秒` : `${s}秒`;
}
