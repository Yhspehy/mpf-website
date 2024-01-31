<script setup>
const router = useRouter();
const menuOptions = [
  {
    label: 'PERSONAL DETAIL',
    key: 'PERSONAL DETAIL',
    url: '/home/person'
  },
  {
    label: 'MPF ORCODE',
    key: 'MPF ORCODE',
    url: '/home/qrcode'
  },
  {
    label: 'AGENDA',
    key: 'AGENDA',
    url: '/home/forum'
  },
  {
    label: 'MPF SERVICE',
    key: 'MPF SERVICE',
    url: '/home/service'
  },
  {
    label: 'ASSISTANT',
    key: 'ASSISTANT',
    url: '/home/assistant'
  },
  {
    label: 'MY COMPANION',
    key: 'MY COMPANION',
    url: '/home/companion'
  }
];

const activeKey = ref(null);

function handleUpdateMenu(_key, item) {
  router.push(item.url);
}
</script>

<template>
  <div>
    <n-menu
      class="flex-center bg-#16284e h-80px"
      mode="horizontal"
      v-model:value="activeKey"
      :options="menuOptions"
      @update:value="handleUpdateMenu"
    />
    <section class="section">
      <div class="main">
        <router-view v-slot="{ Component, route }">
          <component
            :is="Component"
            :key="route.fullPath"
            class="transition duration-300 ease-in-out layout-content"
          />
        </router-view>
      </div>
    </section>
  </div>
</template>
