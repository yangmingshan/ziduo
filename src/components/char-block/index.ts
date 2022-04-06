import { defineComponent, computed } from '@vue-mini/wechat';
import type { MatchResult, MatchType, ParsedChar } from '@/logic/types';
import { inputMode, useCheckAssist } from '@/storage';
import { getSymbolState, useMask, useNumberTone } from '@/state';

defineComponent({
  properties: {
    char: Object,
    answer: Object,
    active: Boolean,
  },
  setup(props: { char: ParsedChar; answer: MatchResult; active: boolean }) {},
});
