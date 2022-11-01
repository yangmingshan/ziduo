import { defineComponent } from '@vue-mini/wechat';
import { getLocalized } from '@/lang';

defineComponent(() => ({
  localized: getLocalized().about,
}));
