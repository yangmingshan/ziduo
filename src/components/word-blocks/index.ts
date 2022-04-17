import { defineComponent, ref, computed, onReady } from '@vue-mini/wechat';
import {
  parseWord,
  parsedAnswer,
  testAnswer,
  answer as todayAnswer,
} from '@/state';
import { WORD_LENGTH } from '@/logic';

defineComponent({
  properties: {
    word: String,
    revealed: Boolean,
    answer: String,
    animate: {
      type: Boolean,
      value: true,
    },
    active: Boolean,
  },
  setup(props) {
    const flip = ref(false);

    const result = computed(() => {
      if (props.revealed) {
        return testAnswer(
          parseWord(props.word),
          props.answer ? parseWord(props.answer) : parsedAnswer.value
        );
      }

      return [];
    });

    const parsed = parseWord(
      props.word.padEnd(WORD_LENGTH, ' '),
      props.answer || todayAnswer.value.word
    );

    onReady(() => {
      if (props.revealed) {
        setTimeout(() => {
          flip.value = true;
        }, 150);
      }
    });

    return {
      flip,
      result,
      parsed,
    };
  },
});
