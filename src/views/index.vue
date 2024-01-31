<script setup>
defineOptions({
  name: 'IndexPage'
});

const router = useRouter();
</script>

<template>
  <n-space justify="center" class="p-40px">
    <n-button @click="router.push('/login')">登录页面</n-button>
    <n-button @click="router.push('/signup')">报名页面</n-button>
    <n-button @click="router.push('/home')">MPF</n-button>
  </n-space>
</template>
