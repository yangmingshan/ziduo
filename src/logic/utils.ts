import seedrandom from 'seedrandom';
import type { SpMode } from '@hankit/tools';
import {
  pinyinInitials,
  toShuangpin,
  toSimplified,
  toZhuyin,
} from '@hankit/tools';
import type { InputMode, MatchResult, ParsedChar } from './types';
import { getPinyin } from './idioms';

export function parsePinyin(
  pinyin: string,
  mode: InputMode = 'py',
  spMode: SpMode = 'sougou'
) {
  let parts: string[] = [];
  if (pinyin) {
    if (mode === 'zy') {
      parts = [...(pinyin.trim() ? toZhuyin(pinyin) : '')];
    } else if (mode === 'sp') {
      parts = [...toShuangpin(pinyin, spMode)];
    } else {
      let rest = pinyin;
      const one = pinyinInitials.find((i) => rest.startsWith(i));
      if (one) rest = rest.slice(one.length);
      parts = [one, rest].filter(Boolean) as string[];
    }
  }

  return parts;
}

export function parseChar(
  char: string,
  pinyin?: string,
  mode?: InputMode,
  spMode?: SpMode
): ParsedChar {
  if (!pinyin) pinyin = getPinyin(char)[0];
  const tone = /\d$/.exec(pinyin)?.[0] ?? '';
  if (tone) pinyin = pinyin.slice(0, -tone.length).trim();

  const parts = parsePinyin(pinyin, mode, spMode);
  // If there is no final, actually it's no intital
  if (parts[0] && !parts[1]) {
    parts[1] = parts[0];
    parts[0] = '';
  }

  const [one, two, three] = parts;

  return {
    char,
    _1: one,
    _2: two,
    _3: three,
    parts,
    yin: pinyin,
    tone: Number(tone) || 0,
  };
}

export function parseWord(
  word: string,
  answer?: string,
  mode?: InputMode,
  spMode?: SpMode
) {
  const pinyins = getPinyin(word);
  const chars = [...word];
  const answerPinyin = answer ? getPinyin(answer) : undefined;

  return chars.map((char, i): ParsedChar => {
    let pinyin = pinyins[i] || '';
    // Try match the pinyin from the answer word
    if (answerPinyin && answer && answer.includes(char))
      pinyin = answerPinyin[answer.indexOf(char)] || pinyin;
    return parseChar(char, pinyin, mode, spMode);
  });
}

export function testAnswer(input: ParsedChar[], answer: ParsedChar[]) {
  const unmatched = {
    char: answer
      .map((a, i) =>
        toSimplified(input[i].char) === toSimplified(a.char)
          ? undefined
          : toSimplified(a.char)
      )
      // eslint-disable-next-line eqeqeq, no-eq-null
      .filter((i) => i != null),
    tone: answer
      .map((a, i) => (input[i].tone === a.tone ? undefined : a.tone))
      // eslint-disable-next-line eqeqeq, no-eq-null
      .filter((i) => i != null),
    parts: answer
      .flatMap((a, i) => a.parts.filter((p) => !input[i].parts.includes(p)))
      // eslint-disable-next-line eqeqeq, no-eq-null
      .filter((i) => i != null),
  };

  function includesAndRemove<T>(array: T[], v: T) {
    if (array.includes(v)) {
      array.splice(array.indexOf(v), 1);
      return true;
    }

    return false;
  }

  return input.map((a, i): MatchResult => {
    const char = toSimplified(a.char);
    return {
      char:
        answer[i].char === char || answer[i].char === a.char
          ? 'exact'
          : includesAndRemove(unmatched.char, char)
          ? 'misplaced'
          : 'none',
      tone:
        answer[i].tone === a.tone
          ? 'exact'
          : includesAndRemove(unmatched.tone, a.tone)
          ? 'misplaced'
          : 'none',
      _1:
        !a._1 || answer[i].parts.includes(a._1)
          ? 'exact'
          : includesAndRemove(unmatched.parts, a._1)
          ? 'misplaced'
          : 'none',
      _2:
        !a._2 || answer[i].parts.includes(a._2)
          ? 'exact'
          : includesAndRemove(unmatched.parts, a._2)
          ? 'misplaced'
          : 'none',
      _3:
        !a._3 || answer[i].parts.includes(a._3)
          ? 'exact'
          : includesAndRemove(unmatched.parts, a._3)
          ? 'misplaced'
          : 'none',
    };
  });
}

export function getHint(word: string) {
  return word[Math.floor(seedrandom(word)() * word.length)];
}

const numberChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
const tens = ['', '十', '百', '千'];

export function numberToHanzi(number: number) {
  const digits = [...number.toString()].map((i) => Number(i));
  const chars = digits.map((i, idx) => {
    const unit = i === 0 ? '' : tens[digits.length - 1 - idx];
    return numberChar[i] + unit;
  });

  return chars
    .join('')
    .replace('一十', '十')
    .replace('一百', '百')
    .replace('二十', '廿')
    .replace(/零+/, '零')
    .replace(/(.)零$/, '$1');
}

/**
 * Checks whether a given date is in daylight saving time.
 * @param date the date object to be checked.
 * @returns true if the date is in daylight saving time, false if it's not.
 */
export function isDstObserved(date: Date) {
  const jan = new Date(date.getFullYear(), 0, 1);
  const jul = new Date(date.getFullYear(), 6, 1);
  const standardTimezoneOffset = Math.max(
    jan.getTimezoneOffset(),
    jul.getTimezoneOffset()
  );
  return date.getTimezoneOffset() < standardTimezoneOffset;
}
