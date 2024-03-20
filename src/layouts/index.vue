<script setup>
import { useAppStore } from '../stores';
import { localStg } from '@/utils/storage';

import { getMemberInfo } from '@/service/api/mpf';

const router = useRouter();

const route = useRoute();

const app = useAppStore();

const menuOptions = ref([
  {
    label: 'PERSONAL DETAIL',
    key: 'person',
    url: '/home/person'
  },
  {
    label: 'QR CODE',
    key: 'qrcode',
    url: '/home/qrcode'
  },
  {
    label: 'MY AGENDA',
    key: 'forum',
    url: '/home/forum'
  },
  {
    label: 'MPF SERVICE',
    key: 'service',
    url: '/home/service'
  }
]);

const activeKey = ref(null);

function handleUpdateMenu(_key, item) {
  if (app.isMobile) {
    drawerShow.value = false;
  }
  router.push(item.url);
}

watch(
  () => route.name,
  (val) => {
    activeKey.value = val;
  },
  { immediate: true }
);

const drawerShow = ref(false);

function toMpforum() {
  window.location.href = 'http://mpforum.nbse.net.cn/homepage/index';
}

const mpfId = localStg.get('mpfId');
if (mpfId) {
  getMemberInfo(mpfId).then((r) => {
    if (r.data.volunteerForumTemp) {
      const item = r.data.volunteerForumTemp.find((e) => e.type == 1);
      if (item) {
        menuOptions.value.push({
          label: 'MY ASSISTANT',
          key: 'assistant',
          url: '/home/assistant'
        });
      }
    }
  });
}
</script>

<template>
  <div class="h-full">
    <div v-if="!app.isMobile" class="flex-y-center bg-#16284e h-8rem">
      <img
        src="/images/nav-top-logo.png"
        class="w-12rem h-6rem ml-30rem mr-10rem"
        @click="toMpforum"
      />

      <n-menu
        class="w-auto!"
        mode="horizontal"
        v-model:value="activeKey"
        :options="menuOptions"
        @update:value="handleUpdateMenu"
      />
    </div>
    <div v-else class="nav-bar">
      <img
        src="/images/mpf-top-nav@2x.png"
        class="w-3.6rem h-3.6rem"
        @click="drawerShow = !drawerShow"
      />
      <img src="/images/nav-top-logo.png" class="w-16rem h-8.2rem" @click="toMpforum" />

      <n-drawer v-model:show="drawerShow" width="35rem" placement="left">
        <n-drawer-content title="MPF 2024" class="bg-#16284e" header-class="color-#fff!">
          <n-menu
            v-model:value="activeKey"
            :options="menuOptions"
            :indent="0"
            @update:value="handleUpdateMenu"
          />
        </n-drawer-content>
      </n-drawer>
    </div>

    <!-- <div class="nav-bar">
      <nav-bar />
    </div> -->

    <section
      :style="{
        height: app.isMobile ? 'calc(100% - 10.5rem)' : 'calc(100% - 8rem)'
      }"
      class="section"
    >
      <n-scrollbar>
        <router-view v-slot="{ Component, route }">
          <component
            :is="Component"
            :key="route.fullPath"
            class="transition duration-300 ease-in-out layout-content"
          />
        </router-view>
      </n-scrollbar>
    </section>
  </div>
</template>

<style scoped lang="scss">
.nav-bar {
  @include flex-space-between;
  background-image: url('/images/mpf-top-bg@2x.png');
  background-size: 100%;
  width: 100%;
  height: 10.5rem;
  padding: 0 3rem;
}
</style>

<style lang="scss">
.n-menu.n-menu--horizontal .n-menu-item-content {
  padding: 0 4rem;
}
</style>
