/**
 * 页面滚动
 */
import { onMounted, onUnmounted, ref } from 'vue';

export function usePageScroll(dom = document.documentElement) {
  const scrollTop = ref(0); // 滚动条距离顶部的距离
  const isPageScroll = ref(true); // 是否固定头部
  function handleScroll() {
    scrollTop.value = dom.scrollTop;

    if (scrollTop.value > 0) {
      isPageScroll.value = true;
    } else {
      isPageScroll.value = false;
    }
  }
  onMounted(() => {
    window.addEventListener('scroll', handleScroll);
  });
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  handleScroll();
  return { scrollTop, isPageScroll };
}
