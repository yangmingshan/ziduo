import {
  defineComponent,
  onShareAppMessage,
  onShareTimeline,
} from '@vue-mini/wechat';

defineComponent(
  () => {
    onShareAppMessage(() => ({ title: '字多（原汉兜）' }));
    onShareTimeline(() => ({ title: '字多（原汉兜）' }));
  },
  {
    canShareToOthers: true,
    canShareToTimeline: true,
  }
);
