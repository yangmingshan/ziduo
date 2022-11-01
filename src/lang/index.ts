import { hans } from './hans';
import { hant } from './hant';
import { locale } from '@/storage';

export function getLocalized() {
  return locale.value === 'hans' ? hans : hant;
}

export function getLocalizedTime(h: string, m: string, s: string) {
  const localized = getLocalized().common;

  return `${h} ${localized.hour} ${m} ${localized.minute} ${s} ${localized.second}`;
}
