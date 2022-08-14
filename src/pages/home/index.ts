import {
  defineComponent,
  onShareAppMessage,
  onShareTimeline,
} from '@vue-mini/wechat';

defineComponent(
  () => {
    onShareAppMessage(() => ({ title: '汉兜' }));
    onShareTimeline(() => ({ title: '汉兜' }));
  },
  {
    canShareToOthers: true,
    canShareToTimeline: true,
  }
);
