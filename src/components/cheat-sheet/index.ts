import { defineComponent, computed } from '@vue-mini/wechat';
import { pinyinFinals, pinyinInitials } from '@hankit/tools';
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

  return {
    pyInitials,
    pyFinals,
  };
});
