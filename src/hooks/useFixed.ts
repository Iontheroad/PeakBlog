import type { Ref } from 'vue';
import { computed, isRef, onMounted, onUnmounted, ref } from 'vue';

/**
 * 固定dom
 * @params { Ref<HTMLElement> | HTMLElement } target  要固定的dom
 * @params { number } offsetTop  距离顶部的距离多少固定
 */
function useFixed(target: Ref<HTMLElement> | HTMLElement, offsetTop = 0) {
  const scrollTop = ref(0); // 滚动条距离顶部的距离
  const isFixed = ref(true); // 是否固定
  const targetTop = ref(0); // 目标元素距离顶部的距离
  const element = computed(() => {
    if (isRef(target)) {
      return target.value;
    } else if (target instanceof HTMLElement) {
      return target;
    } else {
      return null;
    }
  });

  function handleScroll() {
    // window.scrollY
    if (!element?.value) {
      throw new TypeError('target 必须是 Ref<HTMLElement> 或者 HTMLElement');
    }
    scrollTop.value = document.documentElement?.scrollTop;
    targetTop.value = element?.value.offsetTop;
    // console.log(scrollTop.value, element.value.getBoundingClientRect(), targetTop.value)

    // 如果滚动条距离顶部的距离大于目标元素距离顶部的距离
    if (scrollTop.value >= targetTop.value - offsetTop) {
      isFixed.value = true;
    } else {
      isFixed.value = false;
    }
  }

  onMounted(() => {
    handleScroll();
    window.addEventListener('scroll', handleScroll);
  });
  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll);
  });
  return { scrollTop, isFixed, targetTop, element };
}

export default useFixed;
