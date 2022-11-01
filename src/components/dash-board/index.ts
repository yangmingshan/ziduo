import { defineComponent, computed } from '@vue-mini/wechat';
import {
  passedTries,
  gamesCount,
  passedCount,
  noHintPassedCount,
  records,
  historyTriesCount,
  averageDurations,
} from '@/storage';
import { checkValidIdiom } from '@/logic';
import { getLocalized } from '@/lang';

defineComponent(() => {
  const localized = getLocalized().dashboard;

  const showChart = computed(() => passedTries.value.length >= 3);

  const triesMap = computed(() => {
    const map = new Map<number, number>();

    for (const i of passedTries.value) {
      let count = i.tries!.length;
      if (count > 10) count = 10;
      map.set(count, (map.get(count) ?? 0) + 1);
    }

    return map;
  });

  const chartData = computed(() => {
    const triesMax = Math.max(...triesMap.value.keys());
    const tiresMaxCount = Math.max(...triesMap.value.values());

    return Array.from({ length: triesMax }).map((_, index) => {
      const value = triesMap.value.get(index + 1);
      return {
        count: index === 9 ? '10+' : index + 1,
        value,
        width: value ? `${Math.round((value / tiresMaxCount) * 100)}%` : '1%',
      };
    });
  });

  const winRate = computed(
    () => `${Math.round((passedCount.value / gamesCount.value) * 100)}%`
  );

  const allWords = computed(() => [
    ...new Set(
      Object.values(records.value)
        .flatMap((i) => i.tries)
        .filter(Boolean) as string[]
    ),
  ]);

  const allCount = computed(() => allWords.value.length);

  const validRate = computed(
    () =>
      `${Math.round(
        (allWords.value.filter((i) => checkValidIdiom(i, true)).length /
          allCount.value) *
          100
      )}%`
  );

  const averageCount = computed(() =>
    (historyTriesCount.value / gamesCount.value).toFixed(1)
  );

  return {
    localized,
    showChart,
    chartData,
    gamesCount,
    passedCount,
    noHintPassedCount,
    winRate,
    allCount,
    validRate,
    averageCount,
    averageDurations,
  };
});
