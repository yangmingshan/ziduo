import { getPinyinRaw, toSimplified } from '@hankit/tools';
import { polyphones } from '@/data/polyphones';
import { idioms } from '@/data/idioms';

// eslint-disable-next-line @typescript-eslint/consistent-type-imports
const getPinyinRawWithTypes = getPinyinRaw as typeof import('pinyin');

export function getIdiom(
  word: string
): [string, string | undefined] | undefined {
  const simplified = toSimplified(word);
  if (polyphones[word]) return [word, polyphones[word]];
  if (polyphones[simplified]) return [word, polyphones[simplified]];
  if (idioms.includes(word)) return [word, undefined];
  if (idioms.includes(simplified)) return [simplified, undefined];
  return undefined;
}

export function getPinyin(word: string) {
  const data = getIdiom(word);
  const parts = data?.[1]
    ? data[1].split(/\s+/g)
    : getPinyinRawWithTypes(data?.[0] ?? toSimplified(word), {
        style: getPinyinRawWithTypes.STYLE_TONE2,
      }).map((i) => i[0]);
  // https://baike.baidu.com/item/%E6%B1%89%E8%AF%AD%E6%8B%BC%E9%9F%B3%E6%96%B9%E6%A1%88/1884432
  return parts.map((i) => i.replace(/^([jqxy])u([a-z]*\d?)$/g, '$1v$2'));
}
