<script setup>
defineOptions({
  name: 'ForumPage'
});

const list = [
  {
    title: 'Title',
    time: 'time',
    location: 'location'
  },
  {
    title: 'Title',
    time: 'time',
    location: 'location'
  },
  {
    title: 'Title',
    time: 'time',
    location: 'location'
  }
];
</script>

<template>
  <div class="mx-auto max-w-640px">
    <h2 class="text-center">Activity Theme</h2>

    <n-card v-for="item in list" :key="index" :title="item.title" class="mb-20px">
      <div>{{ item.time }}</div>
      <div>{{ item.location }}</div>
    </n-card>
  </div>
</template>
