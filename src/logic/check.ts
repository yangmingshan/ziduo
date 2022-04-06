import { WORD_LENGTH } from './constants';
import { getIdiom } from './idioms';

export function filterNonChineseChars(input: string) {
  return [...input]
    .filter((i) => /\p{Script=Han}/u.test(i))
    .slice(0, WORD_LENGTH)
    .join('');
}

export function checkValidIdiom(word: string, strict = false) {
  if (!strict) return true;
  return Boolean(getIdiom(word));
}
