import { computed } from '@vue-mini/wechat';
import type { SpMode } from '@hankit/tools';
import { useStorage } from './composables/storage';
// eslint-disable-next-line import/no-cycle
import { dayNo } from './state';
import type { InputMode, TriesMeta } from './logic';

export const records = useStorage<Record<number, TriesMeta>>(
  'handle-tries-meta',
  {}
);

export const inputMode = useStorage<InputMode>('handle-mode', 'py');
export const spMode = useStorage<SpMode>('handle-sp-mode', 'sougou');
export const useNumberTone = useStorage('handle-number-tone', false);
export const useCheckAssist = useStorage('handle-check-assist', false);

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
