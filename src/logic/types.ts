export type MatchType = 'exact' | 'misplaced' | 'none' | 'deleted';

export type InputMode = 'py' | 'zy' | 'sp';

export type ParsedChar = {
  char: string;
  _1: string;
  _2?: string;
  _3?: string;
  parts: string[];
  yin: string;
  tone: number;
};

export type MatchResult = {
  char: MatchType;
  _1: MatchType;
  _2: MatchType;
  _3: MatchType;
  tone: MatchType;
};

export type TriesMeta = {
  answer?: true;
  start?: number;
  end?: number;
  duration?: number;
  failed?: true;
  passed?: true;
  tries?: string[];
  hint?: true;
  hintLevel?: number;
  strict?: boolean;
};
