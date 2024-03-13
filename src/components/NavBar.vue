<script setup>
import { useAppStore } from '@/stores';

defineOptions({
  name: 'NavBar'
});

const app = useAppStore();

const navList = [
  {
    label: 'HOME',
    key: 'HOME'
  },
  {
    label: 'ABOUT',
    key: 'ABOUT'
  },
  {
    label: 'GUIDE',
    key: 'GUIDE'
  },
  {
    label: 'MEDIA',
    key: 'MEDIA'
  },
  {
    label: 'MY MPF',
    key: 'MY MPF'
  },
  {
    label: 'MANAGEMENT',
    key: 'MANAGEMENT'
  },
  {
    label: 'CONTACT',
    key: 'CONTACT'
  }
];

function handleUpdateMenu(_key, item) {
  window.location.href = 'http://mpforum.nbse.net.cn/homepage/index';
}

const drawerShow = ref(false);

function toMpforum() {
  window.location.href = 'http://mpforum.nbse.net.cn/homepage/index';
}
</script>

<template>
  <div v-if="!app.isMobile" class="w-full color-#fff flex-y-center h-120px pl-170px absolute-lt">
    <img src="/images/nav-top-logo.png" class="w-160px h-82px" />
    <div class="nav-list">
      <div v-for="item in navList" :key="item.key" class="cursor-pointer" @click="toMpforum">
        {{ item.label }}
      </div>
    </div>
  </div>
  <div v-else class="nav-bar absolute-lt">
    <img
      src="/images/mpf-top-nav@2x.png"
      class="w-3.6rem h-3.6rem"
      @click="drawerShow = !drawerShow"
    />
    <img src="/images/nav-top-logo.png" class="w-16rem h-8.2rem" @click="toMpforum" />

    <n-drawer v-model:show="drawerShow" width="35rem" placement="left">
      <n-drawer-content title="MPF 2024" class="bg-#16284e" header-class="color-#fff!">
        <n-menu value="MY MPF" :options="navList" :indent="0" @update:value="handleUpdateMenu" />
      </n-drawer-content>
    </n-drawer>
  </div>
</template>

<style scoped lang="scss">
.nav-list {
  @include flex-center;
  gap: 90px;
  margin-left: 50px;
  padding-left: 70px;
  height: 80px;
  border-left: 1px solid #fff;
  font-size: 18px;
}

.nav-bar {
  @include flex-space-between;
  background-image: url('/images/mpf-top-bg@2x.png');
  background-size: 100%;
  width: 100%;
  height: 10.5rem;
  padding: 0 3rem;
}
</style>
