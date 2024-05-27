import { defineComponent, computed } from '@vue-mini/core';
import { answer, dayNoHanzi, hint, parseWord } from '@/state';
import { meta } from '@/storage';

defineComponent({
  data: {
    // Suppress property type warning
    masked: null,
  },
  setup() {
    const level2 = computed(() => meta.value.hintLevel === 2);

    const parsed = computed(() => parseWord(hint.value, answer.value.word)[0]);

    const masked = computed(() => ({
      ...parsed.value,
      char: '?',
    }));

    const goFurther = () => {
      meta.value.hintLevel = 2;
    };

    return {
      dayNoHanzi,
      level2,
      parsed,
      masked,
      goFurther,
    };
  },
});
