import { defineComponent, computed } from '@vue-mini/core';
import type { MatchResult, MatchType, ParsedChar } from '@/logic/types';
import { inputMode, useCheckAssist } from '@/storage';
import { getSymbolState, useMask, useNumberTone } from '@/state';

defineComponent({
  properties: {
    char: Object,
    answer: Object,
    active: Boolean,
  },
  setup(props: { char: ParsedChar; answer: MatchResult; active: boolean }) {
    const exact = computed(
      () =>
        Boolean(props.answer) &&
        Object.values(props.answer).every((i) => i === 'exact'),
    );

    const parsed = computed(() => {
      let result: Partial<MatchResult>;
      if (props.answer) {
        result = props.answer;
      } else if (!props.char || !useCheckAssist.value || !props.active) {
        result = {};
      } else {
        result = {
          _1:
            (
              getSymbolState(
                props.char._1,
                inputMode.value === 'sp' ? '_1' : undefined,
              ) === 'none'
            ) ?
              'deleted'
            : undefined,
          _2:
            (
              getSymbolState(
                props.char._2,
                inputMode.value === 'sp' ? '_2' : undefined,
              ) === 'none'
            ) ?
              'deleted'
            : undefined,
          _3: getSymbolState(props.char._3) === 'none' ? 'deleted' : undefined,
          tone:
            getSymbolState(props.char.tone, 'tone') === 'none' ? 'deleted' : (
              undefined
            ),
        };
      }

      return result;
    });

    const getColor = (result?: MatchType, isChar = false) => {
      const pre =
        useMask.value ?
          isChar ? 'char-mask'
          : 'tone-mask'
        : '';

      if (!result || exact.value) return pre;

      const colors = {
        exact: 'text-ok',
        misplaced: 'text-mis',
        none: isChar ? 'op80' : 'op35',
        deleted: inputMode.value === 'zy' ? 'op30' : 'line-through op30',
      };
      return `${pre} ${colors[result]}`;
    };

    const color = computed(() => ({
      char: getColor(parsed.value.char, true),
      _1: getColor(parsed.value._1),
      _2: getColor(parsed.value._2),
      _3: getColor(parsed.value._3),
      tone: getColor(parsed.value.tone),
    }));

    const blockClass = computed(() => {
      if (!props.answer) return 'base';
      if (exact.value) return 'base ok';
      return 'base normal';
    });

    const toneCharLocation = computed(() => {
      const part = props.char?._2 ?? '';
      return (
        [
          part.lastIndexOf('iu') > -1 ? part.lastIndexOf('iu') + 1 : -1,
          part.lastIndexOf('a'),
          part.lastIndexOf('e'),
          part.lastIndexOf('o'),
          part.lastIndexOf('i'),
          part.lastIndexOf('u'),
          part.lastIndexOf('v'),
        ].find((i) => i !== null && i >= 0) ?? 0
      );
    });

    const partTwo = computed(() => {
      let two = props.char?._2 ?? '';
      if (inputMode.value === 'py') two = two.replace('v', 'ü');
      const index = toneCharLocation.value;
      // Replace i with dot less for tone symbol
      if (!useNumberTone.value && two[index] === 'i') {
        two = `${two.slice(0, index)}ı${two.slice(index + 1)}`;
      }

      return [...two];
    });

    const show = computed(() => Boolean(props.char?.char?.trim()));

    return {
      inputMode,
      useMask,
      useNumberTone,
      color,
      blockClass,
      toneCharLocation,
      partTwo,
      show,
    };
  },
});
