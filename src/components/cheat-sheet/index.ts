import { defineComponent, computed } from '@vue-mini/wechat';
import {
  getShuangpinConstants,
  pinyinFinals,
  pinyinInitials,
  zhuyinSymbols,
} from '@hankit/tools';
import { inputMode, spMode } from '@/storage';
import { getSymbolState } from '@/state';

defineComponent(() => {
  const getSymbolClass = (symbol: string, key?: '_1' | '_2') => {
    const state = getSymbolState(symbol, key);
    if (!state) return '';

    return {
      exact: 'text-ok',
      misplaced: 'text-mis',
      none: 'op-30',
    }[state];
  };

  const pyInitials = computed(() =>
    pinyinInitials.map((s) => ({ s, c: getSymbolClass(s) }))
  );

  const pyFinals = computed(() =>
    pinyinFinals.map((s) => ({ s: s.replace('v', 'ü'), c: getSymbolClass(s) }))
  );

  const zySymbols = computed(() =>
    zhuyinSymbols.map((s) => ({ s, c: getSymbolClass(s) }))
  );

  const spConstants = computed(() => {
    const { initials, finals } = getShuangpinConstants(spMode.value);

    return {
      initials: initials.map((s) => ({ s, c: getSymbolClass(s, '_1') })),
      finals: finals.map((s) => ({ s, c: getSymbolClass(s, '_2') })),
    };
  });

  return {
    inputMode,
    pyInitials,
    pyFinals,
    zySymbols,
    spConstants,
  };
});
