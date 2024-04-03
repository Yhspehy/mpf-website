<script setup>
import { useAppStore } from '@/stores';

defineOptions({
  name: 'NavBar'
});

const app = useAppStore();

const navList = [
  {
    label: 'HOME',
    key: 'HOME',
    url: 'https://mpforum.nbse.net.cn/homepage/index_en'
  },
  {
    label: 'ABOUT',
    key: 'ABOUT',
    url: 'https://mpforum.nbse.net.cn/introduce/enindex'
  },
  {
    label: 'GUIDE',
    key: 'GUIDE',
    url: 'https://mpforum.nbse.net.cn/conference/enscenery'
  },
  {
    label: 'MEDIA',
    key: 'MEDIA',
    url: 'https://mpforum.nbse.net.cn/media/picenter_en/1'
  },
  {
    label: 'MANAGEMENT',
    key: 'MANAGEMENT',
    url: 'https://mpforum.nbse.net.cn/company/guidanceen'
  },
  {
    label: 'CONTACT',
    key: 'CONTACT',
    url: 'https://mpforum.nbse.net.cn/contact/enindex'
  }
];

function handleUpdateMenu(_key, item) {
  window.location.href = item.url;
}

const drawerShow = ref(false);

function toMpforum() {
  window.location.href = 'https://mpforum.nbse.net.cn/homepage/index_en';
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
      <n-drawer-content title="Welcome to MPF 2024！" class="bg-#16284e" header-class="color-#fff!">
        <n-menu value="MY MPF" :options="navList" @update:value="handleUpdateMenu" />
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

<style lang="scss">
.n-drawer-body-content-wrapper {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>
