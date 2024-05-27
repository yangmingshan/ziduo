import { ref, watch } from '@vue-mini/core';
import type { Ref, UnwrapRef } from '@vue-mini/core';

export function useStorage<T>(key: string, value: T): Ref<UnwrapRef<T>> {
  try {
    const { keys } = wx.getStorageInfoSync();
    if (keys.includes(key)) {
      value = wx.getStorageSync(key);
    } else {
      wx.setStorageSync(key, value);
    }
  } catch {}

  const data = ref(value);

  watch(
    data,
    () => {
      try {
        wx.setStorageSync(key, data.value);
      } catch {}
    },
    { deep: true },
  );

  return data;
}
