import { getIdiom } from './idioms';

export function checkValidIdiom(word: string, strict = false) {
  if (!strict) return true;
  return Boolean(getIdiom(word));
}
