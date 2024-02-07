<template>
  <n-config-provider :theme-overrides="themeOverrides" :date-locale="dateZhCN" class="h-full">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <n-spin :show="loading" id="app-spin">
              <router-view />
            </n-spin>
            <naive-provider-content />
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup>
import { RouterView } from 'vue-router';
import { dateZhCN } from 'naive-ui';
import { themeOverrides } from '@/config/theme';
import { isMobile } from '@/utils/common';

// 挂载naive组件的方法至window, 以便在路由钩子函数和请求函数里面调用
function registerNaiveTools() {
  window.$loadingBar = useLoadingBar();
  window.$dialog = useDialog();
  window.$message = useMessage();
  window.$notification = useNotification();
}

const NaiveProviderContent = defineComponent({
  name: 'NaiveProviderContent',
  setup() {
    registerNaiveTools();
  },
  render() {
    return h('div');
  }
});

const loading = ref(false);
window.$appLoading = (value) => (loading.value = value);

let reseizeId = null;

onMounted(() => {
  if (isMobile()) {
    document.querySelector('#app').classList.add('mobile');
  }
  /**
   * 监听移动端pc的reseize事件
   */
  window.onresize = () => {
    // 避免部分浏览器同时触发2次resize
    if (reseizeId) {
      clearTimeout(reseizeId);
    }
    reseizeId = setTimeout(() => {
      if (isMobile()) {
        document.querySelector('#app').classList.add('mobile');
      } else {
        document.querySelector('#app').classList.remove('mobile');
      }
    }, 100);
  };
});

onUnmounted(() => clearTimeout(reseizeId));
</script>

<style scoped>
.n-spin-container {
  height: 100%;
}

:deep(.n-spin-content) {
  height: 100%;
}
</style>
