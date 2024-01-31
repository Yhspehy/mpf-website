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
</script>

<style scoped>
.n-spin-container {
  height: 100%;
}

:deep(.n-spin-content) {
  height: 100%;
}
</style>
