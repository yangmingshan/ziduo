import { ref } from '@vue-mini/core';

export function useNow() {
  const now = ref(new Date());

  setInterval(() => {
    now.value = new Date();
  }, 1000);

  return now;
}
